import cv2
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import math
import os
from collections import deque

# Open webcam (0 is usually the default camera)
cap = cv2.VideoCapture(0)

# Load Pose Landmarker model from the ARM folder
model_path = os.path.join('pose_landmarker_lite.task')
base_options = python.BaseOptions(model_asset_path=model_path)
options = vision.PoseLandmarkerOptions(
    base_options=base_options,
    running_mode=vision.RunningMode.VIDEO,
)

detector = vision.PoseLandmarker.create_from_options(options)

# Rep counter and state
count = 0
state = 'unknown'  # 'open' (arms+legs apart) or 'closed' (arms+legs together)
frame_id = 0

# Smoothing: keep recent 'open' booleans to avoid flicker
SMOOTHING_WINDOW = 3
recent_open = deque(maxlen=SMOOTHING_WINDOW)

# Tuning constants (change these to adjust sensitivity)
HAND_OPEN_FACTOR = 0.22
HAND_CLOSE_FACTOR = 0.14
FOOT_OPEN_FACTOR = 0.12
FOOT_CLOSE_FACTOR = 0.06
DEBUG = False  # Set to True to enable debug prints and on-screen guides for tuning

# Landmark indices (Pose 33 landmarks)
LEFT_FOOT = 31
RIGHT_FOOT = 32
LEFT_WRIST = 15
RIGHT_WRIST = 16

# Helper to convert normalized landmark to pixel coords
def to_px(lm, width, height):
    return int(lm.x * width), int(lm.y * height)


# Main loop
while True:
    success, frame = cap.read()
    if not success:
        print("Failed to grab frame from camera")
        break

    # Resize and convert to RGB
    frame = cv2.resize(frame, (640, 360))
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
    results = detector.detect_for_video(mp_image, frame_id)
    frame_id += 1

    h, w, _ = frame.shape

    if results.pose_landmarks:
        landmarks = results.pose_landmarks[0]  # first detected person

        # Extract keypoints
        foot_left = to_px(landmarks[LEFT_FOOT], w, h)
        foot_right = to_px(landmarks[RIGHT_FOOT], w, h)
        # Use wrists for hand separation (more reliable)
        hand_left = to_px(landmarks[LEFT_WRIST], w, h)
        hand_right = to_px(landmarks[RIGHT_WRIST], w, h)

        # Draw keypoints
        cv2.circle(frame, hand_left, 6, (0, 255, 0), -1)
        cv2.circle(frame, hand_right, 6, (0, 255, 0), -1)
        cv2.circle(frame, foot_left, 6, (255, 0, 0), -1)
        cv2.circle(frame, foot_right, 6, (255, 0, 0), -1)

        # Distances in pixels (MOVED BEFORE DEBUG TEXT)
        dist_hands = math.hypot(
            hand_left[0] - hand_right[0], hand_left[1] - hand_right[1])
        dist_feet = math.hypot(
            foot_left[0] - foot_right[0], foot_left[1] - foot_right[1])

        # Draw threshold guides (optional; shown only in DEBUG mode)
        if DEBUG:
            cv2.putText(frame, f'Hand gap: {int(dist_hands)}',
                        (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
            cv2.putText(frame, f'Feet gap: {int(dist_feet)}', (10, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

        # Dynamic thresholds (relative to frame width)
        hand_open_thresh = w * HAND_OPEN_FACTOR
        hand_close_thresh = w * HAND_CLOSE_FACTOR
        foot_open_thresh = w * FOOT_OPEN_FACTOR
        foot_close_thresh = w * FOOT_CLOSE_FACTOR

        # Determine open/closed based on thresholds
        is_open = (dist_hands > hand_open_thresh) and (
            dist_feet > foot_open_thresh)
        is_closed = (dist_hands < hand_close_thresh) and (
            dist_feet < foot_close_thresh)

        # Smooth the open signal
        recent_open.append(is_open)
        smoothed_open = sum(recent_open) >= (SMOOTHING_WINDOW // 2 + 1)

        # Initialize or update state
        if state == 'unknown':
            # Default to 'closed' unless we already see an open pose
            if smoothed_open:
                state = 'open'  # don't count initial open as a rep
            else:
                state = 'closed'
        else:
            # Count only when moving from 'closed' to 'open'
            if state != 'open' and smoothed_open:
                count += 1
                state = 'open'
                if DEBUG:
                    print(f'Jumping jack counted: {count}')
            elif is_closed:
                state = 'closed'

        # Optional: print distances for tuning
        if DEBUG:
            print(
                f'Hands: {dist_hands:.1f}, Feet: {dist_feet:.1f}, State: {state}')

    # Draw counter box
    h, w, _ = frame.shape
    cv2.rectangle(frame, (w - 220, 20), (w - 20, 100), (255, 0, 0), -1)
    cv2.putText(frame, f'COUNT: {count}', (w - 200, 80),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

    # Show the frame
    cv2.imshow('Jumping Jack Counter', frame)

    # Press 'q' to quit
    if cv2.waitKey(40) & 0xFF == ord('q'):
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()