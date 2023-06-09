import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors.js";
import ErrorList from "./ErrorList.js";

const ExerciseForm = (props) => {
  const [newExercise, setNewExercise] = useState({
    name: "",
    description: "",
    muscleGroup: "",
    bodyFunction: "",
    instructions: "",
    videoUrl: "",
    equipment: "",
    notes: ""
  });
  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const postExercise = async (newExerciseData) => {
    try {
      const response = await fetch(`/api/v1/workouts/${props.workout.id}/exercises`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newExerciseData),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json();
          const newErrors = translateServerErrors(errorBody.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const responseBody = await response.json();
        setErrors([]);
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  
  const handleInputChange = (event) => {
    setNewExercise({
      ...newExercise,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postExercise(newExercise);
    clearForm();
  };

  const clearForm = () => {
    setNewExercise({
      name: "",
      description: "",
      muscleGroup: "",
      bodyFunction: "",
      instructions: "",
      videoUrl: "",
      equipment: "",
      notes: ""
    });
  };

  if (shouldRedirect) {
    location.href=`/workouts/${props.workout.id}`
}

  return (
    <div className="callout create-review rounded-corner">
      <h4>Add a New Exercise</h4>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={newExercise.name}
          />
        </label>
        <label htmlFor="description">
          Description:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="description"
            onChange={handleInputChange}
            value={newExercise.description}
          />
        </label>
        <label htmlFor="muscleGroup">
          Target Muscles:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="muscleGroup"
            onChange={handleInputChange}
            value={newExercise.muscleGroup}
          />
        </label>
        <label htmlFor="bodyFunction">
          Body Function:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="bodyFunction"
            onChange={handleInputChange}
            value={newExercise.bodyFunction}
          />
        </label>
        <label htmlFor="instructions">
          Instructions:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="instructions"
            onChange={handleInputChange}
            value={newExercise.instructions}
          />
        </label>
        <label htmlFor="videoUrl">
          Helpful Video Links:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="videoUrl"
            onChange={handleInputChange}
            value={newExercise.videoUrl}
          />
        </label>
        <label htmlFor="equipment">
          Necessary Equipment:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="equipment"
            onChange={handleInputChange}
            value={newExercise.equipment}
          />
        </label>
        <label htmlFor="notes">
          Notes:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="notes"
            onChange={handleInputChange}
            value={newExercise.notes}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default ExerciseForm;
