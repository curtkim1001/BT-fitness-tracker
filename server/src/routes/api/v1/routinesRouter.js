import express from "express"
import objection from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Routine, User } from "../../../models/index.js"
import RoutineSerializer from "../../../serializers/RoutineSerializer.js";
import routineExercisesRouter from "./routineExercisesRouter.js"
const { ValidationError } = objection;

const routinesRouter = new express.Router()

routinesRouter.use("/:routineId/exercises", routineExercisesRouter)

routinesRouter.get("/", async (req, res) => {
    try {
        const user = req.user
        const routines = await user.$relatedQuery("routines").orderBy('createdAt','desc')
        const serializedRoutines = await RoutineSerializer.getSummary(routines)
        res.status(200).json({ routines: serializedRoutines })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
})

routinesRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const routine = await Routine.query().findById(id)
        const serializedRoutine = await RoutineSerializer.getSummary([routine])
        return res.status(200).json({ routine: serializedRoutine })
    } catch (error) {
        res.status(500).json({ errors: error })
    }
})

routinesRouter.post("/", async (req, res) => {
    const { body } = req
    const formInput = cleanUserInput(body);
    const { name, description, duration, subcategory } = formInput;
    const userId = req.user.id;
    try {
        const newRoutine = await Routine.query().insertAndFetch({
            userId,
            name,
            description,
            duration,
            subcategory,
        });
        return res.status(201).json({ routine: newRoutine });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error.data });
        } else {
            res.status(500).json({ errors: error.message });
        }
    }
});

export default routinesRouter

