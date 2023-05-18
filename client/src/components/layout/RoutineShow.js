import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExerciseList from "./ExercistList.js"

const RoutineShow = (props) => {
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

    useEffect(() => {
        getRoutine()
    }, [])

    return (
        <div className="tile-container">
            <h1>Current Workout: {routine.name}</h1>
            <div className="tile">
                <div className="tile-content">
                    <p>{routine.description}</p>
                    <p>Total Duration: {routine.duration} minutes</p>
                </div>
            </div>
            <ExerciseList routine={routine} routineId={id} />
        </div>
    );
};

export default RoutineShow;
