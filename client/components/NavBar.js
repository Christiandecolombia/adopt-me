import React from "react"
import { Link, Route } from "react-router-dom"

const NavBar = props => {
  return (
    <div className="menu">
        <Link to="/pets">List of pet types</Link>
        <Link to="/pets/cat">All cats</Link>
        <Link to="/pets/dog">All dogs</Link>
        <Link to="/pets/parrot">All parrots</Link>
        <Link to="/adoptions/new">List a pet for adoption</Link>
    </div>
  )
}

export default NavBar