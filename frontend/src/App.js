import React, { Component } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from "react-router-dom"

import { Market } from "./components/Market"
import Login from "./components/Login"
import { Ranking } from "./components/Ranking"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { NavigationBar } from "./components/NavigationBar"
import { Vault } from "./components/Vault"
import { Layout } from "./components/Layout"
import { NoMatch } from "./components/NoMatch"

class App extends Component {
  render() {
    return (
      <div className="dinamic-container">
        <div className="wrapper">
          <React.Fragment>
            <Router>
              <NavigationBar />
              <Layout>
                <Switch>
                  <Route exact path="/" component={Market} />
                  <Route path="/login" component={Login} />
                  <ProtectedRoute path="/vault" component={Vault} />
                  <Route path="/market" component={Market} />
                  <Route path="/ranking" component={Ranking} />
                  <Route component={NoMatch} />
                </Switch>
              </Layout>
            </Router>
          </React.Fragment>
        </div>
        <div className="stickyfooter">{/* <FooterPage /> */}</div>
      </div>
    )
  }
}

export default App
