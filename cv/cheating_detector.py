import cv2
import mediapipe as mp
import numpy as np
import time
from collections import deque
from datetime import datetime
import os
import face_recognition
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_face_mesh = mp.solutions.face_mesh

from g_helper import bgr2rgb, rgb2bgr, mirrorImage
from fp_helper import pipelineHeadTiltPose, draw_face_landmarks_fp
from ms_helper import pipelineMouthState
from eg_helper import pipelineEyeGaze

class FaceVerifier:
    def __init__(self, reference_image_path):
        self.reference_image_path = reference_image_path
        self.reference_encoding = None
        self.load_reference_face()
        
    def load_reference_face(self):
        """Load and process the reference face image"""
        if not os.path.exists(self.reference_image_path):
            raise FileNotFoundError(f"Reference image not found at {self.reference_image_path}")
            
        # Load reference image
        ref_image = face_recognition.load_image_file(self.reference_image_path)
        
        # Get face encodings
        face_encodings = face_recognition.face_encodings(ref_image)
        
        if len(face_encodings) == 0:
            raise ValueError("No face detected in reference image")
            
        # Store the first face encoding
        self.reference_encoding = face_encodings[0]
        
    def verify_face(self, frame):
        """Verify if the face in the frame matches the reference face"""
        # Convert BGR to RGB (face_recognition uses RGB)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Get face locations
        face_locations = face_recognition.face_locations(rgb_frame)
        
        if len(face_locations) == 0:
            return False, None
            
        # Get face encodings
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)
        
        # Compare with reference face
        matches = face_recognition.compare_faces([self.reference_encoding], face_encodings[0], tolerance=0.6)
        
        # Get face distance
        face_distances = face_recognition.face_distance([self.reference_encoding], face_encodings[0])
        
        # Convert face location to (x, y, w, h) format
        top, right, bottom, left = face_locations[0]
        face_coords = (left, top, right - left, bottom - top)
        
        return matches[0], face_coords

def verify_identity(cap, reference_image_path):
    """Verify user identity before starting the session"""
    verifier = FaceVerifier(reference_image_path)
    verified = False
    max_attempts = 30  # 30 seconds timeout
    attempt = 0
    
    print("Please look at the camera for identity verification...")
    
    while not verified and attempt < max_attempts:
        success, frame = cap.read()
        if not success:
            continue
            
        # Mirror frame
        frame = mirrorImage(frame)
        
        # Verify face
        is_match, face_coords = verifier.verify_face(frame)
        
        # Draw rectangle around face
        if face_coords:
            x, y, w, h = face_coords
            color = (0, 255, 0) if is_match else (0, 0, 255)
            cv2.rectangle(frame, (x, y), (x+w, y+h), color, 2)
            
            # Add status text
            status = "Identity Verified" if is_match else "Verifying Identity..."
            cv2.putText(frame, status, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
            
            # Add confidence level if verified
            if is_match:
                confidence = "High" if is_match else "Low"
                cv2.putText(frame, f"Confidence: {confidence}", (10, 60),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
        
        cv2.imshow('Identity Verification', frame)
        
        if is_match:
            verified = True
            print("Identity verified! Starting session...")
            time.sleep(1)  # Give user time to see the success message
            break
            
        attempt += 1
        time.sleep(1)
        
        if cv2.waitKey(1) == ord('q'):
            break
    
    cv2.destroyWindow('Identity Verification')
    return verified

class CheatingDetector:
    def __init__(self):
        self.face_detected = False
        self.last_face_time = time.time()
        self.face_absence_start = None
        self.face_absence_threshold = 3.0  # seconds
        self.multiple_faces_detected = False
        
        # Session tracking
        self.session_start_time = time.time()
        self.session_scores = []
        self.high_risk_count = 0
        self.medium_risk_count = 0
        self.low_risk_count = 0
        self.safe_count = 0
        self.multiple_faces_count = 0
        self.face_absence_count = 0
        
        # Scoring weights
        self.weights = {
            'eye_gaze': 0.4,
            'head_tilt': 0.3,
            'mouth_movement': 0.2,
            'face_presence': 0.1
        }
        
        # History for smoothing
        self.gaze_history = deque(maxlen=10)
        self.head_tilt_history = deque(maxlen=10)
        self.mouth_history = deque(maxlen=10)
        
        # Suspicious patterns
        self.suspicious_gaze = ['Left', 'Right', 'Up', 'Down']
        self.suspicious_head_tilt = ['Left', 'Right', 'Up', 'Down']
        self.suspicious_mouth = ['Open', 'Talking']
        
    def calculate_eye_gaze_score(self, gaze_info):
        """Calculate score based on eye gaze"""
        if gaze_info['out_of_screen']:
            return 1.0  # Maximum penalty for looking away from screen
            
        direction = gaze_info['direction']
        if direction in self.suspicious_gaze:
            return 0.8
        elif direction == "Center":
            return 0.0
        else:
            return 0.4
            
    def calculate_head_tilt_score(self, head_tilt):
        """Calculate score based on head tilt"""
        if head_tilt in self.suspicious_head_tilt:
            return 0.8
        elif head_tilt == "Center":
            return 0.0
        else:
            return 0.4
            
    def calculate_mouth_score(self, mouth_state):
        """Calculate score based on mouth state"""
        if mouth_state in self.suspicious_mouth:
            return 0.8
        elif mouth_state == "Closed":
            return 0.0
        else:
            return 0.4
            
    def calculate_face_presence_score(self):
        """Calculate score based on face presence"""
        if not self.face_detected:
            return 1.0
        elif self.multiple_faces_detected:
            return 0.8
        else:
            return 0.0
            
    def update_face_presence(self, num_faces):
        """Update face presence tracking"""
        current_time = time.time()
        
        if num_faces == 0:
            if self.face_detected:
                self.face_absence_start = current_time
            self.face_detected = False
            self.multiple_faces_detected = False
        elif num_faces > 1:
            self.face_detected = True
            self.multiple_faces_detected = True
            self.face_absence_start = None
        else:
            self.face_detected = True
            self.multiple_faces_detected = False
            self.face_absence_start = None
            
        # Check if face has been absent for too long
        if self.face_absence_start and (current_time - self.face_absence_start) > self.face_absence_threshold:
            return False
        return True
            
    def calculate_cheating_score(self, gaze_info, head_tilt, mouth_state):
        """Calculate overall cheating score"""
        # Update histories
        self.gaze_history.append(self.calculate_eye_gaze_score(gaze_info))
        self.head_tilt_history.append(self.calculate_head_tilt_score(head_tilt))
        self.mouth_history.append(self.calculate_mouth_score(mouth_state))
        
        # Calculate average scores from history
        avg_gaze_score = sum(self.gaze_history) / len(self.gaze_history)
        avg_head_score = sum(self.head_tilt_history) / len(self.head_tilt_history)
        avg_mouth_score = sum(self.mouth_history) / len(self.mouth_history)
        face_score = self.calculate_face_presence_score()
        
        # Calculate weighted score
        total_score = (
            avg_gaze_score * self.weights['eye_gaze'] +
            avg_head_score * self.weights['head_tilt'] +
            avg_mouth_score * self.weights['mouth_movement'] +
            face_score * self.weights['face_presence']
        )
        
        return total_score
        
    def get_cheating_status(self, score):
        """Get cheating status based on score"""
        if score >= 0.8:
            return "HIGH RISK", (0, 0, 255)  # Red
        elif score >= 0.5:
            return "MEDIUM RISK", (0, 165, 255)  # Orange
        elif score >= 0.3:
            return "LOW RISK", (0, 255, 255)  # Yellow
        else:
            return "SAFE", (0, 255, 0)  # Green

    def update_session_stats(self, score, status, multiple_faces=False, face_absent=False):
        """Update session statistics"""
        self.session_scores.append(score)
        
        if status == "HIGH RISK":
            self.high_risk_count += 1
        elif status == "MEDIUM RISK":
            self.medium_risk_count += 1
        elif status == "LOW RISK":
            self.low_risk_count += 1
        else:
            self.safe_count += 1
            
        if multiple_faces:
            self.multiple_faces_count += 1
        if face_absent:
            self.face_absence_count += 1
            
    def get_session_summary(self):
        """Get session summary statistics"""
        session_duration = time.time() - self.session_start_time
        total_frames = len(self.session_scores)
        
        if total_frames == 0:
            return "No data collected during session."
            
        avg_score = sum(self.session_scores) / total_frames
        max_score = max(self.session_scores)
        
        # Calculate percentages
        total_risky_frames = self.high_risk_count + self.medium_risk_count
        risky_percentage = (total_risky_frames / total_frames) * 100
        
        # Calculate final score out of 100
        # Convert the average score (0-1) to a score out of 100
        # Higher score means more suspicious behavior
        final_score = int(avg_score * 100)
        final_score =100-final_score
        
        # Determine verdict based on final score
        if final_score >= 80:
            verdict = "HIGH RISK - Suspicious behavior detected"
        elif final_score >= 50:
            verdict = "MEDIUM RISK - Some suspicious behavior"
        elif final_score >= 30:
            verdict = "LOW RISK - Minor suspicious behavior"
        else:
            verdict = "SAFE - No significant suspicious behavior"
            
        summary = f"""
Session Summary:
---------------
Duration: {session_duration:.1f} seconds
Total Frames: {total_frames}

Risk Distribution:
- High Risk: {self.high_risk_count} frames
- Medium Risk: {self.medium_risk_count} frames
- Low Risk: {self.low_risk_count} frames
- Safe: {self.safe_count} frames

Incidents:
- Multiple Faces: {self.multiple_faces_count} times
- Face Absence: {self.face_absence_count} times

Statistics:
- Average Risk Score: {avg_score:.2f}
- Maximum Risk Score: {max_score:.2f}
- Risky Behavior: {risky_percentage:.1f}% of session

Final Score: {final_score}/100
Final Verdict: {verdict}
"""
        return summary

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global detector instance
detector = None

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok"})

@app.route('/process-frame', methods=['POST'])
def process_frame():
    """Process a single frame from the frontend"""
    global detector
    
    try:
        # Get frame data from request
        data = request.json
        if not data or 'frame' not in data:
            return jsonify({"error": "No frame data provided"}), 400
            
        # Decode base64 image
        frame_data = data['frame'].split(',')[1]  # Remove data URL prefix
        frame_bytes = base64.b64decode(frame_data)
        nparr = np.frombuffer(frame_bytes, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify({"error": "Failed to decode frame"}), 400
            
        # Initialize detector if not already done
        if detector is None:
            detector = CheatingDetector()
            
        # Mirror frame
        frame = mirrorImage(frame)
        
        # Process frame with MediaPipe
        with mp_face_mesh.FaceMesh(
            max_num_faces=2,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        ) as face_mesh:
            # Convert to RGB for MediaPipe
            rgb_frame = bgr2rgb(frame)
            results = face_mesh.process(rgb_frame)
            
            # Update face presence
            num_faces = len(results.multi_face_landmarks) if results.multi_face_landmarks else 0
            face_absent = not detector.update_face_presence(num_faces)
            
            if face_absent:
                return jsonify({
                    "status": "error",
                    "message": "Face absent for too long",
                    "score": 1.0,
                    "risk_level": "HIGH RISK"
                })
                
            # Process face landmarks
            if results.multi_face_landmarks:
                for face_landmarks in results.multi_face_landmarks:
                    # Get various metrics
                    head_tilt_pose = pipelineHeadTiltPose(frame, face_landmarks)
                    mouth_state = pipelineMouthState(frame, face_landmarks)
                    gaze_info = pipelineEyeGaze(frame, face_landmarks)
                    
                    # Calculate cheating score
                    score = detector.calculate_cheating_score(gaze_info, head_tilt_pose, mouth_state)
                    status, _ = detector.get_cheating_status(score)
                    
                    # Update session statistics
                    detector.update_session_stats(score, status, 
                                                multiple_faces=detector.multiple_faces_detected)
                    
                    return jsonify({
                        "status": "success",
                        "score": float(score),
                        "risk_level": status,
                        "metrics": {
                            "head_tilt": head_tilt_pose,
                            "mouth_state": mouth_state,
                            "gaze_direction": gaze_info['direction'],
                            "multiple_faces": detector.multiple_faces_detected
                        }
                    })
                    
            # No face detected
            return jsonify({
                "status": "error",
                "message": "No face detected",
                "score": 1.0,
                "risk_level": "HIGH RISK"
            })
            
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/get-session-summary', methods=['GET'])
def get_session_summary():
    """Get the current session summary"""
    global detector
    if detector is None:
        return jsonify({"error": "No active session"}), 400
        
    summary = detector.get_session_summary()
    return jsonify({"summary": summary})

@app.route('/reset-session', methods=['POST'])
def reset_session():
    """Reset the current session"""
    global detector
    detector = CheatingDetector()
    return jsonify({"status": "success", "message": "Session reset"})

if __name__ == "__main__":
    # Initialize detector
    detector = CheatingDetector()
    
    # Run Flask app
    app.run(host='0.0.0.0', port=5000, debug=True) 