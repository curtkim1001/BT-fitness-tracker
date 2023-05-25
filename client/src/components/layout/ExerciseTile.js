import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import ErrorList from "./ErrorList";
import translateServerErrors from "../../services/translateServerErrors.js";

const ExerciseTile = ({exercise, workout}) => {
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [errors, setErrors] = useState([])
    const [currentExercise, setCurrentExercise] = useState(exercise)
    const [edittedExercise, setEdittedExercise] = useState({
        name: exercise.name,
        description: exercise.description || "",
        muscleGroup: exercise.muscleGroup || "",
        bodyFunction: exercise.bodyFunction || "",
        instructions: exercise.instructions || "",
        videoUrl: exercise.videoUrl || "",
        equipment: exercise.equipment || "",
        notes: exercise.notes || ""
    })

    const formatDate = (string)=> {
        const tIndex = string.indexOf("T")
        return string.slice(0,tIndex)
    }

    const patchEdittedExercise = async () => {
        try {
            const response = await fetch(`/api/v1/workouts/${workout.id}/exercises/${exercise.id}`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {exercise: edittedExercise} )
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
                setCurrentExercise(responseBody.exercise)
                window.location.reload();
                // setShouldRedirect(true)
            }
        } catch(err) {
            console.error("Error in fetch", err.message)
        }
    }

    const deleteExercise = async () => {
        try {
            const response = await fetch(`/api/v1/workouts/${workout.id}/exercises/${exercise.id}`,
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
  
      const deleteExerciseHandler = (event) => {
        event.preventDefault()
        let confirmationDeleteMessage = window.confirm("Delete this workout?")
        if (confirmationDeleteMessage) {
            deleteExercise()
        }
      }

      const editExerciseHandler = (event) => {
        event.preventDefault()
        setEditForm(true)
      }

      const handleEditFormChange = (event) => {
        setEdittedExercise({
            ...edittedExercise,
            [event.currentTarget.name]: event.currentTarget.value
        })
      }

      const handleEditSubmit = (event) => {
        event.preventDefault()
        patchEdittedExercise()
      }

      if (shouldRedirect) {
        return <Redirect push to={`/workouts/${workout.id}`} />
    }

    return (
        <div className="callout rounded-corner">
            {editForm ? (
                <div>
                    <ErrorList errors={errors} />
                    <form onSubmit={handleEditSubmit}>
                        <label htmlFor="name">
                        Name:
                        <input
                            className="review-text-box rounded-corner"
                            type="text"
                            name="name"
                            onChange={handleEditFormChange}
                            value={edittedExercise.name}
                        />
                        </label>
                        <label htmlFor="description">
                        Description:
                        <input
                            className="review-text-box rounded-corner"
                            type="text"
                            name="description"
                            onChange={handleEditFormChange}
                            value={edittedExercise.description}
                        />
                        </label>
                        <label htmlFor="muscleGroup">
                        Target Muscles:
                        <input
                            className="review-text-box rounded-corner"
                            type="text"
                            name="muscleGroup"
                            onChange={handleEditFormChange}
                            value={edittedExercise.muscleGroup}
                        />
                        </label>
                        <label htmlFor="bodyFunction">
                        Body Function:
                        <input
                            className="review-text-box rounded-corner"
                            type="text"
                            name="bodyFunction"
                            onChange={handleEditFormChange}
                            value={edittedExercise.bodyFunction}
                        />
                        </label>
                        <label htmlFor="instructions">
                        Instructions:
                        <input
                            className="review-text-box rounded-corner"
                            type="text"
                            name="instructions"
                            onChange={handleEditFormChange}
                            value={edittedExercise.instructions}
                        />
                        </label>
                        <label htmlFor="videoUrl">
                        Helpful Video Links:
                        <input
                            className="review-text-box rounded-corner"
                            type="text"
                            name="videoUrl"
                            onChange={handleEditFormChange}
                            value={edittedExercise.videoUrl}
                        />
                        </label>
                        <label htmlFor="equipment">
                        Necessary Equipment:
                        <input
                            className="review-text-box rounded-corner"
                            type="text"
                            name="equipment"
                            onChange={handleEditFormChange}
                            value={edittedExercise.equipment}
                        />
                        </label>
                        <label htmlFor="notes">
                        Notes:
                        <input
                            className="review-text-box rounded-corner"
                            type="text"
                            name="notes"
                            onChange={handleEditFormChange}
                            value={edittedExercise.notes}
                        />
                        </label>

                        <div className="button-group">
                        <input className="button" type="submit" value="Submit Changes" />
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <h3>
                        <Link to={`/workouts/${workout.id}/exercises/${exercise.id}`}>
                            <strong>{currentExercise.name}</strong>
                        </Link>
                    </h3>
                    {currentExercise.description && <p>Description: {currentExercise.description}</p>}
                    {currentExercise.muscleGroup && <p>Muscle Groups Used: {currentExercise.muscleGroup}</p>}
                    {currentExercise.bodyFunction && <p>Body Function: {currentExercise.bodyFunction}</p>}
                    {currentExercise.instructions && <p>Instructions: {currentExercise.instructions}</p>}
                    {currentExercise.equipment && <p>Equipment Needed: {currentExercise.equipment}</p>}
                    {currentExercise.notes && <p>Notes: {currentExercise.notes}</p>}
                <div>
                    <button className="button delete-button" onClick={deleteExerciseHandler}>Delete Exercise</button>
                    <button className="button edit-button" onClick={editExerciseHandler}>Edit Exercise</button>
                </div>
            </div>
            )}

        </div>
    );
}

export default ExerciseTile;
