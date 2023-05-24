import express from "express"
import objection from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Workout, User, Set, Exercise } from "../../../models/index.js"
import WorkoutSerializer from "../../../serializers/WorkoutSerializer.js";
import workoutExercisesRouter from "./workoutExercisesRouter.js";
const { ValidationError } = objection;

const workoutsRouter = new express.Router()

workoutsRouter.use("/:workoutId/exercises", workoutExercisesRouter)

workoutsRouter.get("/", async (req, res) => {
    try {
        const user = req.user
        const workouts = await user.$relatedQuery("workouts").orderBy('createdAt','desc')
        const serializedWorkouts = await WorkoutSerializer.getSummary(workouts)
        res.status(200).json({ workouts: serializedWorkouts })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
})

workoutsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const workout = await Workout.query().findById(id)
        const serializedWorkout = await WorkoutSerializer.getSummary([workout])
        return res.status(200).json({ workout: serializedWorkout })
    } catch (error) {
        res.status(500).json({ errors: error })
    }
})

workoutsRouter.post("/", async (req, res) => {
    const { body } = req
    const formInput = cleanUserInput(body);
    const { name, duration, subcategory, notes, effortLevel } = formInput;
    const userId = req.user.id;
    try {
        const newWorkout = await Workout.query().insertAndFetch({
            userId,
            name,
            duration,
            subcategory,
            notes,
            effortLevel
        });
        return res.status(201).json({ workout: newWorkout });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error.data });
        } else {
            res.status(500).json({ errors: error.message });
        }
    }
});

workoutsRouter.delete("/:workoutId", async (req, res) => {
    const { workoutId } = req.params
    try {
        const workout = await Workout.query().findById(workoutId)
        const exercises = await workout.$relatedQuery("exercises")
        const exerciseIds = exercises.map((exercise)=> exercise.id)
        const sets = await Set.query().where("workoutId", workoutId)
        for (const set of sets) {
            await Set.query().deleteById(set.id)
        }
        for (const exerciseId of exerciseIds) {
            await Exercise.query().deleteById(exerciseId)
        }
        await Workout.query().deleteById(workoutId)

        res.status(200).json({ message: "Routine was deleted by user" })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

workoutsRouter.patch("/:workoutId", async (req, res) => {
    const { workoutId } = req.params
    try {
        const { body } = req
        const cleanedInput = cleanUserInput(body.workout)
        const edittedWorkout = await Workout.query().patchAndFetchById(workoutId, cleanedInput)
        return res.status(200).json({ workout:edittedWorkout })
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(422).json({ errors: err.data })
        } else {
            res.status(500).json({ errors: err.message })
        }
    }
  })

export default workoutsRouter

