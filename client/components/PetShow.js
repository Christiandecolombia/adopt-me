import React, { useEffect, useState } from "react"
import _ from "lodash"

import AdoptionForm from "./AdoptionForm"

const PetShow = props => {
  const [pet, setPet] = useState({})
  const [adoptionForm, setAdoptionForm] = useState("hide-form")
  const [submitMessage, setSubmitMessage] = useState("")

  const getPet = async () => {
    const petType = props.match.params.petType
    const adoptablePetId = props.match.params.adoptablePetId
    try {
      const response = await fetch(`/api/v1/adoptable-pets/${petType}/${adoptablePetId}`)
      if (!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`)
        console.log("error")
        throw error
      }
      const data = await response.json()
      const petData = data.pet
      setPet(petData)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getPet()
  }, [])

  let vaccination
  if (pet.vaccinationStatus) {
    vaccination = "Yes"
  } else {
    vaccination = "No"
  }

  const onClick = event => {
    setAdoptionForm("")
    setSubmitMessage("")
  }

  const onSubmit = event => {
    setAdoptionForm("hide-form")
    setSubmitMessage("Your request is in process.")
  }

  let petDetail
  if (_.isEmpty(pet)) {
    petDetail = (
      <h2 className="text-center">Sorry the pet was not found.</h2>
    )
  } else {
    petDetail = (
      <div className="text-center pet-show">
        <img src={pet.imgUrl} alt="image of pet"></img>
        <h3>Name: {pet.name}</h3>
        <p>Age: {pet.age}</p>
        <p>Vaccinated: {vaccination}</p>
        <p>
          {pet.name}'s story: {pet.adoptionStory}
        </p>
        <button type="button" className="button" onClick={onClick}>
          Adopt Me!
        </button>
        <div className={adoptionForm}>
          <AdoptionForm name={pet.name} id={pet.id} onSubmit={onSubmit} />
        </div>
        <p>{submitMessage}</p>
      </div>
    )
  }

  return <div>{petDetail}</div>
}

export default PetShow
