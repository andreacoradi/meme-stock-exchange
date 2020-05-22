import React, { useState } from "react"
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"
import "./style/Login.css"
import auth from "./auth/Auth"

export default function Login(props) {
  //   const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  function validateForm() {
    return username.length > 0 && password.length > 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    let credentials = { username: username, password: password }
    auth.login(
      credentials,
      () => {
        props.history.push("/home")
      },
      () => {
        console.log("Wrong credentials")
        alert("Credenziali errate, prego riprovare")
      }
    )
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        {/* <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup> */}
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup>
          <Button
            block
            disabled={!validateForm()}
            type="submit"
            variant="secondary"
          >
            Login
          </Button>
          <Button
            block
            variant="secondary"
            onClick={() => {
              props.history.push("/signup")
            }}
          >
            Sign Up
          </Button>
        </FormGroup>
      </form>
    </div>
  )
}
