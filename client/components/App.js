import React, { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom"

import PetTypesList from "./PetTypesList"
import AdoptablePetsList from "./AdoptablePetsList"
import NavBar from "./NavBar"

const App = props => {
  useEffect(() => {
    $(document).foundation()
  }, [])
  return (
    <BrowserRouter>
      <NavBar />
    <Switch>
      <Route exact path="/">
        <Redirect to="/pets" />
      </Route>
      <Route exact path="/pets" component={PetTypesList} ></Route>
      <Route exact path="/pets/:petType" component={AdoptablePetsList}></Route>
    </Switch>
    </BrowserRouter>
  )
}
export default hot(App)