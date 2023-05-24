import React, { useEffect, useState } from "react";
import WorkoutTile from "./WorkoutTile.js"
import WorkoutForm from "./WorkoutForm.js";

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
    return <WorkoutTile workout={workout} key={workout.id} />;
  });

  return (
    <div className="grid-container">
        <div className="routine-container grid-x align-center">
            <h1>{props.user.firstName} {props.user.lastName}'s Workout Routines:</h1>
            <div className="cell medium-8 large-8">
                {workoutsListArray}
            </div>
            <div className="cell medium-4 large-4">
                <WorkoutForm />
            </div>
        </div>
    </div>
  );
};

export default WorkoutList;
