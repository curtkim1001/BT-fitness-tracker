import express from "express"
import { Exercise } from "../../../models/index.js"
import ExerciseSerializer from "../../../serializers/ExerciseSerializer.js"

const exercisesRouter = new express.Router()

exercisesRouter.get("/", async (req, res) => {
    try {
        const exercises = await Exercise.query()
        const serializedExercises = await ExerciseSerializer.getSummary(exercises)
        res.status(200).json({ exercises: serializedExercises })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
})

exercisesRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const exercise = await Exercise.query().findById(id)
        const serializedExercise = await ExerciseSerializer.getSummary([exercise])
        return res.status(200).json({ exercise: serializedExercise })
    } catch (error) {
        res.status(500).json({ errors: error })
    }
})

exercisesRouter.get("/search/:query", async (req, res) => {
    let serializedExercises
    try {
        const searchQuery = req.params.query
        const exercises = await Exercise.query().where("name","ilike",`%${searchQuery}%`)
        if (exercises) {
            serializedExercises = await ExerciseSerializer.getSummary(exercises)
        } else {
            serializedExercises = null
        }
        res.status(200).json({ exercises: serializedExercises })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
})

export default exercisesRouter

