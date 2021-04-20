import express from "express"
import PetType from "../../../models/PetType.js"

const petTypesRouter = new express.Router()

petTypesRouter.get('/', async (req, res) => {
  try {
    const petTypes = await PetType.findAll()
    res.status(200).json({ petTypes: petTypes })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

petTypesRouter.get('/:petType', async (req, res) => {
  try {
    const petType = await PetType.findByType(req.params.petType)
    petType.adoptablePets = await petType.adoptablePets()
    res.status(200).json({ pets: petType })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default petTypesRouter