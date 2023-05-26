import express from "express"
import { Location } from "../../../models/index.js"

const locationsRouter = new express.Router()

locationsRouter.post("/", async (req, res) => {
    try {
        const { name, formatted_address } = req.body
        const location = await Location.query().insertAndFetch({ name, address:formatted_address })
      res.status(200).json({ locationId: location.id })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
  })

export default locationsRouter

