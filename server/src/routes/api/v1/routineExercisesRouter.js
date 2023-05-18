import express from "express";
import { Exercise, Routine, User, Workout } from "../../../models/index.js";

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

export default routineExercisesRouter;
