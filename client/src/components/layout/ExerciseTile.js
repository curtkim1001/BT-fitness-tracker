import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const ExerciseTile = ({exercise, routine}) => {
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const formatDate = (string)=> {
        const tIndex = string.indexOf("T")
        return string.slice(0,tIndex)
    }

    const deleteExercise = async () => {
        try {
            const response = await fetch(`/api/v1/routines/${routine.id}/exercises/${exercise.id}`,
                { method: "DELETE" })
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            setShouldRedirect(true)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }
  
      const deleteExerciseHandler = (event) => {
        event.preventDefault()
        let confirmationDeleteMessage = window.confirm("Delete this workout?")
        if (confirmationDeleteMessage) {
            deleteExercise()
        }
      }

      const editExerciseHandler = (event) => {
        event.preventDefault()
      }

      if (shouldRedirect) {
        return <Redirect push to={`/workouts/${routine.id}`} />
    }

    return (
        <div className="callout rounded-corner">
            <h3>{exercise.name}</h3>
            <p>Description: {exercise.description}</p>
            <p>Muscle Groups: {exercise.muscleGroup}</p>
            <p>Body Function: {exercise.bodyFunction}</p>
            <p>Start Date: {formatDate(exercise.createdAt)}</p>
            <div>
              <button className="button" onClick={deleteExerciseHandler}>Delete Exercise</button>
              <button className="button" onClick={editExerciseHandler}>Edit Exercise</button>
            </div>
        </div>
    );
}

export default ExerciseTile;
