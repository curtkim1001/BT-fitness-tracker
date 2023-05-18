import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const ExerciseTile = ({exercise}) => {
    return (
        <div className="callout rounded-corner">
            <h3>{exercise.name}</h3>
            <p>Description: {exercise.description}</p>
            <p>Muscle Groups: {exercise.muscleGroup}</p>
            <p>Body Function: {exercise.bodyFunction}</p>
        </div>
    );
}

export default ExerciseTile;
