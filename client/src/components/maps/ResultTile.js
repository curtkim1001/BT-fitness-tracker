import React, { useState } from "react"

const ResultTile = (props) => {

    const addLocationToWorkout = async (locationData) => {
        try {
        const response = await fetch(`/api/v1/locations`, {
            method: "POST",
            headers: new Headers({
            "Content-Type": "application/json",
            }),
            body: JSON.stringify(locationData),
        });
            const body = await response.json()
            props.setWorkoutRecord({
                    ...props.workoutRecord,
                    locationId: body.locationId
            })
            props.setLocationAdded(true)
        } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
        }
    };

    const addLocationHandler = event => {
        event.preventDefault()
        addLocationToWorkout(props.result)
    }

  return (
    <div className="callout">
      <h3>{props.result.name}</h3>
      <p>{props.result.formatted_address}</p>
      <button className="exercise-search-button" type="button" onClick={addLocationHandler}>Add Location</button>
    </div>
  )
}

export default ResultTile