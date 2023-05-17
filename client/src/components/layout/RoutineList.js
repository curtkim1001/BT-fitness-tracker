import React, { useEffect, useState } from "react";
import RoutineTile from "./RoutineTile.js"
import RoutineForm from "./RoutineForm.js";

const RoutineList = (props) => {
  const [routines, setRoutines] = useState([]);

  const getRoutines = async () => {
    try {
      const response = await fetch("/api/v1/routines");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setRoutines(body.routines);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getRoutines();
  }, []);

  const routinesListArray = routines.map((routine) => {
    return <RoutineTile routine={routine} key={routine.id} />;
  });

  return (
    <div className="grid-container">
        <div className="routine-container grid-x align-center">
            <h1>{props.user.firstName} {props.user.lastName}'s Workout Routines:</h1>
            <div className="cell medium-6 large-6">
                {routinesListArray}
            </div>
            <div className="cell medium-6 large-6">
                <RoutineForm />
            </div>
        </div>
    </div>
  );
};

export default RoutineList;
