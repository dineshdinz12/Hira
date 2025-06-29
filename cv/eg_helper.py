import cv2
import mediapipe as mp
import numpy as np
from scipy.spatial import distance as dist
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_face_mesh = mp.solutions.face_mesh

# Eye landmark indices (based on MediaPipe's 468 point face mesh)
# Left eye landmarks
LEFT_EYE_INDICES = [
    # Upper eyelid
    159, 158, 157, 156, 33, 130, 243, 112,
    # Lower eyelid
    154, 153, 145, 144, 163, 7, 33, 246,
    # Iris landmarks
    468, 469, 470, 471, 472
]

# Right eye landmarks
RIGHT_EYE_INDICES = [
    # Upper eyelid
    386, 385, 384, 387, 263, 373, 390, 374,
    # Lower eyelid
    381, 380, 374, 373, 390, 249, 263, 466,
    # Iris landmarks
    473, 474, 475, 476, 477
]

# Eye corners - important for calculating gaze
LEFT_EYE_CORNERS = {
    'outer': 33,   # outer corner (towards ear)
    'inner': 133,  # inner corner (towards nose)
    'top': 159,    # top point of eye
    'bottom': 145  # bottom point of eye
}

RIGHT_EYE_CORNERS = {
    'outer': 263,  # outer corner (towards ear)
    'inner': 362,  # inner corner (towards nose)
    'top': 386,    # top point of eye
    'bottom': 374  # bottom point of eye
}

# Iris center points
LEFT_IRIS_CENTER = 468
RIGHT_IRIS_CENTER = 473

class EyeRegion:
    """A class to process and analyze an eye region"""
    
    def __init__(self, landmarks, img_shape, is_left=True):
        """
        Initialize an eye region from face landmarks
        
        Args:
            landmarks: MediaPipe face mesh landmarks
            img_shape: Image dimensions (height, width)
            is_left: Whether this is the left eye (True) or right eye (False)
        """
        self.landmarks = landmarks
        self.img_h, self.img_w = img_shape[:2]
        self.is_left = is_left
        
        # Get relevant indices for this eye
        if is_left:
            self.eye_indices = LEFT_EYE_INDICES
            self.iris_center_idx = LEFT_IRIS_CENTER
            self.corner_indices = LEFT_EYE_CORNERS
        else:
            self.eye_indices = RIGHT_EYE_INDICES
            self.iris_center_idx = RIGHT_IRIS_CENTER
            self.corner_indices = RIGHT_EYE_CORNERS
            
        # Extract eye region points
        self.eye_points = []
        self.iris_center = None
        self.corners = {}
        
        self._extract_landmarks()
        self._calculate_metrics()
        
    def _extract_landmarks(self):
        """Extract landmark points for the eye region"""
        # Get all eye contour points
        for idx in self.eye_indices:
            x = int(self.landmarks.landmark[idx].x * self.img_w)
            y = int(self.landmarks.landmark[idx].y * self.img_h)
            self.eye_points.append((x, y))
            
        # Get iris center
        iris = self.landmarks.landmark[self.iris_center_idx]
        self.iris_center = (int(iris.x * self.img_w), int(iris.y * self.img_h))
        
        # Get corner points
        for name, idx in self.corner_indices.items():
            point = self.landmarks.landmark[idx]
            self.corners[name] = (int(point.x * self.img_w), int(point.y * self.img_h))
    
    def _calculate_metrics(self):
        """Calculate eye metrics like iris position"""
        # Calculate iris position ratios
        # 0 = far left/top, 1 = far right/bottom
        eye_width = dist.euclidean(self.corners['outer'], self.corners['inner'])
        eye_height = dist.euclidean(self.corners['top'], self.corners['bottom'])
        
        # If the eye is the left eye, the inner corner is on the right
        if self.is_left:
            horizontal_position = dist.euclidean(self.iris_center, self.corners['inner']) / (eye_width + 1e-6)
            # Invert the ratio since the inner corner is on the right for left eye
            self.iris_x_ratio = 1.0 - horizontal_position
        else:
            horizontal_position = dist.euclidean(self.iris_center, self.corners['inner']) / (eye_width + 1e-6)
            self.iris_x_ratio = horizontal_position
            
        vertical_position = dist.euclidean(self.iris_center, self.corners['top']) / (eye_height + 1e-6)
        self.iris_y_ratio = vertical_position
    
    def draw(self, image, color=(0, 255, 0)):
        """Draw eye region on the image for visualization"""
        # Draw eye contour
        pts = np.array(self.eye_points, np.int32)
        pts = pts.reshape((-1, 1, 2))
        cv2.polylines(image, [pts], True, (0, 255, 255), 1)
        
        # Draw iris center
        cv2.circle(image, self.iris_center, 3, color, -1)
        
        # Draw corner points
        for name, point in self.corners.items():
            cv2.circle(image, point, 2, (0, 0, 255), -1)
            
        # Draw bounding box around the eye
        x_min = min(p[0] for p in self.eye_points)
        y_min = min(p[1] for p in self.eye_points)
        x_max = max(p[0] for p in self.eye_points)
        y_max = max(p[1] for p in self.eye_points)
        cv2.rectangle(image, (x_min, y_min), (x_max, y_max), (255, 0, 0), 1)
        
        # Display metrics
        if self.is_left:
            pos_text = f"L-Eye: x={self.iris_x_ratio:.2f}, y={self.iris_y_ratio:.2f}"
            cv2.putText(image, pos_text, (10, self.corners['bottom'][1] + 20), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.4, color, 1)
        else:
            pos_text = f"R-Eye: x={self.iris_x_ratio:.2f}, y={self.iris_y_ratio:.2f}"
            cv2.putText(image, pos_text, (self.corners['outer'][0] - 150, self.corners['bottom'][1] + 20), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.4, color, 1)

def getEyeRegions(face_landmarks, img_shape):
    """Create eye region objects for both eyes"""
    left_eye = EyeRegion(face_landmarks, img_shape, is_left=True)
    right_eye = EyeRegion(face_landmarks, img_shape, is_left=False)
    return left_eye, right_eye

def determineEyeGaze(left_eye, right_eye):
    """Determine eye gaze direction based on iris positions"""
    # Average the iris position ratios
    avg_x_ratio = (left_eye.iris_x_ratio + right_eye.iris_x_ratio) / 2
    avg_y_ratio = (left_eye.iris_y_ratio + right_eye.iris_y_ratio) / 2
    
    # Determine horizontal gaze
    if avg_x_ratio < 0.35:
        horizontal_dir = "Left"
    elif avg_x_ratio > 0.60:
        horizontal_dir = "Right"
    else:
        horizontal_dir = "Center"
    
    # Determine vertical gaze
    if avg_y_ratio < 0.35:
        vertical_dir = "Up"
    elif avg_y_ratio > 0.65:
        vertical_dir = "Down"
    else:
        vertical_dir = "Center"
    
    # Combine directions
    if vertical_dir == "Center" and horizontal_dir == "Center":
        gaze_dir = "Center"
    else:
        gaze_dir = f"{vertical_dir}-{horizontal_dir}"
    
    # Determine if looking at screen
    out_of_screen = False
    extreme_threshold = 0.15  # Threshold for extreme gaze
    if avg_x_ratio < extreme_threshold or avg_x_ratio > (1 - extreme_threshold) or \
       avg_y_ratio < extreme_threshold or avg_y_ratio > (1 - extreme_threshold):
        out_of_screen = True
    
    # Create gaze info dictionary
    gaze_info = {
        'direction': gaze_dir,
        'horizontal': horizontal_dir,
        'vertical': vertical_dir,
        'out_of_screen': out_of_screen,
        'l_x_ratio': left_eye.iris_x_ratio,
        'l_y_ratio': left_eye.iris_y_ratio,
        'r_x_ratio': right_eye.iris_x_ratio,
        'r_y_ratio': right_eye.iris_y_ratio,
        'avg_x_ratio': avg_x_ratio,
        'avg_y_ratio': avg_y_ratio
    }
    
    return gaze_info

def drawAttentionMap(image, gaze_info, alpha=0.3):
    """Draw a heatmap indicating where the user is looking"""
    h, w = image.shape[:2]
    attention_map = np.zeros((h, w), dtype=np.float32)
    
    # Don't draw map if out of screen
    if gaze_info['out_of_screen']:
        return image
    
    # Create a gaussian attention map
    center_x = int(w * gaze_info['avg_x_ratio'])
    center_y = int(h * gaze_info['avg_y_ratio'])
    sigma = min(w, h) // 8  # Size of the attention bubble
    
    y, x = np.ogrid[:h, :w]
    attention_map = np.exp(-((x - center_x) ** 2 + (y - center_y) ** 2) / (2 * sigma ** 2))
    
    # Apply the attention map as a heatmap overlay
    heatmap = cv2.applyColorMap((attention_map * 255).astype(np.uint8), cv2.COLORMAP_JET)
    overlay = image.copy()
    
    # Blend the heatmap with the original image
    cv2.addWeighted(heatmap, alpha, image, 1 - alpha, 0, overlay)
    
    # Draw the focus point
    cv2.circle(overlay, (center_x, center_y), 5, (0, 255, 255), -1)
    
    return overlay

def drawGazeVisualization(image, left_eye, right_eye, gaze_info):
    """Draw eye gaze visualization on the image"""
    # Draw eye regions
    left_eye.draw(image)
    right_eye.draw(image)
    
    # Draw gaze direction text
    cv2.putText(image, f"GAZE: {gaze_info['direction']}", (20, 50), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 0, 255), 2)
    
    # Draw screen attention status
    attention_status = "No" if gaze_info['out_of_screen'] else "Yes"
    cv2.putText(image, f"Looking at screen: {attention_status}", (20, 75), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 0, 255), 2)
    
    # Draw iris position ratios
    cv2.putText(image, f"H-ratio: {gaze_info['avg_x_ratio']:.2f}, V-ratio: {gaze_info['avg_y_ratio']:.2f}", 
                (20, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)
    
    # Draw gaze direction arrow
    h, w = image.shape[:2]
    center_x, center_y = w // 2, h // 2
    arrow_length = 50
    
    # Calculate arrow end point based on gaze direction
    dx = (gaze_info['avg_x_ratio'] - 0.5) * 2  # Map from [0,1] to [-1,1]
    dy = (gaze_info['avg_y_ratio'] - 0.5) * 2  # Map from [0,1] to [-1,1]
    
    # Draw a directional arrow at the bottom right corner
    arrow_start = (w - 100, h - 100)
    arrow_end = (int(arrow_start[0] + dx * arrow_length), 
                int(arrow_start[1] + dy * arrow_length))
    
    cv2.arrowedLine(image, arrow_start, arrow_end, (0, 255, 0), 2, 
                    tipLength=0.3)

def pipelineEyeGaze(image, face_landmarks):
    """Process face landmarks to detect eye gaze direction"""
    img_shape = image.shape
    
    # Get eye regions
    left_eye, right_eye = getEyeRegions(face_landmarks, img_shape)
    
    # Determine gaze direction
    gaze_info = determineEyeGaze(left_eye, right_eye)
    
    # Draw visualization
    drawGazeVisualization(image, left_eye, right_eye, gaze_info)
    
    # Optional: Uncomment to add attention map overlay
    # image = drawAttentionMap(image, gaze_info)
    
    return gaze_info