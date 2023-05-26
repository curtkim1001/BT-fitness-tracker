import React, { useEffect, useState } from "react";
import WorkoutTile from "./WorkoutTile.js"
import { Link } from "react-router-dom"
// import WorkoutForm from "./WorkoutForm.js";

const WorkoutList = (props) => {
  const [workouts, setWorkouts] = useState([]);

  const getWorkouts = async () => {
    try {
      const response = await fetch("/api/v1/workouts");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setWorkouts(body.workouts);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  const workoutsListArray = workouts.map((workout) => {
    return (
      <div className="workout-item" key={workout.id}>
        <div className="workout-date">{workout.workoutDate}</div>
        <div className="workout-tile"><WorkoutTile workout={workout} /></div>
      </div>
    )
  });

  return (
    <div className="grid-container">
        <div className="routine-container grid-x align-center">
        <div className="cell medium-12">
          <h1>{props.user.firstName} {props.user.lastName}'s Workout Routines:</h1>
        </div>
        <div className="cell medium-6">
          <div className="add-workout-button">
            <Link to="/workouts/add">Add Workout</Link>
          </div>
        </div>
            <div className="cell medium-8 large-8">
              <div className="workouts-list">
                {workoutsListArray}
              </div>
            </div>
        </div>
    </div>
  );
};

export default WorkoutList;
