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
    const petType = await PetType.findByType(req.body.petType)
    
    const adoptablePet = new AdoptablePet({ 
      name: req.body.petName,
      imgUrl: req.body.petImage,
      age: req.body.petAge,
      vaccinationStatus: req.body.vaccinationStatus,
      petTypeId: petType.id,
      adoptionStory: "Adoption story pending"
    })
    await adoptablePet.save()
    const surrenderApplication = new SurrenderApplication({
      name:  req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      adoptablePetId: adoptablePet.id
    })
    await surrenderApplication.save()
    res.status(201).json({ pets: adoptablePet })
  } catch (error) {
    console.log(error)
    res.json({ errors: error })
  }
})


export default petTypesRouter