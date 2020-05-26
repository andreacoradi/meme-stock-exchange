import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { Market } from './components/Market'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { Ranking } from './components/Ranking'
import { ProtectedRoute } from './components/ProtectedRoute'
import { NavigationBar } from './components/NavigationBar'
import { Vault } from './components/Vault'
import { Layout } from './components/Layout'
import { NoMatch } from './components/NoMatch'
import { StoreProvider, createStore } from 'easy-peasy'
import model from './components/Model'

const store = createStore(model)

export function App() {
  return (
    <StoreProvider store={store}>
      <div className='dinamic-container'>
        <div className='wrapper'>
          <React.Fragment>
            <Router>
              <NavigationBar />
              <Layout>
                <Switch>
                  <Route exact path='/'>
                    <Redirect to='/market' />
                  </Route>
                  <Route path='/login' component={Login} />
                  <Route path='/signup' component={Signup} />
                  <ProtectedRoute path='/vault' component={Vault} />
                  <ProtectedRoute path='/market' component={Market} />
                  <ProtectedRoute path='/ranking' component={Ranking} />
                  <Route component={NoMatch} />
                </Switch>
              </Layout>
            </Router>
          </React.Fragment>
        </div>
        {/* <div className='stickyfooter'><FooterPage /></div> */}
      </div>
    </StoreProvider>
  )
}

export default App
