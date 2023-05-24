import express from "express"
import { Set } from "../../../models/index.js"

const setsRouter = new express.Router()

setsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
      await Set.query().deleteById(id)
      res.status(200).json({ message: "Set was deleted by user" })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
  })

export default setsRouter

