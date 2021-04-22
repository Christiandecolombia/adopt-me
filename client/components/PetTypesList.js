import React, { useEffect, useState } from 'react'

import PetTypeTile from "./PetTypeTile"

const PetTypesList = props => {
  const [petTypes, setPetTypes] = useState([])

  const getPetTypes = async () => {
    try {
      const response = await fetch("/api/v1/pet-types")
      if (!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`)
        console.log("error")
        throw (error)
      }
      const data = await response.json()
      const petTypesData = data.petTypes
      setPetTypes(petTypesData)
    } catch (error) {
      console.log(error.message)
    }
  }

  const petTypeTileComponents = petTypes.map(petType => {
    return (
      <PetTypeTile
        key={petType.id}
        type={petType.type}
        img={petType.imgUrl}
        description={petType.description}
      />
    )
  })

  useEffect(() => {
    getPetTypes()
  }, [])
  return (
    <div>
      {petTypeTileComponents}
    </div>
  )
}

export default PetTypesList
