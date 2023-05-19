import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExerciseList from "./ExercistList.js"
import ExerciseForm from "./ExerciseForm.js"
import ExerciseSearch from "./ExerciseSearch.js"

const RoutineShow = (props) => {
    let routineDescription
    let routineDuration
    const { id } = useParams();
    const [routine, setRoutine] = useState([]);

    const getRoutine = async () => {
        try {
            const response = await fetch(`/api/v1/routines/${id}`);
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
            const routineData = await response.json();
            setRoutine(routineData.routine[0]);
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    if (routine.description) {
        routineDescription = <p>{routine.description}</p>
    }
    if (routine.duration) {
        routineDuration = <p>Total Duration: {routine.duration} minutes</p>
    }

    useEffect(() => {
        getRoutine()
    }, [])

    return (
        <div className="grid-container">
            <div className="align-center exercise-contents">
                <h1>Current Workout: {routine.name}</h1>
                <div className="tile">
                    <div className="tile-content">
                    {routineDescription}
                    {routineDuration}
                    </div>
                </div>
                <div className="grid-x">
                    <div className="exercise-list cell medium-6 large-6">
                        <h3>Exercises:</h3>
                        <ExerciseList routine={routine} routineId={id} />
                    </div>
                    <div className="exercise-form cell medium-6 large-6">
                        <ExerciseSearch routine={routine} />
                        <ExerciseForm routine={routine} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoutineShow;
