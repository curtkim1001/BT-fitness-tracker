import express from "express"
import objection from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Routine, User } from "../../../models/index.js"
const { ValidationError } = objection;

const routinesRouter = new express.Router()

routinesRouter.get("/", async (req, res) => {
    try {
        const routines = await Routine.query().orderBy('createdAt','desc')
        res.status(200).json({ routines })
    } catch (error) {
        res.status(500).json({ errors: error.message })
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

// moviesRouter.get("/:id", async (req, res) => {
//     const { id } = req.params
//     try {
//         const movie = await Movie.query().findById(id)
//         const serializedMovie = await MovieSerializer.getSummary(movie, req.user)
//         return res.status(200).json({ movie: serializedMovie })
//     } catch (error) {
//         res.status(500).json({ errors: error })
//     }
// })

export default routinesRouter

