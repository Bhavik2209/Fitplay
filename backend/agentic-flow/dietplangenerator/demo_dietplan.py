import streamlit as st
import time
from typing import List

# Import from your langgraph file (assuming it's named 'diet_plan_agent.py')
# Change the import name to match your actual file name
from dietlanggraph import workflow, DietPlanGenerationSchema

# Page configuration
st.set_page_config(
    page_title="AI Diet Plan Generator",
    page_icon="🥗",
    layout="wide"
)

# Custom CSS
st.markdown("""
    <style>
    .main-header {
        font-size: 3rem;
        color: #2E7D32;
        text-align: center;
        margin-bottom: 2rem;
    }
    .status-box {
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0;
    }
    .status-generating {
        # background-color: #FFF3E0;
        border-left: 4px solid #FF9800;
    }
    .status-evaluating {
        # background-color: #E3F2FD;
        border-left: 4px solid #2196F3;
    }
    .status-optimizing {
        # background-color: #F3E5F5;
        border-left: 4px solid #9C27B0;
    }
    .status-approved {
        # background-color: #E8F5E9;
        border-left: 4px solid #4CAF50;
    }
    </style>
""", unsafe_allow_html=True)

# Header
st.markdown('<h1 class="main-header">🥗 AI-Powered Diet Plan Generator</h1>', unsafe_allow_html=True)
st.markdown("### Personalized nutrition planning with AI agents")

# Initialize session state
if 'generated' not in st.session_state:
    st.session_state.generated = False
if 'result' not in st.session_state:
    st.session_state.result = None

# Sidebar for inputs
with st.sidebar:
    st.header("📋 Your Profile")
    
    # Quick Demo Button
    use_demo = st.checkbox("🚀 Use Demo Profile (Quick Start)", value=True)
    
    if use_demo:
        age = 28
        gender = "male"
        height_cm = 175.0
        weight_kg = 75.0
        activity_level = "moderate"
        goal = "muscle_gain"
        diet_type = "vegetarian"
        allergies = ["peanuts"]
        food_avoid = ["mushrooms"]
        health_conditions = []
        region = "India"
        workout_type = "strength"
        plan_duration_days = 7
        max_iteration = 3
        
        st.info("**Demo Profile Loaded:**\n- 28 year old male\n- Goal: Muscle Gain\n- Vegetarian diet\n- Strength training")
    else:
        st.subheader("Basic Info")
        age = st.number_input("Age", min_value=10, max_value=100, value=28)
        gender = st.selectbox("Gender", ["male", "female", "other"])
        height_cm = st.number_input("Height (cm)", min_value=100.0, max_value=250.0, value=175.0, step=0.5)
        weight_kg = st.number_input("Weight (kg)", min_value=30.0, max_value=200.0, value=75.0, step=0.5)
        
        st.subheader("Lifestyle")
        activity_level = st.selectbox("Activity Level", ["sedentary", "light", "moderate", "active"])
        goal = st.selectbox("Goal", ["weight_loss", "weight_gain", "maintenance", "muscle_gain"])
        workout_type = st.selectbox("Workout Type", ["none", "cardio", "strength", "mixed"])
        
        st.subheader("Diet Preferences")
        diet_type = st.selectbox("Diet Type", ["vegetarian", "vegan", "eggetarian", "non_vegetarian"])
        
        allergies_input = st.text_input("Allergies (comma-separated)", "peanuts")
        allergies = [a.strip() for a in allergies_input.split(",")] if allergies_input else []
        
        food_avoid_input = st.text_input("Foods to Avoid (comma-separated)", "")
        food_avoid = [f.strip() for f in food_avoid_input.split(",")] if food_avoid_input else []
        
        health_conditions = st.multiselect(
            "Health Conditions", 
            ["diabetes", "thyroid", "pcos", "hypertension"],
            default=[]
        )
        
        st.subheader("Location & Plan")
        region = st.text_input("Region", "India")
        plan_duration_days = st.selectbox("Plan Duration (days)", [1, 7, 30], index=1)
        max_iteration = st.slider("Max Optimization Iterations", 1, 5, 3)

# Main content area
col1, col2 = st.columns([2, 1])

with col1:
    st.markdown("### 🎯 Profile Summary")
    summary_cols = st.columns(3)
    with summary_cols[0]:
        st.metric("Age", f"{age} years")
        st.metric("Goal", goal.replace("_", " ").title())
    with summary_cols[1]:
        st.metric("Height", f"{height_cm} cm")
        st.metric("Diet Type", diet_type.title())
    with summary_cols[2]:
        st.metric("Weight", f"{weight_kg} kg")
        st.metric("Activity", activity_level.title())

with col2:
    st.markdown("### ⚙️ Plan Settings")
    st.info(f"""
    **Duration:** {plan_duration_days} days  
    **Max Iterations:** {max_iteration}  
    **Workout:** {workout_type.title()}
    """)

# Generate button
st.markdown("---")
if st.button("🚀 Generate My Diet Plan", type="primary", use_container_width=True):
    st.session_state.generated = False
    st.session_state.result = None
    
    # Create progress tracking
    progress_container = st.container()
    status_placeholder = st.empty()
    progress_bar = st.progress(0)
    
    # Initialize state
    initial_state = {
        "age": age,
        "gender": gender,
        "height_cm": height_cm,
        "weight_kg": weight_kg,
        "activity_level": activity_level,
        "goal": goal,
        "diet_type": diet_type,
        "allergies": allergies,
        "food_avoid": food_avoid,
        "health_conditions": health_conditions,
        "region": region,
        "workout_type": workout_type,
        "plan_duration_days": plan_duration_days,
        "diet_plan": "",
        "feedback": None,
        "evaluation_decision": "not_approved",
        "iteration": 0,
        "max_iteration": max_iteration,
        "feedback_list": [],
        "plan_history": []
    }
    
    # Track progress
    progress_steps = []
    accumulated_state = initial_state.copy()
    
    # Run the workflow with streaming
    try:
        step_count = 0
        total_steps = (max_iteration * 2) + 2  # Rough estimate
        
        for event in workflow.stream(initial_state):
            step_count += 1
            progress = min(step_count / total_steps, 0.95)
            progress_bar.progress(progress)
            
            # Display current step and accumulate state
            for node_name, node_output in event.items():
                # Merge the updates into accumulated state
                accumulated_state.update(node_output)
                
                if node_name == "generate_diet_plan":
                    status_placeholder.markdown(
                        '<div class="status-box status-generating">🔄 <b>Generating initial diet plan...</b></div>',
                        unsafe_allow_html=True
                    )
                    progress_steps.append("✅ Initial diet plan generated")
                    time.sleep(0.5)
                    
                elif node_name == "evaluator_node":
                    iteration = accumulated_state.get("iteration", 0)
                    status_placeholder.markdown(
                        f'<div class="status-box status-evaluating">🔍 <b>Evaluating diet plan (Iteration {iteration})...</b></div>',
                        unsafe_allow_html=True
                    )
                    
                    decision = node_output.get("evaluation_decision", "")
                    if decision == "approved":
                        progress_steps.append(f"✅ Plan approved!")
                    else:
                        feedback = node_output.get("feedback", "No feedback")
                        progress_steps.append(f"⚠️ Iteration {iteration}: {feedback[:100] if feedback else 'No feedback'}...")
                    time.sleep(0.5)
                    
                elif node_name == "optimizer_node":
                    iteration = accumulated_state.get("iteration", 0)
                    status_placeholder.markdown(
                        f'<div class="status-box status-optimizing">⚡ <b>Optimizing diet plan (Iteration {iteration})...</b></div>',
                        unsafe_allow_html=True
                    )
                    progress_steps.append(f"🔧 Optimization iteration {iteration} completed")
                    time.sleep(0.5)
        
        # Complete
        progress_bar.progress(1.0)
        status_placeholder.markdown(
            '<div class="status-box status-approved">✅ <b>Diet plan generation complete!</b></div>',
            unsafe_allow_html=True
        )
        
        st.session_state.generated = True
        st.session_state.result = accumulated_state
        
        # Show progress log
        with st.expander("📊 View Generation Progress Log"):
            for step in progress_steps:
                st.markdown(f"- {step}")
        
    except Exception as e:
        st.error(f"❌ Error generating diet plan: {str(e)}")
        st.exception(e)

# Display results
if st.session_state.generated and st.session_state.result:
    st.markdown("---")
    st.markdown("## 📄 Your Personalized Diet Plan")
    
    # Get the final state directly
    final_output = st.session_state.result
    
    # Debug: Show what we got
    with st.expander("🔍 Debug: View Raw Output"):
        st.json(final_output)
    
    # Tabs for different views
    tab1, tab2, tab3 = st.tabs(["📋 Final Plan", "📝 Feedback History", "📊 Plan History"])
    
    with tab1:
        st.markdown("### ✨ Your Optimized Diet Plan")
        diet_plan = final_output.get("diet_plan", "No plan generated")
        st.markdown(diet_plan)
        
        # Download button
        if diet_plan and diet_plan != "No plan generated":
            st.download_button(
                label="📥 Download Diet Plan",
                data=diet_plan,
                file_name=f"diet_plan_{age}y_{goal}.txt",
                mime="text/plain"
            )
    
    with tab2:
        st.markdown("### 💬 Evaluation Feedback History")
        feedback_list = final_output.get("feedback_list", [])
        
        if feedback_list:
            for i, feedback in enumerate(feedback_list, 1):
                if feedback:
                    st.info(f"**Iteration {i}:** {feedback}")
        else:
            st.success("Plan was approved on first try! 🎉")
    
    with tab3:
        st.markdown("### 📚 All Generated Plans")
        plan_history = final_output.get("plan_history", [])
        
        if len(plan_history) > 1:
            for i, plan in enumerate(plan_history, 1):
                with st.expander(f"Version {i} {'(Final)' if i == len(plan_history) else ''}"):
                    st.markdown(plan)
        elif len(plan_history) == 1:
            st.info("Only one plan version was generated.")
            st.markdown(plan_history[0])
        else:
            st.warning("No plan history found.")
    
    # Stats
    st.markdown("---")
    stats_cols = st.columns(4)
    with stats_cols[0]:
        st.metric("Total Iterations", final_output.get("iteration", 0))
    with stats_cols[1]:
        st.metric("Plan Status", "✅ Approved" if final_output.get("evaluation_decision") == "approved" else "⚠️ Max Iterations")
    with stats_cols[2]:
        st.metric("Plan Versions", len(final_output.get("plan_history", [])))
    with stats_cols[3]:
        st.metric("Feedback Count", len([f for f in final_output.get("feedback_list", []) if f]))

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #666;'>
    <p>🤖 Powered by LangGraph & Groq AI | 🥗 For educational purposes only - consult a real nutritionist for medical advice</p>
</div>
""", unsafe_allow_html=True)