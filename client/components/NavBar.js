import React from "react"
import { Link } from "react-router-dom"

const NavBar = props => {
  return (
    <div data-sticky-container>
      <div className="title-bar align-center" data-sticky id="nav" data-options="marginTop:0;">
          <Link to="/pets">List of pet types</Link>
          <Link to="/pets/cat">All cats</Link>
          <Link to="/pets/dog">All dogs</Link>
          <Link to="/pets/parrot">All parrots</Link>
          <Link to="/adoptions/new">List a pet for adoption</Link>
      </div>
    </div>
  )
}

export default NavBar