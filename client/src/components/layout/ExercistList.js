import React, { useState, useEffect } from "react";
import ExerciseTile from "./ExerciseTile.js"

const ExercistList = (props) => {
    const [exercises, setExercises] = useState([])

    const getExercises = async () => {
        try {
            const response = await fetch(`/api/v1/routines/${props.routineId}/exercises`);
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
            const exercisesData = await response.json();
            setExercises(exercisesData.exercises);
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    useEffect(() => {
        getExercises()
    }, [])

    const allExercisesArray = exercises.map(exercise => {
        return (
            <ExerciseTile key={exercise.id} exercise={exercise} routine={props.routine}/>
        )
    })

    return (
    <>{allExercisesArray}</>
    )
};

export default ExercistList;
