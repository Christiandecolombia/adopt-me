import React from "react"
import { Link } from "react-router-dom"

const PetTypeTile = props => {
  return (
    <div>
      <Link to={`/pets/${props.type}`}>
        <h2>{props.type}</h2>
      </Link>
      <Link to={`/pets/${props.type}`}>
        <img src={props.img}></img>
      </Link>
      <p>{props.description}</p>
    </div>
  )
}

export default PetTypeTile