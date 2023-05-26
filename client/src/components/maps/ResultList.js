import React from "react"

import ResultTile from "./ResultTile"

const ResultList = (props) => {
  const results = props.searchResults.map((result) => {
    return (
      <ResultTile
        key={result.place_id}
        result={result}
        workoutRecord={props.workoutRecord} 
        setWorkoutRecord={props.setWorkoutRecord}
        setSearchQuery={props.setSearchQuery}
        locationAdded={props.locationAdded}
        setLocationAdded={props.setLocationAdded}
      />
    )
  })

  return (
    <>
      {results}
    </>
  )
}

export default ResultList