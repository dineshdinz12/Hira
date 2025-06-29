import cv2
import numpy as np
import time
import datetime
import face_recognition
import dlib
from scipy.spatial import distance as dist
import threading
import csv
import os
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

class ProctorSystem:
    def __init__(self, reference_image_path, session_id=None):
        """
        Initialize the proctoring system with a reference image
        
        Parameters:
        reference_image_path (str): Path to reference image for face verification
        session_id (str): Optional session identifier
        """
        self.session_id = session_id or datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        self.reference_image = face_recognition.load_image_file(reference_image_path)
        self.reference_encoding = face_recognition.face_encodings(self.reference_image)[0]
        
        # Initialize metrics
        self.start_time = time.time()
        self.score = 100
        self.events = []
        self.verified = False
        
        # Detection parameters
        self.face_detector = dlib.get_frontal_face_detector()
        self.landmark_predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
        self.EYE_AR_THRESH = 0.2
        self.EYE_AR_CONSEC_FRAMES = 3
        self.gaze_direction_history = []
        self.head_pose_history = []
        self.absence_start_time = None
        self.is_absent = False
        
        # Setup output directories
        self.setup_output_dirs()
        
        # Penalty weights
        self.penalties = {
            "absence": 10,  # Candidate not in frame
            "gaze_away": 5,  # Looking away from screen
            "unusual_head_pose": 5,  # Unusual head movement
            "multiple_faces": 15,  # Multiple faces detected
        }
    
    def setup_output_dirs(self):
        """Create directories for output files"""
        os.makedirs(f"sessions/{self.session_id}", exist_ok=True)
        os.makedirs(f"sessions/{self.session_id}/suspicious_frames", exist_ok=True)
        
        # Initialize CSV log file
        with open(f"sessions/{self.session_id}/events.csv", 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['Timestamp', 'Event', 'Penalty', 'Current Score'])
    
    def verify_identity(self, frame):
        """
        Verify if the person in the frame matches the reference photo
        
        Parameters:
        frame (numpy.ndarray): Current video frame
        
        Returns:
        bool: True if identity is verified, False otherwise
        """
        face_locations = face_recognition.face_locations(frame)
        
        if not face_locations:
            return False
        
        face_encodings = face_recognition.face_encodings(frame, face_locations)
        
        if not face_encodings:
            return False
        
        # Compare with reference face
        matches = face_recognition.compare_faces([self.reference_encoding], face_encodings[0])
        face_distance = face_recognition.face_distance([self.reference_encoding], face_encodings[0])
        
        # Log verification attempt
        match_result = matches[0]
        match_confidence = 1 - face_distance[0]
        
        if match_result and match_confidence > 0.6:
            self.verified = True
            self.log_event("Identity verified", 0)
            return True
        else:
            self.log_event("Identity verification failed", 0)
            return False
    
    def get_eye_aspect_ratio(self, eye_landmarks):
        """
        Calculate the eye aspect ratio to determine eye openness
        
        Parameters:
        eye_landmarks (list): List of (x,y) coordinates of eye landmarks
        
        Returns:
        float: Eye aspect ratio
        """
        # Compute the euclidean distances between the two sets of
        # vertical eye landmarks (x, y)-coordinates
        A = dist.euclidean(eye_landmarks[1], eye_landmarks[5])
        B = dist.euclidean(eye_landmarks[2], eye_landmarks[4])
        
        # Compute the euclidean distance between the horizontal
        # eye landmark (x, y)-coordinates
        C = dist.euclidean(eye_landmarks[0], eye_landmarks[3])
        
        # Compute the eye aspect ratio
        ear = (A + B) / (2.0 * C)
        return ear
    
    def detect_gaze_direction(self, frame, landmarks):
        """
        Detect if the candidate is looking away from the screen
        
        Parameters:
        frame (numpy.ndarray): Current video frame
        landmarks (dlib.full_object_detection): Facial landmarks
        
        Returns:
        bool: True if looking away, False otherwise
        """
        # Get the left and right eye landmarks
        left_eye = []
        right_eye = []
        
        for i in range(36, 42):
            left_eye.append((landmarks.part(i).x, landmarks.part(i).y))
        
        for i in range(42, 48):
            right_eye.append((landmarks.part(i).x, landmarks.part(i).y))
        
        # Calculate the eye aspect ratio
        left_ear = self.get_eye_aspect_ratio(left_eye)
        right_ear = self.get_eye_aspect_ratio(right_eye)
        
        # Calculate the position of the iris relative to the eye
        left_eye_center = np.mean(left_eye, axis=0).astype(int)
        right_eye_center = np.mean(right_eye, axis=0).astype(int)
        
        # Extract eye regions
        left_eye_region = frame[left_eye_center[1]-10:left_eye_center[1]+10, 
                                left_eye_center[0]-15:left_eye_center[0]+15]
        right_eye_region = frame[right_eye_center[1]-10:right_eye_center[1]+10, 
                                 right_eye_center[0]-15:right_eye_center[0]+15]
        
        # Check if eye regions are valid
        if left_eye_region.size == 0 or right_eye_region.size == 0:
            return False
        
        # Convert to grayscale
        if len(left_eye_region.shape) == 3:
            left_eye_region = cv2.cvtColor(left_eye_region, cv2.COLOR_BGR2GRAY)
        if len(right_eye_region.shape) == 3:
            right_eye_region = cv2.cvtColor(right_eye_region, cv2.COLOR_BGR2GRAY)
        
        # Threshold to find the iris
        _, left_threshold = cv2.threshold(left_eye_region, 70, 255, cv2.THRESH_BINARY_INV)
        _, right_threshold = cv2.threshold(right_eye_region, 70, 255, cv2.THRESH_BINARY_INV)
        
        # Find the position of the darkest part (iris)
        left_moments = cv2.moments(left_threshold)
        right_moments = cv2.moments(right_threshold)
        
        # Check if moments are valid
        if left_moments["m00"] == 0 or right_moments["m00"] == 0:
            return False
        
        left_iris_x = int(left_moments["m10"] / left_moments["m00"])
        right_iris_x = int(right_moments["m10"] / right_moments["m00"])
        
        # Determine the position of the iris relative to the eye center
        left_eye_width = left_eye_region.shape[1]
        right_eye_width = right_eye_region.shape[1]
        
        left_iris_position = left_iris_x / left_eye_width
        right_iris_position = right_iris_x / right_eye_width
        
        # Add to history
        self.gaze_direction_history.append((left_iris_position, right_iris_position))
        if len(self.gaze_direction_history) > 10:
            self.gaze_direction_history.pop(0)
        
        # Average over recent history to reduce noise
        avg_left = np.mean([p[0] for p in self.gaze_direction_history])
        avg_right = np.mean([p[1] for p in self.gaze_direction_history])
        
        # If iris is too far left or right in both eyes, consider looking away
        if (avg_left < 0.3 and avg_right < 0.3) or (avg_left > 0.7 and avg_right > 0.7):
            return True
        
        return False
    
    def detect_head_pose(self, landmarks):
        """
        Estimate head pose to detect unusual movements
        
        Parameters:
        landmarks (dlib.full_object_detection): Facial landmarks
        
        Returns:
        bool: True if head pose is unusual, False otherwise
        """
        # Get key facial landmarks for head pose estimation
        nose_tip = (landmarks.part(30).x, landmarks.part(30).y)
        chin = (landmarks.part(8).x, landmarks.part(8).y)
        left_eye_left = (landmarks.part(36).x, landmarks.part(36).y)
        right_eye_right = (landmarks.part(45).x, landmarks.part(45).y)
        left_mouth = (landmarks.part(48).x, landmarks.part(48).y)
        right_mouth = (landmarks.part(54).x, landmarks.part(54).y)
        
        # Calculate simple metrics for head pose
        eye_distance = dist.euclidean(left_eye_left, right_eye_right)
        mouth_width = dist.euclidean(left_mouth, right_mouth)
        nose_to_chin = dist.euclidean(nose_tip, chin)
        
        # Calculate proportions that should remain relatively stable
        # regardless of distance to camera
        eye_to_mouth_ratio = eye_distance / mouth_width if mouth_width > 0 else 0
        nose_to_chin_ratio = nose_to_chin / eye_distance if eye_distance > 0 else 0
        
        # Add to history
        self.head_pose_history.append((eye_to_mouth_ratio, nose_to_chin_ratio))
        if len(self.head_pose_history) > 20:
            self.head_pose_history.pop(0)
        
        # Need enough history to make a determination
        if len(self.head_pose_history) < 10:
            return False
        
        # Calculate baseline (average of first 10 frames)
        baseline_eye_mouth = np.mean([h[0] for h in self.head_pose_history[:10]])
        baseline_nose_chin = np.mean([h[1] for h in self.head_pose_history[:10]])
        
        # Calculate current values (average of last 3 frames)
        current_eye_mouth = np.mean([h[0] for h in self.head_pose_history[-3:]])
        current_nose_chin = np.mean([h[1] for h in self.head_pose_history[-3:]])
        
        # Check for significant deviation
        eye_mouth_deviation = abs(current_eye_mouth - baseline_eye_mouth) / baseline_eye_mouth
        nose_chin_deviation = abs(current_nose_chin - baseline_nose_chin) / baseline_nose_chin
        
        # If either ratio has changed significantly, flag as unusual head pose
        if eye_mouth_deviation > 0.25 or nose_chin_deviation > 0.25:
            return True
        
        return False
    
    def check_presence(self, frame):
        """
        Check if candidate is present in the frame
        
        Parameters:
        frame (numpy.ndarray): Current video frame
        
        Returns:
        bool: True if candidate is missing, False if present
        """
        face_locations = face_recognition.face_locations(frame)
        
        if not face_locations:
            # If no face detected
            if not self.is_absent:
                self.absence_start_time = time.time()
                self.is_absent = True
            
            # Only count as absence if it's been more than 3 seconds
            if time.time() - self.absence_start_time > 3:
                return True
        else:
            # Reset absence status if face detected
            self.is_absent = False
            self.absence_start_time = None
            
            # Check for multiple faces
            if len(face_locations) > 1:
                self.log_event("Multiple faces detected", self.penalties["multiple_faces"])
                self.save_suspicious_frame(frame, "multiple_faces")
        
        return False
    
    def process_frame(self, frame):
        """
        Process a video frame to detect suspicious behaviors
        
        Parameters:
        frame (numpy.ndarray): Current video frame
        
        Returns:
        numpy.ndarray: Annotated frame
        bool: False if processing should stop
        """
        # If identity not yet verified, verify first
        if not self.verified:
            identity_verified = self.verify_identity(frame)
            
            # Draw verification status on frame
            status_text = "Identity Verified" if identity_verified else "Verifying Identity..."
            color = (0, 255, 0) if identity_verified else (0, 0, 255)
            cv2.putText(frame, status_text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
            
            return frame, identity_verified
        
        # Check for absence
        if self.check_presence(frame):
            self.log_event("Candidate absent from camera", self.penalties["absence"])
            self.save_suspicious_frame(frame, "absence")
            
            # Draw absence warning on frame
            cv2.putText(frame, "CANDIDATE ABSENT", (10, 30), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
        
        # Convert to grayscale for face detection
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        faces = self.face_detector(gray, 0)
        
        for face in faces:
            # Get facial landmarks
            landmarks = self.landmark_predictor(gray, face)
            
            # Check gaze direction
            if self.detect_gaze_direction(gray, landmarks):
                self.log_event("Looking away from screen", self.penalties["gaze_away"])
                self.save_suspicious_frame(frame, "gaze_away")
                
                # Draw gaze warning on frame
                cv2.putText(frame, "LOOKING AWAY", (10, 60), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            
            # Check head pose
            if self.detect_head_pose(landmarks):
                self.log_event("Unusual head movement", self.penalties["unusual_head_pose"])
                self.save_suspicious_frame(frame, "head_pose")
                
                # Draw head pose warning on frame
                cv2.putText(frame, "UNUSUAL HEAD POSE", (10, 90), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            
            # Draw facial landmarks
            for n in range(68):
                x = landmarks.part(n).x
                y = landmarks.part(n).y
                cv2.circle(frame, (x, y), 2, (0, 255, 0), -1)
        
        # Display current score
        cv2.putText(frame, f"Score: {self.score}", (10, frame.shape[0] - 10), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        
        return frame, True
    
    def log_event(self, event_description, penalty):
        """
        Log a suspicious event
        
        Parameters:
        event_description (str): Description of the event
        penalty (int): Score penalty for this event
        """
        timestamp = time.time() - self.start_time
        formatted_time = str(datetime.timedelta(seconds=int(timestamp)))
        
        # Apply penalty to score
        self.score = max(0, self.score - penalty)
        
        # Record event
        self.events.append({
            'timestamp': formatted_time,
            'description': event_description,
            'penalty': penalty,
            'current_score': self.score
        })
        
        # Write to CSV
        with open(f"sessions/{self.session_id}/events.csv", 'a', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([formatted_time, event_description, penalty, self.score])
    
    def save_suspicious_frame(self, frame, event_type):
        """
        Save suspicious frames for review
        
        Parameters:
        frame (numpy.ndarray): Current video frame
        event_type (str): Type of suspicious event
        """
        timestamp = time.time() - self.start_time
        formatted_time = datetime.datetime.now().strftime("%H%M%S")
        
        frame_path = f"sessions/{self.session_id}/suspicious_frames/{event_type}_{formatted_time}.jpg"
        cv2.imwrite(frame_path, frame)
    
    def generate_report(self):
        """
        Generate a final report of the proctoring session
        
        Returns:
        dict: Report with verification status, events, score, and verdict
        """
        # Calculate session duration
        duration = time.time() - self.start_time
        formatted_duration = str(datetime.timedelta(seconds=int(duration)))
        
        # Determine final verdict
        verdict = "Likely Honest" if self.score >= 80 else "Potential Cheating"
        
        report = {
            "session_id": self.session_id,
            "identity_verified": self.verified,
            "duration": formatted_duration,
            "events": self.events,
            "final_score": self.score,
            "verdict": verdict
        }
        
        # Generate visualizations
        self.generate_visualizations()
        
        return report
    
    def generate_visualizations(self):
        """Generate visualizations of the proctoring session"""
        # Plot score over time
        timestamps = [event['timestamp'] for event in self.events]
        scores = [event['current_score'] for event in self.events]
        
        plt.figure(figsize=(12, 6))
        plt.plot(timestamps, scores, marker='o')
        plt.axhline(y=80, color='r', linestyle='--', label='Honesty Threshold')
        plt.title('Proctoring Score Over Time')
        plt.xlabel('Session Time')
        plt.ylabel('Score')
        plt.grid(True)
        plt.legend()
        plt.tight_layout()
        plt.savefig(f"sessions/{self.session_id}/score_timeline.png")
        
        # Count event types
        event_types = {}
        for event in self.events:
            event_type = event['description']
            if event_type not in event_types:
                event_types[event_type] = 0
            event_types[event_type] += 1
        
        if event_types:
            plt.figure(figsize=(10, 6))
            plt.bar(event_types.keys(), event_types.values())
            plt.title('Suspicious Events Distribution')
            plt.xlabel('Event Type')
            plt.ylabel('Count')
            plt.xticks(rotation=45, ha='right')
            plt.tight_layout()
            plt.savefig(f"sessions/{self.session_id}/event_distribution.png")
    
    def run(self, camera_id=0):
        """
        Run the proctoring system with live webcam feed
        
        Parameters:
        camera_id (int): Camera device ID
        """
        cap = cv2.VideoCapture(camera_id)
        
        if not cap.isOpened():
            print("Error: Could not open webcam.")
            return
        
        # Set video properties
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        
        print("Starting proctoring session...")
        print("Press 'q' to quit and generate report.")
        
        while True:
            ret, frame = cap.read()
            
            if not ret:
                print("Error: Failed to grab frame.")
                break
            
            # Process frame
            processed_frame, continue_processing = self.process_frame(frame)
            
            # Display the processed frame
            cv2.imshow('Proctoring System', processed_frame)
            
            # Stop if identity verification failed
            if not continue_processing and not self.verified:
                print("Identity verification failed. Stopping session.")
                break
            
            # Check for key press
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break
        
        # Clean up
        cap.release()
        cv2.destroyAllWindows()
        
        # Generate report
        report = self.generate_report()
        self.print_report(report)
        
        return report
    
    def print_report(self, report):
        """
        Print the proctoring report to console
        
        Parameters:
        report (dict): Report data
        """
        print("\n" + "="*50)
        print(f"PROCTORING SESSION REPORT (ID: {report['session_id']})")
        print("="*50)
        
        print(f"Identity Verification: {'PASS' if report['identity_verified'] else 'FAIL'}")
        print(f"Session Duration: {report['duration']}")
        print(f"Final Behavior Score: {report['final_score']}/100")
        print(f"Final Verdict: {report['verdict']}")
        
        print("\nSuspicious Events Timeline:")
        print("-"*50)
        if not report['events']:
            print("No suspicious events detected.")
        else:
            for event in report['events']:
                print(f"[{event['timestamp']}] {event['description']} (-{event['penalty']} points)")
        
        print("-"*50)
        print(f"Report saved to: sessions/{report['session_id']}/")
        print("="*50)


def main():
    """Main function to run the proctoring system"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Online Exam Proctoring System')
    parser.add_argument('--reference', '-r', type=str, required=True,
                        help='Path to reference image for face verification')
    parser.add_argument('--camera', '-c', type=int, default=0,
                        help='Camera device ID (default: 0)')
    parser.add_argument('--session', '-s', type=str, default=None,
                        help='Session ID (default: auto-generated)')
    
    args = parser.parse_args()
    
    # Check if reference image exists
    if not os.path.exists(args.reference):
        print(f"Error: Reference image '{args.reference}' not found.")
        return
    
    # Check if shape predictor file exists
    predictor_path = "shape_predictor_68_face_landmarks.dat"
    if not os.path.exists(predictor_path):
        print(f"Error: Shape predictor file '{predictor_path}' not found.")
        print("Please download it from: http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2")
        print("Extract and place it in the same directory as this script.")
        return
    
    # Create proctoring system
    proctor = ProctorSystem(args.reference, args.session)
    
    # Run proctoring
    proctor.run(args.camera)


if __name__ == "__main__":
    main()