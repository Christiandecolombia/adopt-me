import React from "react"
import { Link } from "react-router-dom"

const PetTypeTile = props => {
  return (
    <div className="text-center">
      <Link to={`/pets/${props.type}`}>
        <h2>{props.type}</h2>
        <img alt={`picture of a ${props.type}`} src={props.img}></img>
      </Link>
      <p>{props.description}</p>
    </div>
  )
}

export default PetTypeTile