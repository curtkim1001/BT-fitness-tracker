import React from "react";
import { Redirect, Link } from "react-router-dom";

const RoutineTile = ({ routine }) => {
    let descriptionText
    let durationText
    let categoryText
    if (routine.description) {
        descriptionText = <p>Description: {routine.description}</p>
    }
    if (routine.duration) {
        durationText = <p>Duration: {routine.duration} minutes</p>
    }
    if (routine.subcategory) {
        categoryText = <p>Category: {routine.subcategory}</p>
    }

    const formatDate = (string)=> {
        const tIndex = string.indexOf("T")
        return string.slice(0,tIndex)
    }
    
  return (
    <>
      {/* <Link to={`/movies/${movie.id}`}> */}
        <div className="callout border rounded-corner">
            <h4>
              <strong>{routine.name}</strong>
            </h4>
            {descriptionText}
            {durationText}
            {categoryText}
            <p>Date Created: {formatDate(routine.createdAt)}</p>
        </div>
      {/* </Link> */}
    </>
  );
};

export default RoutineTile;
