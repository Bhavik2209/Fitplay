from flask import jsonify, render_template, send_from_directory, Blueprint, request, Response
import os
import sys

# Import game-specific apps
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
        return render_template('neck_exercise.html')
        
    @app.route('/exercise/hill-climbing')
    def hill_climbing():
        return render_template('hill_climbing.html')
        
    @app.route('/exercise/hill-climbing/video_feed')
    def hill_climbing_feed():
        from games.hill_climbing.app import gen_frames
        return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
    
    # Video feed for Subway Surfers
    @app.route('/exercise/neck/video_feed')
    def neck_video_feed():
        from games.subway_surfers.app import gen_frames
        return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
    
    # Jumping Exercise - Temple Run
    @app.route('/exercise/jumping')
    def jumping_exercise():
        return render_template('coming_soon.html', exercise='Jumping Exercise', game='Temple Run')
    
    # Boxing Exercise - Coming Soon
    @app.route('/exercise/boxing')
    def boxing_exercise():
        return render_template('coming_soon.html', exercise='Boxing Exercise', game='TBD')
    
    # Diet Planner
    @app.route('/diet-planner')
    def diet_planner():
        return render_template('diet_planner.html')
    
    @app.route('/api/diet-plan/generate', methods=['POST'])
    def generate_diet_plan():
        try:
            # Import diet planner workflow
            sys.path.append(os.path.join(os.path.dirname(__file__), 'agentic-flow', 'dietplangenerator'))
            from dietlanggraph import workflow, DietPlanGenerationSchema
            
            data = request.get_json()
            
            # Validate required fields
            required_fields = ['age', 'gender', 'height_cm', 'weight_kg', 'activity_level', 'goal', 'diet_type']
            for field in required_fields:
                if field not in data:
                    return jsonify({'error': f'Missing required field: {field}'}), 400
            
            # Prepare initial state
            initial_state = {
                "age": data['age'],
                "gender": data['gender'],
                "height_cm": data['height_cm'],
                "weight_kg": data['weight_kg'],
                "activity_level": data['activity_level'],
                "goal": data['goal'],
                "diet_type": data['diet_type'],
                "allergies": data.get('allergies', []),
                "food_avoid": data.get('food_avoid', []),
                "health_conditions": data.get('health_conditions', []),
                "region": data.get('region', 'India'),
                "workout_type": data.get('workout_type', 'none'),
                "plan_duration_days": data.get('plan_duration_days', 7),
                "diet_plan": "",
                "feedback": None,
                "evaluation_decision": "not_approved",
                "iteration": 0,
                "max_iteration": data.get('max_iteration', 3),
                "feedback_list": [],
                "plan_history": []
            }
            
            # Run the workflow
            accumulated_state = initial_state.copy()
            
            for event in workflow.stream(initial_state):
                for node_name, node_output in event.items():
                    accumulated_state.update(node_output)
            
            # Return the final result
            return jsonify({
                'success': True,
                'diet_plan': accumulated_state.get('diet_plan', ''),
                'feedback_list': accumulated_state.get('feedback_list', []),
                'plan_history': accumulated_state.get('plan_history', []),
                'iteration': accumulated_state.get('iteration', 0),
                'evaluation_decision': accumulated_state.get('evaluation_decision', 'not_approved'),
                'age': accumulated_state.get('age'),
                'goal': accumulated_state.get('goal')
            })
            
        except ImportError as e:
            return jsonify({'success': False, 'error': f'Failed to import diet planner module: {str(e)}'}), 500
        except Exception as e:
            return jsonify({'success': False, 'error': f'Error generating diet plan: {str(e)}'}), 500
    
    # Add more routes here as needed