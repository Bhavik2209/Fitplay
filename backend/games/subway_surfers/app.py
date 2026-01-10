# Import necessary packages
from flask import Flask, render_template, Response
import time
import cv2
import imutils
from imutils.video import VideoStream
import pyautogui
import numpy as np

app = Flask(__name__)

# generate frames and yield to Response
def gen_frames():
	# Load cascades - use cv2's built-in haarcascade
	face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

	# Start the video stream through the webcam
	vs = VideoStream(src=0).start()
	time.sleep(2.0)

	# State variables
	ACTION_COOLDOWN = 0.3
	last_action_time = 0
	curr_action = "CENTER"
	last_triggered_action = None
	
	# Calibration - store neutral face center position
	neutral_face_x = None
	neutral_face_y = None
	calib_frames = []
	CALIB_COUNT = 30

	while True:
		frame = vs.read()
		if frame is None:
			continue

		frame = cv2.flip(frame, 1)
		W = 640
		frame = imutils.resize(frame, width=W)
		(H, W) = frame.shape[:2]
		
		gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		
		action = None
		text_color = (0, 255, 0)
		
		# Detect faces
		faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(120, 120))
		
		if len(faces) > 0:
			# Get the largest face
			(fx, fy, fw, fh) = max(faces, key=lambda f: f[2] * f[3])
			
			# Calculate face center
			face_center_x = fx + fw // 2
			face_center_y = fy + fh // 2
			
			# Draw face
			cv2.rectangle(frame, (fx, fy), (fx + fw, fy + fh), (0, 255, 0), 2)
			cv2.circle(frame, (face_center_x, face_center_y), 8, (0, 255, 255), -1)
			
			# Calibration phase
			if len(calib_frames) < CALIB_COUNT:
				calib_frames.append({
					'x': face_center_x,
					'y': face_center_y
				})
				progress = len(calib_frames) / CALIB_COUNT
				bar_w = int(400 * progress)
				
				cv2.putText(frame, f"CALIBRATING: {len(calib_frames)}/{CALIB_COUNT}", 
						   (50, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 255), 2)
				cv2.putText(frame, "Look STRAIGHT at camera!", 
						   (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
				
				# Progress bar
				cv2.rectangle(frame, (50, 130), (450, 160), (50, 50, 50), 2)
				cv2.rectangle(frame, (50, 130), (50 + bar_w, 160), (0, 255, 255), -1)
			else:
				# Calibration complete
				if neutral_face_x is None:
					neutral_face_x = np.mean([f['x'] for f in calib_frames])
					neutral_face_y = np.mean([f['y'] for f in calib_frames])
					print(f"Calibrated - Center: ({neutral_face_x:.1f}, {neutral_face_y:.1f})")
				
				# Calculate movement from neutral position
				x_shift = face_center_x - neutral_face_x
				y_shift = face_center_y - neutral_face_y
				
				# Draw neutral position reference
				cv2.circle(frame, (int(neutral_face_x), int(neutral_face_y)), 12, (255, 0, 255), 2)
				cv2.line(frame, (int(neutral_face_x), int(neutral_face_y)), 
						(face_center_x, face_center_y), (255, 255, 0), 2)
				
				# Thresholds for movement detection
				# Camera is MIRRORED: when you turn LEFT, face appears at RIGHT (positive x_shift)
				# So we REVERSE the action mapping
				LEFT_THRESH = 30    # Positive x_shift = turn LEFT in real life
				RIGHT_THRESH = -30  # Negative x_shift = turn RIGHT in real life
				UP_THRESH = -25     # Negative y_shift = look UP
				DOWN_THRESH = 25    # Positive y_shift = look DOWN
				
				# Detect neck rotation - FIXED REVERSAL
				# When you turn LEFT, face shifts RIGHT (positive), so we check positive for LEFT
				if x_shift > LEFT_THRESH:
					action = "right"  # REVERSED: positive shift = right arrow
					text_color = (255, 100, 0)
				elif x_shift < RIGHT_THRESH:
					action = "left"   # REVERSED: negative shift = left arrow
					text_color = (255, 100, 0)
				elif y_shift < UP_THRESH:
					action = "up"
					text_color = (0, 100, 255)
				elif y_shift > DOWN_THRESH:
					action = "down"
					text_color = (0, 100, 255)
				
				# Display movement info
				cv2.putText(frame, f"X Shift: {int(x_shift)} px", (10, 40), 
						   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
				cv2.putText(frame, f"Y Shift: {int(y_shift)} px", (10, 70), 
						   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
				
				# Draw threshold zones
				cv2.putText(frame, f"Thresholds: Left>{LEFT_THRESH} Right<{RIGHT_THRESH}", (10, 100), 
						   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (150, 150, 150), 1)
		else:
			cv2.putText(frame, "Face not detected!", (10, 40), 
					   cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
			# Reset calibration if face lost
			if neutral_face_x is not None:
				cv2.putText(frame, "Recalibrate if you moved position", (10, 80), 
						   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)
		
		# Trigger Action
		# Single Trigger Logic:
		# 1. If action detected AND it's different from last triggered action -> Press Key
		# 2. If NO action detected (center) -> Reset last triggered action to None
		
		if action:
			if action != last_triggered_action:
				pyautogui.press(action)
				last_triggered_action = action
				curr_action = action
				last_action_time = time.time()
		else:
			# Returned to center/neutral zone
			last_triggered_action = None
		
		# Display Current Action - Large and centered
		if time.time() - last_action_time < 0.6:
			action_text = curr_action.upper()
			font_scale = 3.0
			thickness = 5
			font = cv2.FONT_HERSHEY_SIMPLEX
			
			# Get text size for centering
			(text_w, text_h), _ = cv2.getTextSize(action_text, font, font_scale, thickness)
			text_x = (W - text_w) // 2
			text_y = H // 2
			
			# Draw with background for visibility
			cv2.rectangle(frame, (text_x - 15, text_y - text_h - 15), 
						 (text_x + text_w + 15, text_y + 15), (0, 0, 0), -1)
			cv2.putText(frame, action_text, (text_x, text_y), font, font_scale, text_color, thickness)

		# Encode
		ret, buffer = cv2.imencode('.jpg', frame)
		frame_bytes = buffer.tobytes()
		yield (b'--frame\r\n'
			   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

# Home Page
@app.route('/')
def index():
    return render_template('index.html')

# Video streaming route
@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)