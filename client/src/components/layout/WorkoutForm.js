import React, { useState } from 'react'
import { Redirect } from "react-router-dom"
import ErrorList from './ErrorList.js'
import translateServerErrors from '../../services/translateServerErrors.js';
import _ from 'lodash'

const WorkoutForm = (props) => {
    const [errors, setErrors] = useState({})
    const [workoutRecord, setWorkoutRecord] = useState({
        name: "",
        duration: "",
        subcategory: "",
        notes: "",
        effortLevel: ""
    })
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const postWorkout = async (newWorkoutData) => {
        try {
            const response = await fetch(`/api/v1/workouts`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(newWorkoutData),
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
        setWorkoutRecord({
        ...workoutRecord,
        [event.currentTarget.name]: event.currentTarget.value,
        })
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    postWorkout(workoutRecord);
    clearForm();
    };

    const clearForm = () => {
    setWorkoutRecord({
        name: "",
        duration: "",
        subcategory: "",
        notes: "",
        effortLevel: ""
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
                Name of Workout:
                <input
                className="rounded-corner"
                type="text"
                name="name"
                onChange={handleInputChange}
                value={workoutRecord.name}
                />
            </label>

            <label htmlFor="duration">
                Length of Workout:
                <input
                className="rounded-corner"
                type="text"
                name="duration"
                placeholder="minutes"
                onChange={handleInputChange}
                value={workoutRecord.duration}
                />
            </label>

            <label htmlFor="subcategory">
                Choose a Category:
                <select
                className="category-box"
                id="subcategory"
                value={workoutRecord.subcategory}
                onChange={handleInputChange}
                name="subcategory"
                >
                <option value="empty"></option>
                <option value="Cardio Training">Cardio Training</option>
                <option value="Sports Training">Sports Training</option>
                <option value="Flexibility Training">Flexibility Training</option>
                <option value="Weight/Resistance Training">Weight/Resistance Training</option>
                </select>
            </label>

            <label htmlFor="effortLevel">
                Intensity level from 1 to 10:
                <select
                className="category-box"
                id="effortLevel"
                value={workoutRecord.effortLevel}
                onChange={handleInputChange}
                name="effortLevel"
                >
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </label>

            <label htmlFor="notes">
                Notes:
                <input
                className="rounded-corner"
                type="text"
                name="notes"
                onChange={handleInputChange}
                value={workoutRecord.notes}
                />
            </label>

            <div className="button-group">
                <input className="button" type="submit" value="Submit" />
            </div>
            </form>
        </div>
    </div>
    );
};

export default WorkoutForm