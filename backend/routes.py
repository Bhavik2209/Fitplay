from flask import jsonify, render_template, send_from_directory, Blueprint
import os

# Import game-specific apps
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), 'games', 'subway_surfers'))

def register_routes(app):
    
    @app.route('/')
    def home():
        return render_template('index.html')
    
    @app.route('/api/health')
    def health_check():
        return jsonify({'status': 'healthy'})
    
    # Neck Exercise - Subway Surfers
    @app.route('/exercise/neck')
    def neck_exercise():
        # Serve the subway surfers game
        return render_template('neck_exercise.html')
        
    @app.route('/exercise/hill-climbing')
    def hill_climbing():
        return render_template('hill_climbing.html')
        
    @app.route('/exercise/hill-climbing/video_feed')
    def hill_climbing_feed():
        from games.hill_climbing.app import gen_frames
        from flask import Response
        return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
    
    # Video feed for Subway Surfers
    @app.route('/exercise/neck/video_feed')
    def neck_video_feed():
        from games.subway_surfers.app import gen_frames
        from flask import Response
        return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
    
    # Jumping Exercise - Temple Run
    @app.route('/exercise/jumping')
    def jumping_exercise():
        # Temple Run uses CV2 directly, will need to create a web interface
        return render_template('coming_soon.html', exercise='Jumping Exercise', game='Temple Run')
    
    # Boxing Exercise - Coming Soon
    @app.route('/exercise/boxing')
    def boxing_exercise():
        return render_template('coming_soon.html', exercise='Boxing Exercise', game='TBD')
    
    # Add more routes here as needed
