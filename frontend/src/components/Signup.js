import React, { useState } from "react"
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"
import "./style/Login.css"
import Auth from "./auth/Auth"

export default function Signup(props) {
  //   const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")

  function validateForm() {
    return (
      username.length > 0 && password.length > 0 && password === confirmPassword
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
    let credentials = { username: username, password: password }
    Auth.signup(
      credentials,
      () => {
        props.history.push("/market")
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
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        {/* <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <FormGroup controlId="passwordConfirm">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Register
        </Button>
      </form>
    </div>
  )
}
