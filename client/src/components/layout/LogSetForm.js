import React, { useState } from "react";
import translateServerErrors from "../../services/translateServerErrors.js";
import ErrorList from "./ErrorList.js";

const LogSetForm = (props) => {
  const [newSet, setNewSet] = useState({
    weight: "",
    repetitions: "",
    workoutSets: "",
    miles: "",
    calories: "",
    score: ""
  });
  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const postSet = async (newSetData) => {
    try {
      const response = await fetch(`/api/v1/workouts/${props.workoutId}/exercises/${props.exerciseId}/sets`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newSetData),
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
    setNewSet({
      ...newSet,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postSet(newSet);
    clearForm();
  };

  const clearForm = () => {
    setNewSet({
        weight: "",
        repetitions: "",
        workoutSets: "",
        miles: "",
        calories: "",
        score: ""
    });
  };

  if (shouldRedirect) {
    location.href = `/workouts/${props.workoutId}/exercises/${props.exerciseId}`
}

  return (
    <div className="callout create-review rounded-corner">
      <h4>Log manually</h4>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="weight">
          Weight:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="weight"
            onChange={handleInputChange}
            value={newSet.weight}
          />
        </label>

        <label htmlFor="repetitions">
          Repetitions:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="repetitions"
            onChange={handleInputChange}
            value={newSet.repetitions}
          />
        </label>

        <label htmlFor="workoutSets">
          Number of sets:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="workoutSets"
            onChange={handleInputChange}
            value={newSet.workoutSets}
          />
        </label>

        <label htmlFor="miles">
          Distance covered:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="miles"
            onChange={handleInputChange}
            value={newSet.miles}
          />
        </label>

        <label htmlFor="calories">
          Calories burned (in kcal):
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="calories"
            onChange={handleInputChange}
            value={newSet.calories}
          />
        </label>

        <label htmlFor="score">
          Score/Result:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="score"
            onChange={handleInputChange}
            value={newSet.score}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default LogSetForm;
