import cv2
import mediapipe as mp
import time
import math
from collections import deque
import pyautogui

# ------------------ Generator Function ------------------
def gen_frames():
    import mediapipe as mp
    from mediapipe.tasks import python
    from mediapipe.tasks.python import vision
    import os

    # Load Pose Task Model from temple_run directory
    # Note: Using absolute path or path relative to execution can be tricky in Flask. 
    # Let's try to construct it dynamically relative to this file or use the provided path.
    # Provided path: backend/games/temple_run/pose_landmarker_lite.task
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # Go up to 'games' then down to 'temple_run'
    model_path = os.path.join(current_dir, '..', 'temple_run', 'pose_landmarker_lite.task')
    
    # Verify file exists
    if not os.path.exists(model_path):
        print(f"Error: Model file not found at {model_path}")
        return

    base_options = python.BaseOptions(model_asset_path=model_path)
    options = vision.PoseLandmarkerOptions(
        base_options=base_options,
        running_mode=vision.RunningMode.VIDEO
    )
    
    # Create detector
    detector = vision.PoseLandmarker.create_from_options(options)

    # Webcam
    cap = cv2.VideoCapture(0)
    frame_id = 0
    
    # State variables
    current_key = None
    last_nitro_time = 0
    
    # Track wrist positions for pumping motion detection
    left_wrist_history = deque(maxlen=8)
    right_wrist_history = deque(maxlen=8)
    prev_arm_spread = None
    
    # Helper Functions
    def dist(a, b):
        return math.hypot(a[0] - b[0], a[1] - b[1])
        
    def calculate_pumping_speed(wrist_history):
        if len(wrist_history) < 3:
            return 0
        total_vertical_movement = 0
        for i in range(1, len(wrist_history)):
            vertical_dist = abs(wrist_history[i][1] - wrist_history[i-1][1])
            total_vertical_movement += vertical_dist
        return total_vertical_movement
        
    def draw_skeleton_and_motion_trails(frame, landmarks, w, h, left_history, right_history):
        # Extract key landmarks
        # PoseLandmarker returns NormalizedLandmark objects (x, y, z)
        
        pts = {}
        for idx, name in [(0, 'head'), (11, 'ls'), (12, 'rs'), (13, 'le'), 
                         (14, 're'), (15, 'lw'), (16, 'rw')]:
            lm = landmarks[idx]
            pts[name] = (int(lm.x * w), int(lm.y * h))
            
        # Draw skeleton
        connections = [('ls', 'rs'), ('ls', 'le'), ('le', 'lw'), 
                      ('rs', 're'), ('re', 'rw')]
        
        for p1, p2 in connections:
            cv2.line(frame, pts[p1], pts[p2], (255, 255, 0), 2)
            
        for name, p in pts.items():
            cv2.circle(frame, p, 6, (0, 255, 0), -1)
            cv2.circle(frame, p, 8, (255, 255, 255), 2)
            
        # Motion trails
        for history, color in [(left_history, (255, 100, 255)), (right_history, (255, 100, 255))]:
            if len(history) > 1:
                for i in range(1, len(history)):
                    alpha = i / len(history)
                    c = (int(color[0] * alpha), color[1], int(color[2] * alpha)) # Simple fade
                    cv2.line(frame, history[i-1], history[i], color, 2)
                    
        return pts['head'], pts['ls'], pts['rs'], pts['lw'], pts['rw']

    def draw_guide_overlay(frame, h, w, current_state):
        overlay = frame.copy()
        cv2.rectangle(overlay, (w - 350, 10), (w - 10, 200), (0, 0, 0), -1)
        cv2.addWeighted(overlay, 0.6, frame, 0.4, 0, frame)
        
        cv2.putText(frame, "CONTROLS GUIDE", (w - 330, 35), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        
        # Helper to draw state lines
        def draw_state_line(y, label, desc, active_state):
            color = (0, 255, 255) if current_state == active_state else (200, 200, 200)
            cv2.putText(frame, label, (w - 330, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)
            cv2.putText(frame, desc, (w - 330, y + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.4, color, 1)
            
        draw_state_line(65, "BRAKE:", "Put hands on head", "BRAKE")
        draw_state_line(115, "NITRO:", "Spread arms wide (T-pose)", "NITRO")
        draw_state_line(165, "ACCELERATE:", "Pump arms up & down", "ACCELERATE")

    current_state = "IDLE"
    
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            continue

        frame = cv2.flip(frame, 1)
        h, w, _ = frame.shape
        
        # Convert to RGB + mp.Image for PoseLandmarker
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
        
        # Detect
        results = detector.detect_for_video(mp_image, int(time.time() * 1000))
        
        if results.pose_landmarks:
            landmarks = results.pose_landmarks[0] # List of NormalizedLandmark
            
            # Draw and get points
            head, ls, rs, lw, rw = draw_skeleton_and_motion_trails(
                frame, landmarks, w, h, left_wrist_history, right_wrist_history
            )
            
            left_wrist_history.append(lw)
            right_wrist_history.append(rw)
            
            now = time.time()
            
            # Logic Processing
            
            # 1. BRAKE (Hands on Head)
            left_to_head = dist(lw, head)
            right_to_head = dist(rw, head)
            
            if left_to_head < 120 and right_to_head < 120:
                if current_key != "a":
                    if current_key:
                        pyautogui.keyUp(current_key)
                    pyautogui.keyDown("a")
                    current_key = "a"
                
                current_state = "BRAKE"
                print("DEBUG: Braking - Holding 'A' key")
                cv2.putText(frame, "BRAKE (A)", (30, 80), cv2.FONT_HERSHEY_SIMPLEX, 2.5, (0, 0, 255), 5)
                
            # 2. NITRO (T-Pose)
            else:
                arm_spread = dist(lw, rw)
                shoulder_width = dist(ls, rs)
                
                left_arm_horizontal = abs(lw[1] - ls[1]) < 80
                right_arm_horizontal = abs(rw[1] - rs[1]) < 80
                arms_wide = arm_spread > shoulder_width * 2.5
                
                if left_arm_horizontal and right_arm_horizontal and arms_wide:
                    # Nitro is a single press usually (Shift)
                    if now - last_nitro_time > 1.0:
                        if current_key:
                            pyautogui.keyUp(current_key)
                            current_key = None
                        
                        pyautogui.press('shift') 
                        last_nitro_time = now
                        print("DEBUG: Nitro - Pressed 'SHIFT'")
                        
                    current_state = "NITRO"
                    cv2.putText(frame, "NITRO!", (30, 80), cv2.FONT_HERSHEY_SIMPLEX, 2.5, (0, 255, 255), 5)
                    
                # 3. ACCELERATE (Pumping Arms)
                else:
                    left_speed = calculate_pumping_speed(left_wrist_history)
                    right_speed = calculate_pumping_speed(right_wrist_history)
                    avg_speed = (left_speed + right_speed) / 2
                    
                    # Draw visual indicator for speed
                    # (Simplified drawing for brevity in generator)
                    cv2.putText(frame, f"Speed: {int(avg_speed)}", (30, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                    
                    if avg_speed > 15:
                        if current_key != "d":
                            if current_key:
                                pyautogui.keyUp(current_key)
                            pyautogui.keyDown("d")
                            current_key = "d"
                            
                        current_state = "ACCELERATE"
                        print("DEBUG: Accelerating - Holding 'D' key")
                        cv2.putText(frame, "GAS (D)", (30, 80), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 4)
                    else:
                        # IDLE / Coasting
                        if current_key:
                            pyautogui.keyUp(current_key)
                            current_key = None
                        current_state = "IDLE"
                        
        else:
            # No pose detected
            if current_key:
                pyautogui.keyUp(current_key)
                current_key = None
            current_state = "NO POSE"
            cv2.putText(frame, "NO POSE", (30, 80), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 4)
            
        draw_guide_overlay(frame, h, w, current_state)
        
        # Encode for web
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()