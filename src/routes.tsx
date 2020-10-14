import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from "./pages/Home"
import Champion from "./pages/Champion"

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/champion/:champion" component={Champion} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes