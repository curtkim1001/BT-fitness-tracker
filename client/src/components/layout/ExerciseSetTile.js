import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import ErrorList from "./ErrorList";

const ExerciseSetTile = ({ set, workoutId, exerciseId }) => {

    const [shouldRedirect, setShouldRedirect] = useState(false)

    const formatDate = (string)=> {
        const options = { year:"numeric", month:"long", day:"numeric", hour:"numeric", minute:"numeric" }
        const formatCreatedAt = new Date(string).toLocaleString(undefined, options)
        return formatCreatedAt
    }

    const deleteSet = async () => {
        try {
            const response = await fetch(`/api/v1/sets/${set.id}`,
                { method: "DELETE" })
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const responseBody = await response.json()
            alert(`${responseBody.message}`)
            setShouldRedirect(true)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }
  
      const deleteSetHandler = (event) => {
        event.preventDefault()
        deleteSet()
      }

      if (shouldRedirect) {
        return <Redirect push to={`/workouts/${workoutId}/exercises/${exerciseId}`} />
    }
    
  return (
        <div className="callout border rounded-corner">
          {set.weight && <p>Weight: {set.weight}</p>}
          {set.repetitions && <p>{set.repetitions} reps</p>}
          {set.workoutSets && <p>Sets: {set.workoutSets}</p>}
          {set.miles && <p>Distance: {set.miles} miles</p>}
          {set.calories && <p>Calories burned (kcal): {set.calories}</p>}
          {set.score && <p>Score: {set.score}</p>}
          <div>
                <button className="button delete-button" onClick={deleteSetHandler}>Delete</button>
            </div>
        </div>
  );
};

export default ExerciseSetTile;
