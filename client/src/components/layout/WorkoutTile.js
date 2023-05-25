import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import ErrorList from "./ErrorList";
import translateServerErrors from "../../services/translateServerErrors.js";

const WorkoutTile = ({ workout }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [editForm, setEditForm] = useState(false)
  const [errors, setErrors] = useState([])
  const [currentWorkout, setCurrentWorkout] = useState(workout)
  const [edittedWorkout, setEdittedWorkout] = useState({
    name: workout.name,
    duration: workout.duration || "",
    subcategory: workout.subcategory || "",
    notes: workout.notes || "",
    effortLevel: workout.effortLevel || "",
    workoutDate: workout.workoutDate || ""
})

    const patchEdittedWorkout = async () => {
      try {
          const response = await fetch(`/api/v1/workouts/${workout.id}`, {
              method: "PATCH",
              headers: new Headers({
                  "Content-Type": "application/json"
              }),
              body: JSON.stringify( {workout: edittedWorkout} )
          })
          if (!response.ok) {
              if (response.status === 422) {
                  const errorBody = await response.json()
                  const newErrors = translateServerErrors(errorBody.errors)
                  return setErrors(newErrors)
              } else {
                  const errorMessage = await response.json()
                  throw new Error(errorMessage)
              }
          } else {
              const responseBody = await response.json()
              setCurrentWorkout(responseBody.workout)
              window.location.reload();
              // setShouldRedirect(true)
          }
      } catch(err) {
          console.error("Error in fetch", err.message)
      }
  }

    const deleteWorkout = async () => {
      try {
          const response = await fetch(`/api/v1/workouts/${workout.id}`,
              { method: "DELETE" })
          if (!response.ok) {
              const errorMessage = `${response.status} (${response.statusText})`
              const error = new Error(errorMessage)
              throw error
          }
          const responseBody = await response.json()
          alert(`${responseBody.message}`)
          window.location.reload();
          // setShouldRedirect(true)
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
      setEditForm(true)
    }

    const handleEditFormChange = (event) => {
      setEdittedWorkout({
          ...edittedWorkout,
          [event.currentTarget.name]: event.currentTarget.value
      })
    }

    const handleEditSubmit = (event) => {
      event.preventDefault()
      patchEdittedWorkout()
    }

    if (shouldRedirect) {
      return <Redirect push to={`/workouts`} />
  }
    
  return (
        <div className="callout border rounded-corner">
          {editForm ? (
            <div>
              <ErrorList errors={errors} />
              <form onSubmit={handleEditSubmit}>
              <label htmlFor="workoutDate">
                Date of Workout:
                <input
                className="rounded-corner"
                id="workoutDate"
                type="date"
                name="workoutDate"
                onChange={handleEditFormChange}
                value={edittedWorkout.workoutDate}
                required
                />
              </label>

              <label htmlFor="name">
                  Name of Workout:
                  <input
                  className="rounded-corner"
                  type="text"
                  name="name"
                  onChange={handleEditFormChange}
                  value={edittedWorkout.name}
                  />
              </label>

              <label htmlFor="duration">
                  Length of Workout:
                  <input
                  className="rounded-corner"
                  type="text"
                  name="duration"
                  onChange={handleEditFormChange}
                  value={edittedWorkout.duration}
                  /> minutes
              </label>

              <label htmlFor="subcategory">
                  Choose a Category:
                  <select
                  className="category-box"
                  id="subcategory"
                  value={edittedWorkout.subcategory}
                  onChange={handleEditFormChange}
                  name="subcategory"
                  >
                  <option value="empty"></option>
                  <option value="Cardio Training">Cardio Training</option>
                  <option value="Sports Training">Sports Training</option>
                  <option value="Flexibility Training">Flexibility Training</option>
                  <option value="Weight/Resistance Training">Weight/Resistance Training</option>
                  </select>
              </label>

              <label htmlFor="effortLevel">
                Intensity level from 1 to 10:
                <select
                className="category-box"
                id="effortLevel"
                value={edittedWorkout.effortLevel}
                onChange={handleEditFormChange}
                name="effortLevel"
                >
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </label>

            <label htmlFor="notes">
                Notes:
                <input
                className="rounded-corner"
                type="text"
                name="notes"
                onChange={handleEditFormChange}
                value={edittedWorkout.notes}
                />
            </label>

              <div className="button-group">
                  <input className="button" type="submit" value="Submit Changes" />
              </div>
              </form>
            </div>
          ) : (
            <div>
              <h4>
                <Link to={`/workouts/${workout.id}`}>
                  <strong>{currentWorkout.name}</strong>
                </Link>
              </h4>
              {currentWorkout.duration && <p>Duration : {currentWorkout.duration}</p>}
              {currentWorkout.subcategory && <p>Category: {currentWorkout.subcategory}</p>}
              {currentWorkout.effortLevel && <p>Level of Intensity: {currentWorkout.effortLevel}</p>}
              {currentWorkout.notes && <p>Notes: {currentWorkout.notes}</p>}
              <div>
                <button className="button delete-button" onClick={deleteWorkoutHandler}>Delete Workout</button>
                <button className="button edit-button" onClick={editWorkoutHandler}>Edit Workout</button>
              </div>
            </div>
          )}
        </div>
  );
};

export default WorkoutTile;
