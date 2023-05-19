import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import ErrorList from "./ErrorList";
import translateServerErrors from "../../services/translateServerErrors.js";

const RoutineTile = ({ routine }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [editForm, setEditForm] = useState(false)
  const [errors, setErrors] = useState([])
  const [currentRoutine, setCurrentRoutine] = useState(routine)
  const [edittedRoutine, setEdittedRoutine] = useState({
    name: routine.name,
    description: routine.description || "",
    duration: routine.duration || "",
    subcategory: routine.subcategory || ""
})

    let descriptionText
    let durationText
    let categoryText
    if (currentRoutine.description) {
        descriptionText = <p>Description: {currentRoutine.description}</p>
    }
    if (currentRoutine.duration) {
        durationText = <p>Duration: {currentRoutine.duration} minutes</p>
    }
    if (currentRoutine.subcategory) {
        categoryText = <p>Category: {currentRoutine.subcategory}</p>
    }

    const formatDate = (string)=> {
        const tIndex = string.indexOf("T")
        return string.slice(0,tIndex)
    }

    const patchEdittedRoutine = async () => {
      try {
          const response = await fetch(`/api/v1/routines/${routine.id}`, {
              method: "PATCH",
              headers: new Headers({
                  "Content-Type": "application/json"
              }),
              body: JSON.stringify( {routine: edittedRoutine} )
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
              setCurrentRoutine(responseBody.routine)
              window.location.reload();
              // setShouldRedirect(true)
          }
      } catch(err) {
          console.error("Error in fetch", err.message)
      }
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
          const responseBody = await response.json()
          alert(`${responseBody.message}`)
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
      setEditForm(true)
    }

    const handleEditFormChange = (event) => {
      setEdittedRoutine({
          ...edittedRoutine,
          [event.currentTarget.name]: event.currentTarget.value
      })
    }

    const handleEditSubmit = (event) => {
      event.preventDefault()
      patchEdittedRoutine()
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
              <label htmlFor="name">
                  Name of Workout:
                  <input
                  className="rounded-corner"
                  type="text"
                  name="name"
                  onChange={handleEditFormChange}
                  value={edittedRoutine.name}
                  />
              </label>

              <label htmlFor="description">
                  Description:
                  <input
                  className="rounded-corner"
                  type="text"
                  name="description"
                  onChange={handleEditFormChange}
                  value={edittedRoutine.description}
                  />
              </label>

              <label htmlFor="duration">
                  Length of Workout:
                  <input
                  className="rounded-corner"
                  type="text"
                  name="duration"
                  onChange={handleEditFormChange}
                  value={edittedRoutine.duration}
                  /> minutes
              </label>

              <label htmlFor="subcategory">
                  Choose a Category:
                  <select
                  className="category-box"
                  id="subcategory"
                  value={edittedRoutine.subcategory}
                  onChange={handleEditFormChange}
                  name="subcategory"
                  >
                  <option value="empty"></option>
                  <option value="Bodyweight Management">Bodyweight Management</option>
                  <option value="Cardiovascular Training">Cardiovascular Training</option>
                  <option value="Circuit Training">Circuit Training</option>
                  <option value="CrossFit">CrossFit</option>
                  <option value="Endurance Training">Endurance Training</option>
                  <option value="Flexibility and Mobility">Flexibility and Mobility</option>
                  <option value="Group Fitness Classes">Group Fitness Classes</option>
                  <option value="High-Intensity Interval Training (HIIT)">High-Intensity Interval Training (HIIT)</option>
                  <option value="Mindfulness and Meditation">Mindfulness and Meditation</option>
                  <option value="Outdoor Workouts">Outdoor Workouts</option>
                  <option value="Rehabilitation or Injury Prevention">Rehabilitation or Injury Prevention</option>
                  <option value="Specialized Training">Specialized Training</option>
                  <option value="Sports Conditioning">Sports Conditioning</option>
                  <option value="Sports-Specific Training">Sports-Specific Training</option>
                  <option value="Strength Training">Strength Training</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Yoga/Pilates">Yoga/Pilates</option>
                  </select>
              </label>

              <div className="button-group">
                  <input className="button" type="submit" value="Submit Changes" />
              </div>
              </form>
            </div>
          ) : (
            <div>
              <h4>
                <Link to={`/workouts/${routine.id}`}>
                  <strong>{currentRoutine.name}</strong>
                </Link>
              </h4>
              {descriptionText}
              {durationText}
              {categoryText}
              <p>Date Created: {formatDate(currentRoutine.createdAt)}</p>
              <div>
                <button className="button delete-button" onClick={deleteWorkoutHandler}>Delete Workout</button>
                <button className="button edit-button" onClick={editWorkoutHandler}>Edit Workout</button>
              </div>
            </div>
          )}
        </div>
  );
};

export default RoutineTile;
