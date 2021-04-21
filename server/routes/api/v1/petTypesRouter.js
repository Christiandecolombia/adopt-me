import express from "express"
import AdoptablePet from "../../../models/AdoptablePet.js"
import PetType from "../../../models/PetType.js"
import SurrenderApplication from "../../../models/SurrenderApplication.js"

const petTypesRouter = new express.Router()

petTypesRouter.get('/', async (req, res) => {
  try {
    const petTypes = await PetType.findAll()
    res.status(200).json({ petTypes: petTypes })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

// petTypesRouter.get('/:petType', async (req, res) => {
//   try {
//     const petType = await PetType.findByType(req.params.petType)
//     AdoptablePet.getAvailablePets()
//     petType.available = await petType.getAvailablePets()
//     res.status(200).json({ pets: petTypes })
//   } catch (error) {
//     return res.status(500).json({ errors: error })
//   }
// })

petTypesRouter.get('/:petType', async (req, res) => {
  try {
    const petType = await PetType.findByType(req.params.petType)
    petType.adoptablePets = await petType.adoptablePets()
    res.status(200).json({ pets: petType })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

petTypesRouter.post('/:petType', async (req, res) => {
  try {
    const adoptablePet = new AdoptablePet(req.body)
    const surrenderApplication = new SurrenderApplication(req.body)
    await adoptablePet.save()
    await surrenderApplication.save()
    res.status(201).json({ pets: adoptablePet })
  } catch (error) {
    console.log(error)
    res.json({ errors: error })
  }
})


export default petTypesRouter