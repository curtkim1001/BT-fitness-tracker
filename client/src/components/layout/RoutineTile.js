import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

const RoutineTile = ({ routine }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
    let descriptionText
    let durationText
    let categoryText
    if (routine.description) {
        descriptionText = <p>Description: {routine.description}</p>
    }
    if (routine.duration) {
        durationText = <p>Duration: {routine.duration} minutes</p>
    }
    if (routine.subcategory) {
        categoryText = <p>Category: {routine.subcategory}</p>
    }

    const formatDate = (string)=> {
        const tIndex = string.indexOf("T")
        return string.slice(0,tIndex)
    }

    const deleteWorkout = async () => {
      try {
          const response = await fetch(`/api/v1/routines/${routine.id}`,
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

    const deleteWorkoutHandler = (event) => {
      event.preventDefault()
      let confirmationDeleteMessage = window.confirm("Delete this workout?")
      if (confirmationDeleteMessage) {
        deleteWorkout()
      }
    }

    const editWorkoutHandler = (event) => {
      event.preventDefault()
    }

    if (shouldRedirect) {
      return <Redirect push to={`/workouts`} />
  }
    
  return (
        <div className="callout border rounded-corner">
            <h4>
            <Link to={`/workouts/${routine.id}`}>
              <strong>{routine.name}</strong>
            </Link>
            </h4>
            {descriptionText}
            {durationText}
            {categoryText}
            <p>Date Created: {formatDate(routine.createdAt)}</p>
            <div>
              <button className="button" onClick={deleteWorkoutHandler}>Delete Workout</button>
              <button className="button" onClick={editWorkoutHandler}>Edit Workout</button>
            </div>
        </div>
  );
};

export default RoutineTile;
