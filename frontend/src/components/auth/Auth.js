const { REACT_APP_AUTH_LINK } = process.env

class Auth {
  login(credentials, cb, denyAccess) {
    let content = {
      username: credentials.username,
      password: credentials.password,
    }

    let url = `${REACT_APP_AUTH_LINK}/users/${credentials.username}`
    // console.log(url)
    console.log(content)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(content),
    })
      .then((r) => r.json())
      .then((body) => {
        console.log(body)
        if (body.ok) {
          console.log(content.username, body.message)
          localStorage.setItem('token', body.data)
          localStorage.setItem('username', content.username)
          cb()
        } else {
          console.error('Sfigato', body.message)
          denyAccess()
        }
      })
  }

  signup(credentials, cb, somethingWrong) {
    let content = {
      username: credentials.username,
      password: credentials.password,
    }
    let url = `${REACT_APP_AUTH_LINK}/users`
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(content),
    })
      .then((r) => r.json())
      .then((body) => {
        console.log(body)
        if (body.ok) {
          console.log('All my niggas use fetchfetchgo')
          this.login(credentials, cb, somethingWrong)
        } else {
          somethingWrong(body.message.charAt(0).toUpperCase() + body.message.slice(1))
        }
      })
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
