import React, { useEffect, useState } from 'react'
import PetTypesList from "./PetTypesList"

const PetShow = props => {
  const [petTypes, setPetTypes] = useState({ pets: [] })

  const getPetTypes = async () => {
      const id = props.match.params.id
      try {
          const response = await fetch(`/api/v1/${petTypes}/${id}`)
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

  const AdoptablePetListItem = petTypes.adoptablePets.map(pet => {
      return (
          <div key={pet.id}>
              <ul>
                  <li>{pet.img_url}</li>
                  <li>{pet.name}</li>
                  <li>{pet.age}</li>
                  <li>{pet.vaccination_status}</li>
                  <li>{pet.adoption_story}</li>

              </ul>
          </div>
      )
  })

  useEffect(() => {
      getPetTypes()
  }, [])

  return <div>
      {AdoptablePetListItem}
  </div>
}

export default PetShow