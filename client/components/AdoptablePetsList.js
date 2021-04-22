import React, { useEffect, useState } from 'react'

import AdoptablePetTile from './AdoptablePetTile'

const AdoptablePetsList = props => {
  const [adoptablePets, setAdoptablePets] = useState([])
  const petType = props.match.params.petType

  const fetchPets = async () => {
    try {
      const response = await fetch(`/api/v1/pet-types/${petType}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const petsData = await response.json()
      const pets = petsData.pets.adoptablePets
      setAdoptablePets(pets)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchPets()
  }, [])

  const petComponents = adoptablePets.map(adoptablePet => {
    return (
      <AdoptablePetTile
        key={adoptablePet.id}
        adoptablePetId={adoptablePet.id}
        imgUrl={adoptablePet.imgUrl}
        name={adoptablePet.name}
        age={adoptablePet.age}
        vaccinationStatus={adoptablePet.vaccinationStatus}
        petType={petType}
      />
    )
  })

  return (
    <div>
      {petComponents}
    </div>
  )
}

export default AdoptablePetsList