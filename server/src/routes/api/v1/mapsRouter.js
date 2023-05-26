import express from "express"
import searchLocation from "../../../services/searchLocation.js"

const mapsRouter = new express.Router()

mapsRouter.get("/:search", async (req, res) => {
    try {
        const { search } = req.params
        const locationResults = await searchLocation.getSearchResults(search)
      res.status(200).json({ locationResults })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
  })

export default mapsRouter

