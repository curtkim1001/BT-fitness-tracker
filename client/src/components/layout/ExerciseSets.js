import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ExerciseSetTile from "./ExerciseSetTile.js"
import LogSetForm from "./LogSetForm.js"

const ExerciseSets = (props) => {

    const { id } = useParams();
    const { exerciseId } = useParams();
    const [exercise, setExercise] = useState({})
    const [exerciseSets, setExerciseSets] = useState([]);
  
    const getExerciseSets = async () => {
      try {
        const response = await fetch(`/api/v1/workouts/${id}/exercises/${exerciseId}/sets`);
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const body = await response.json();
        setExercise(body.exercise[0])
        setExerciseSets(body.sets);
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
      }
    };
  
    useEffect(() => {
        getExerciseSets();
    }, []);

    const exerciseSetsArray = exerciseSets.map((set) => {
        return <ExerciseSetTile set={set} key={set.id} workoutId={id} exerciseId={exerciseId} />;
      });
  
    return (
      <div className="grid-container">
          <div className="routine-container grid-x align-center">
              <h1>Log Sets for {exercise.name}</h1>
              <div className="cell medium-8 large-8">
                {exerciseSetsArray}
              </div>

              <div className="cell medium-4 large-4">
                <LogSetForm workoutId={id} exerciseId={exerciseId} />
              </div>
          </div>
      </div>
    );
  };
  
  export default ExerciseSets;
  