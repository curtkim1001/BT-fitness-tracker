import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExerciseList from "./ExerciseList.js"
import ExerciseForm from "./ExerciseForm.js"
import ExerciseSearch from "./ExerciseSearch.js"

const WorkoutShow = (props) => {
    const { id } = useParams();
    const [workout, setWorkout] = useState([]);

    const getWorkout = async () => {
        try {
            const response = await fetch(`/api/v1/workouts/${id}`);
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
            const workoutData = await response.json();
            setWorkout(workoutData.workout[0]);
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    useEffect(() => {
        getWorkout()
    }, [])
    
    return (
        <div className="grid-container">
            <div className="align-center exercise-contents">
                <h1>Current Workout: {workout.name}</h1>
                <div className="tile">
                    <div className="tile-content">
                        <p>Date of Workout: {workout.workoutDate}</p>
                        {workout.duration && <p>Duration : {workout.duration}</p>}
                        {workout.subcategory && <p>Category: {workout.subcategory}</p>}
                        {workout.effortLevel && <p>Level of Intensity: {workout.effortLevel}</p>}
                        {workout.notes && <p>Notes: {workout.notes}</p>}
                    </div>
                </div>
                <div className="grid-x">
                    <div className="exercise-list cell medium-6 large-6">
                        <h3>Exercises:</h3>
                        <ExerciseList workout={workout} workoutId={id} />
                    </div>
                    <div className="exercise-form cell medium-6 large-6">
                        <ExerciseSearch workout={workout} />
                        <ExerciseForm workout={workout} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutShow;
