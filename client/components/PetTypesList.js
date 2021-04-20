import React, { useEffect, useState } from 'react'

import PetTypeTile from "./PetTypeTile"

const PetTypesList = props => {
  const [petTypes, setPetTypes] = useState([])

  const getPetTypes = async () => {
    try {
      const response = await fetch("/api/v1/petTypes")
      if(!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`)
        console.log("error")
        throw(error)
      }
      // array of petType object
      const data = await response.json()
      console.log(data)
      const petTypesData = data.petTypes
      setPetTypes(petTypesData)
    } catch (error) {
      console.log(error.message)
    }
  }

  const petTypeTileComponents = petTypes.map(petType => {
    return <PetTypeTile key={petType.id} type={petType.type} img={petType.imgUrl} description={petType.description} />
  })

  useEffect(() => {
    getPetTypes()
  }, [])
  return <div>
    {petTypeTileComponents}
  </div>
}

export default PetTypesList
