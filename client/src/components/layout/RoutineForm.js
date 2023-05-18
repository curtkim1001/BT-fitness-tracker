import React, { useState } from 'react'
import { Redirect } from "react-router-dom"
import ErrorList from './ErrorList.js'
import translateServerErrors from '../../services/translateServerErrors.js';
import _ from 'lodash'

const RoutineForm = (props) => {
    const [errors, setErrors] = useState({})
    const [routineRecord, setRoutineRecord] = useState({
        name: "",
        description: "",
        duration: "",
        subcategory: "",
    })
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const postRoutine = async (newRoutineData) => {
        try {
            const response = await fetch(`/api/v1/routines`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(newRoutineData),
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
        setRoutineRecord({
        ...routineRecord,
        [event.currentTarget.name]: event.currentTarget.value,
        })
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    postRoutine(routineRecord);
    clearForm();
    };

    const clearForm = () => {
    setRoutineRecord({
        name: "",
        description: "",
        duration: "",
        subcategory: "",
    });
    };

    if (shouldRedirect) {
        location.href="/workouts"
    }

    return (
    <div className="callout cell auto grid-x rounded-corner new-workout-form">
        <div className="cell routine-form-text">
            <h1>Create a New Workout</h1>
            <ErrorList errors={errors} />
            <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                Workout Title:
                <input
                className="rounded-corner"
                type="text"
                name="name"
                onChange={handleInputChange}
                value={routineRecord.name}
                />
            </label>

            <label htmlFor="description">
                Description:
                <input
                className="rounded-corner"
                type="text"
                name="description"
                onChange={handleInputChange}
                value={routineRecord.description}
                />
            </label>

            <label htmlFor="duration">
                Length of Workout:
                <input
                className="rounded-corner"
                type="text"
                name="duration"
                onChange={handleInputChange}
                value={routineRecord.duration}
                />
            </label>

            <label htmlFor="subcategory">
                Choose a Category:
                <select
                className="category-box"
                id="subcategory"
                value={routineRecord.subcategory}
                onChange={handleInputChange}
                name="subcategory"
                >
                <option value="empty"></option>
                <option value="Bodyweight Management">Bodyweight Management</option>
                <option value="Cardiovascular Training">Cardiovascular Training</option>
                <option value="Circuit Training">Circuit Training</option>
                <option value="CrossFit">CrossFit</option>
                <option value="Endurance Training">Endurance Training</option>
                <option value="Flexibility and Mobility">Flexibility and Mobility</option>
                <option value="Group Fitness Classes">Group Fitness Classes</option>
                <option value="High-Intensity Interval Training (HIIT)">High-Intensity Interval Training (HIIT)</option>
                <option value="Mindfulness and Meditation">Mindfulness and Meditation</option>
                <option value="Outdoor Workouts">Outdoor Workouts</option>
                <option value="Rehabilitation or Injury Prevention">Rehabilitation or Injury Prevention</option>
                <option value="Specialized Training">Specialized Training</option>
                <option value="Sports Conditioning">Sports Conditioning</option>
                <option value="Sports-Specific Training">Sports-Specific Training</option>
                <option value="Strength Training">Strength Training</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Yoga/Pilates">Yoga/Pilates</option>
                </select>
            </label>

            <div className="button-group">
                <input className="button" type="submit" value="Submit" />
            </div>
            </form>
        </div>
    </div>
    );
};

export default RoutineForm