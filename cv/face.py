import cv2
import mediapipe as mp
import numpy as np
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_face_mesh = mp.solutions.face_mesh

from g_helper import bgr2rgb, rgb2bgr, mirrorImage
from fp_helper import pipelineHeadTiltPose, draw_face_landmarks_fp
from ms_helper import pipelineMouthState
from eg_helper import pipelineEyeGaze  # Import the new eye gaze module

# Initiate Camera
cap = cv2.VideoCapture(0)

with mp_face_mesh.FaceMesh(
    max_num_faces=1, 
    refine_landmarks=True,  # Important for iris detection
    min_detection_confidence=0.5, 
    min_tracking_confidence=0.5
) as face_mesh:
    while cap.isOpened():
        success, image = cap.read()
        if not success:
            print("Ignoring empty camera frame.")
            continue

        # Mirror image (Optional)
        image = mirrorImage(image)

        # Generate face mesh
        results = face_mesh.process(bgr2rgb(image))

        # Processing Face Landmarks
        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                # FACE MESH ----------------------------------------
                draw_face_landmarks_fp(image, face_landmarks)

                # HEAD TILT POSE -----------------------------------
                head_tilt_pose = pipelineHeadTiltPose(image, face_landmarks)

                # MOUTH STATE --------------------------------------
                mouth_state = pipelineMouthState(image, face_landmarks)

                # EYE GAZE DETECTION ------------------------------
                gaze_info = pipelineEyeGaze(image, face_landmarks)
                
                # Display overall status at the bottom
                status_text = f"Head: {head_tilt_pose} | Mouth: {mouth_state} | Gaze: {gaze_info['direction']} | Out of screen: {'Yes' if gaze_info['out_of_screen'] else 'No'}"
                cv2.putText(image, status_text, (10, image.shape[0] - 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

        # Show Image
        cv2.imshow('Face Movement & Gaze Detection', image)
        if cv2.waitKey(1) == ord('q'):
            break
cap.release()