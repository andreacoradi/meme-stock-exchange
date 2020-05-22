import React, { Component } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  // Redirect,
} from "react-router-dom"

import { Market } from "./components/Market"
import Login from "./components/Login"
import { Ranking } from "./components/Ranking"
import { NavigationBar } from "./components/NavigationBar"
import { Layout } from "./components/Layout"

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
                  <Route default path="/market" component={Market} />
                  <Route default path="/ranking" component={Ranking} />
                  <Route default path="/login" component={Login} />
                  <Redirect from="/" to="/market" />
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
