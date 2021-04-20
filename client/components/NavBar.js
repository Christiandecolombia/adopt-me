import React from "react"
import { Link } from "react-router-dom"

const NavBar = props => {
  return (
    <div className="navbar">
      <div>
        <Link to="/pets">List of pet types</Link>
      </div>
      <div>
        <Link to="/pets/cat">All cats</Link>
      </div>
      <div>
        <Link to="/pets/dog">All dogs</Link>
      </div>
      <div>
        <Link to="/pets/parrot">All parrots</Link>
      </div>
      <div>
        <Link to="/adoptions/new">List a pet for adoption</Link>
      </div>
    </div>
  )
}

export default NavBar