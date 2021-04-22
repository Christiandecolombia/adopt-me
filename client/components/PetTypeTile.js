import React from "react"
import { Link } from "react-router-dom"

const PetTypeTile = props => {
  return (
    <div className="text-center">
      <Link to={`/pets/${props.type}`}>
        <h2>{props.type}</h2>
        <img alt="Picture of an amimal" src={props.img}></img>
      </Link>
      <h3>{props.description}</h3>
    </div>
  )
}

export default PetTypeTile