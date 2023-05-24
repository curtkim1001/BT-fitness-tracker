import express from "express";
import cleanUserInput from "../../../services/cleanUserInput.js";
import objection from "objection";
const { ValidationError } = objection;
import { Exercise, Workout, User, Set } from "../../../models/index.js";
import ExerciseSerializer from "../../../serializers/ExerciseSerializer.js"

const workoutExercisesRouter = new express.Router({ mergeParams: true });

workoutExercisesRouter.get("/", async (req, res) => {
  const { workoutId } = req.params
  try {
    const workout = await Workout.query().findById(workoutId)
    const relatedExercises = await workout.$relatedQuery("exercises").distinct("exercises.id").select("exercises.*")
    return res.status(200).json({ exercises: relatedExercises });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});

workoutExercisesRouter.get("/:exerciseId/sets", async (req, res) => {
  const { exerciseId } = req.params
  const { workoutId } = req.params
  try {
      const exercise = await Exercise.query().findById(exerciseId)
      const serializedExercise = await ExerciseSerializer.getSummary([exercise])
      const relatedSets = await exercise.$relatedQuery("sets").where("workoutId", workoutId)
      return res.status(200).json({ exercise: serializedExercise, sets: relatedSets })
  } catch (error) {
      res.status(500).json({ errors: error })
  }
})

workoutExercisesRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body);
  const { name, description, muscleGroup, bodyFunction, instructions, videoUrl, equipment, notes } = formInput;
  const { workoutId } = req.params
  try {
        const newExercise = await Exercise.query().insertAndFetch({
          name,
          description,
          muscleGroup,
          bodyFunction,
          instructions,
          videoUrl,
          equipment,
          notes
        })
        const relatedSet = await Set.query().insertAndFetch({ workoutId, exerciseId: newExercise.id })
        return res.status(201).json({ exercise: newExercise });
  } catch (error) {
      if (error instanceof ValidationError) {
          res.status(422).json({ errors: error.data });
      } else {
          res.status(500).json({ errors: error.message });
      }
  }
});

workoutExercisesRouter.post("/search", async (req, res) => {
  const exercise = req.body
  const serializedExercise = await ExerciseSerializer.removeIdForSearchAdd(exercise)
  const { workoutId } = req.params
  try {
    const newExercise = await Exercise.query().insert(serializedExercise)
    const newSetForSearchedExercise = await Set.query().insert({exerciseId: newExercise.id, workoutId})
    return res.status(201).json({ message: "exercise successfully added" });
  } catch (error) {
      if (error instanceof ValidationError) {
          res.status(422).json({ errors: error.data });
      } else {
          res.status(500).json({ errors: error.message });
      }
  }
});

workoutExercisesRouter.post("/:exerciseId/sets", async (req, res) => {
  let newSet
  const { body } = req
  const formInput = cleanUserInput(body);
  const { repetitions, weight, miles, calories, score, workoutSets } = formInput;
  const { workoutId, exerciseId } = req.params
  try {
    const existingSet = await Set.query().where({ workoutId, exerciseId })
    if (existingSet.length === 1) {
      if (existingSet[0].repetitions === null &&
        existingSet[0].weight === null &&
        existingSet[0].miles === null &&
        existingSet[0].calories === null &&
        existingSet[0].score === null &&
        existingSet[0].workoutSets === null) {
          newSet = await Set.query().patchAndFetchById(existingSet[0].id, formInput)
      } else {
        newSet = await Set.query().insertAndFetch({ workoutId, exerciseId, repetitions, weight, miles, calories, score, workoutSets })
      }
    } else {
      newSet = await Set.query().insertAndFetch({ workoutId, exerciseId, repetitions, weight, miles, calories, score, workoutSets })
    }
      return res.status(201).json({ set: newSet });
  } catch (error) {
      if (error instanceof ValidationError) {
          res.status(422).json({ errors: error.data });
      } else {
          res.status(500).json({ errors: error.message });
      }
  }
});

workoutExercisesRouter.delete("/:exerciseId", async (req, res) => {
  const { exerciseId, workoutId } = req.params
  try {
      const exercise = await Exercise.query().findById(exerciseId)
      const relatedSets = await exercise.$relatedQuery("sets")
      relatedSets.forEach(async (set)=> {
        await Set.query().findById(set.id).delete()
      })
      await Exercise.query().deleteById(exerciseId)
      res.status(200).json({ message: "Exercise was deleted by user" })
  } catch (error) {
      return res.status(500).json({ errors: error })
  }
})

workoutExercisesRouter.patch("/:exerciseId", async (req, res) => {
  const { exerciseId } = req.params
  try {
      const { body } = req
      const cleanedInput = cleanUserInput(body.exercise)
      const exercise = await Exercise.query().patchAndFetchById(exerciseId, cleanedInput)
      return res.status(200).json({ exercise:exercise })
  } catch (err) {
      if (err instanceof ValidationError) {
          res.status(422).json({ errors: err.data })
      } else {
          res.status(500).json({ errors: err.message })
      }
  }
})

export default workoutExercisesRouter;
