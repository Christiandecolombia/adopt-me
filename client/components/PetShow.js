import React, { useEffect, useState } from "react"
import _ from "lodash"

const PetShow = props => {
  const [pet, setPet] = useState({})

  const getPet = async () => {
    const adoptablePetId = props.match.params.adoptablePetId
    const petType = props.match.params.petType
    try {
      const response = await fetch(`/api/v1/adoptablePets/${petType}/${adoptablePetId}`)
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

  let petDetail
  if (_.isEmpty(pet)) {
    petDetail = <h2 className="text-center">Sorry the pet was not found.</h2>
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
      </div>
    )
  }

  return <div>{petDetail}</div>
}

export default PetShow
