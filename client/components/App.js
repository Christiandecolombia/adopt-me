import React, { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"

import PetTypesList from "./PetTypesList"

const App = props => {
  useEffect(() => {
    $(document).foundation()
  }, [])
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/pets" />
        </Route>
        <Route path="/pets" component={PetTypesList} ></Route>
      </Switch>
    </BrowserRouter>
  )
}
export default hot(App)