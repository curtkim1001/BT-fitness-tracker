import React, { useState } from 'react';

const ExerciseSearch = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errors, setErrors] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [noResultsMessage, setNoResultsMessage] = useState("")

  const fetchSearchResults = async () => {
    try {
        if(searchQuery.trim()==="") {
            setNoResultsMessage("Search cannot be Empty. Please Try Again.")
        }
        const response = await fetch(`/api/v1/exercises/search/${searchQuery}`)
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
        }
        const searchedExerciseData = await response.json();
        if (searchedExerciseData.exercises.length === 0) {
            setNoResultsMessage("No results found") 
        } else {
            setNoResultsMessage("")
        }
        setSearchResults(searchedExerciseData.exercises);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const addExercise = async (exercise) => {
    try {
      const response = await fetch(`/api/v1/routines/${props.routine.id}/exercises`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(exercise),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json();
          return setErrors(errorBody.errors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const responseBody = await response.json();
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleSearchInputChange = (event) => {
    event.preventDefault()
    setSearchQuery(event.currentTarget.value);
    // fetchSearchResults() // allows results to auto-populate when typing
  };

  if (shouldRedirect) {
    location.href=`/workouts/${props.routine.id}`
    }


  return (
    <div className="callout exercise-search-container">
        <div className="exercise-search-header">
            <h4>Search for Exercises</h4>
        </div>
      <div className="exercise-search-input">
        <input type="text" placeholder="Search for an exercise here" value={searchQuery} onChange={handleSearchInputChange} />
      </div>
      <button className="exercise-search-button" type="button" onClick={() => fetchSearchResults()}>Search</button>
      {noResultsMessage}
      <ul>
        {searchResults.map((exercise) => (
            <li key={exercise.id}>
                {exercise.name}
                <button className="exercise-search-button" type="button" onClick={() => addExercise(exercise)}>Add Exercise</button>
            </li>
        ))}
      </ul>
      <p>{errors}</p>
    </div>
  );
};

export default ExerciseSearch;