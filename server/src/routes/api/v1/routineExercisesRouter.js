import express from "express";
import cleanUserInput from "../../../services/cleanUserInput.js";
import objection from "objection";
const { ValidationError } = objection;
import { Exercise, Routine, User, Workout } from "../../../models/index.js";
import ExerciseSerializer from "../../../serializers/ExerciseSerializer.js"

const routineExercisesRouter = new express.Router({ mergeParams: true });

routineExercisesRouter.get("/", async (req, res) => {
  const { routineId } = req.params
  try {
    const routine = await Routine.query().findById(routineId)
    const relatedExercises = await routine.$relatedQuery("exercises");
    return res.status(200).json({ exercises: relatedExercises });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});

routineExercisesRouter.post("/", async (req, res) => {
  let newExercise
  const { body } = req
  const formInput = cleanUserInput(body);
  const { name, description, muscleGroup, bodyFunction } = formInput;
  const userId = req.user.id
  const { routineId } = req.params
  try {
     const findExercise = await Exercise.query().findOne({ name})
      if (findExercise) {
        const findWorkout = await Workout.query().findOne({routineId, exerciseId:findExercise.id})
        if (!findWorkout) {
          await Workout.query().insert({ routineId, exerciseId:findExercise.id })
        }
      } else {
        newExercise = await Exercise.query().insertAndFetch({
          userId,
          name,
          description,
          muscleGroup,
          bodyFunction
        })
        await Workout.query().insert({ routineId, exerciseId:newExercise.id })
      }
      return res.status(201).json({ exercise: newExercise });
  } catch (error) {
      if (error instanceof ValidationError) {
          res.status(422).json({ errors: error.data });
      } else {
          res.status(500).json({ errors: error.message });
      }
  }
});

routineExercisesRouter.delete("/:exerciseId", async (req, res) => {
  const { exerciseId, routineId } = req.params
  try {
      await Workout.query().findOne({exerciseId, routineId}).delete()
      await Exercise.query().deleteById(exerciseId)
      res.status(200).json({ message: "Exercise was deleted by user" })
  } catch (error) {
      return res.status(500).json({ errors: error })
  }
})

routineExercisesRouter.patch("/:exerciseId", async (req, res) => {
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

export default routineExercisesRouter;
