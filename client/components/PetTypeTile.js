import React from "react"

const PetTypeTile = props => {
  return (
    <div>
      <h2>{props.type}</h2>
      <img src={props.img}></img>
      <p>{props.description}</p>
    </div>
  )
}

export default PetTypeTile