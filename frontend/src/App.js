import React, { Component } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

import { Home } from "./components/Home"
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
                  <Route exact path="/home" component={Home} />
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
