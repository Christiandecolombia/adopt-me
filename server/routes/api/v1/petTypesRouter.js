import express from "express"
// import Adventure from "../../../models/Adventure.js"
import PetType from "../../../models/PetType.js"

const petTypesRouter = new express.Router()

petTypesRouter.get('/', async (req, res) => {
  try {
    const petTypes = await PetType.findAll()
    res.json({ petTypes: petTypes })
  } catch (error) {
    res.json({ errors: error })
  }
})

export default petTypesRouter