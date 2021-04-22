import React from 'react'
import { Link } from 'react-router-dom'

const AdoptablePetTile = props => {
  let vaccination
  if(props.vaccinationStatus) {
    vaccination = "Yes"
  } else {
    vaccination = "No"
  }

  return (
    <div className="text-center">
      <Link to={`/pets/${props.petType}/${props.adoptablePetId}`}>
        <img src={props.imgUrl}></img>
        <h2>Name: {props.name}</h2>
      </Link>
      <h3>Age: {props.age}</h3>
      <h3>Vaccinated: {vaccination}</h3>
    </div>
  )
}

export default AdoptablePetTile