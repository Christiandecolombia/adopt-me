import express from "express"
import PetType from "../../../models/PetType.js"
import AdoptablePet from "../../../models/AdoptablePet.js"
import SurrenderApplication from "../../../models/SurrenderApplication.js"
import AdoptionApplication from "../../../models/AdoptionApplication.js"

const adoptablePetsRouter = new express.Router()

adoptablePetsRouter.get('/:petType/:adoptablePetId', async (req, res) => {
  try {
    const petType = await PetType.findByType(req.params.petType)
    const adoptablePetId = req.params.adoptablePetId
    const pet = await petType.findPet(adoptablePetId)
    res.status(200).json({ pet: pet })
  } catch (error) {
    res.status(404).json({ errors: error })
  }
})

adoptablePetsRouter.post('/', async (req, res) => {
  try {
    const petType = await PetType.findByType(req.body.petType)

    const adoptablePet = new AdoptablePet({
      name: req.body.petName,
      imgUrl: req.body.petImage,
      age: req.body.petAge,
      vaccinationStatus: req.body.vaccinationStatus,
      petTypeId: petType.id,
      adoptionStory: "Sadly surrendered to us by someone who wanted the best for them."
    })
    await adoptablePet.save()
    const surrenderApplication = new SurrenderApplication({
      name: req.body.name,
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

adoptablePetsRouter.post('/:id', async (req, res) => {
  try {
    const adoptionApplication = new AdoptionApplication({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      homeStatus: req.body.homeStatus,
      applicationStatus: req.body.applicationStatus,
      adoptablePetId: req.params.id
    }) 
    await adoptionApplication.save()
    res.status(201).json({ adoptionApplication: adoptionApplication })
  } catch (error) {
    res.status(500).json({ errors: error })
  }
})

export default adoptablePetsRouter