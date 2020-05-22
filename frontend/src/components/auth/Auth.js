import axios from "axios"

//  copypasted straight from another auth implementation:
//  Todo: registration, login is done actually :D
//  The big problem: auth is not global, it seems like every time its imported by other components a totally new instance is created.
//  This is dogshit and I don't want to store sensitive information in the state, let alone even using global shit with React.

const { REACT_APP_AUTH_LINK } = process.env

class Auth {
  constructor() {
    this.authenticated = false
    this.TOKEN = ""
    this.username = ""
  }

  login(credentials, cb, denyAccess) {
    let content = {
      username: credentials.username,
      password: credentials.password,
    }

    let url = `${REACT_APP_AUTH_LINK}/users/${credentials.username}`
    // console.log(url)

    axios({
      method: "post",
      url: url,
      data: content,
    })
      .then((response) => {
        return response.data
      })
      .then((response) => {
        console.log("RESPONSE RECEIVED", response)
        if (response.ok) {
          console.log(content.username, response.message)
          this.authenticated = true
          this.TOKEN = response.data // nome discutibile bro
          localStorage.setItem("token", this.TOKEN)
          this.username = content.username
          cb() // callback
        } else {
          denyAccess() // maybe redirect to a certain page
        }
      })
      // FIXME finisce qua se metti la password sbagliata...
      .catch((err) => console.log("AXIOS ERROR", err))
  }

  // todo
  signup(credentials, cb, somethingWrong) {
    let content = {
      username: credentials.username,
      password: credentials.password,
    }

    // let url = process.env.backend_address + "/users"
    let url = "auth url here"
    axios({
      method: "post",
      url: url,
      data: content,
      config: { headers: {} },
    })
      .then((response) => {
        return response.data
      }).then((response) => {
        console.log("RESPONSE RECEIVED", response)
        if (response.hashedPassword) {
          this.authenticated = true
          this.username = content.username
          cb()
        } else {
          somethingWrong()
        }
      })
      .catch((err) => console.log("AXIOS ERROR", err))
  }

  logout(cb) {
    this.authenticated = false
    localStorage.clear()
    cb()
  }

  isAuthenticated() {
    return this.authenticated
  }
}

export default new Auth()
