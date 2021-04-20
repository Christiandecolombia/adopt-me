import React from 'react'

const AdoptablePetTile = props => {
  let vaccination
  if(props.vaccinationStatus) {
    vaccination = "Yes"
  } else {
    vaccination = "No"
  }

  return (
    <div>
      <img src={props.imgUrl}></img>
      <h2>Name: {props.name}</h2>
      <h3>Age: {props.age}</h3>
      <h3>Vaccinated: {vaccination}</h3>
    </div>
  )
}

export default AdoptablePetTile