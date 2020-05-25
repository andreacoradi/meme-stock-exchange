const UserToken = localStorage.getItem("token")

const { REACT_APP_DBURI } = process.env

class Exchange {
  // action = "buy" || "sell"
  static transaction(action, memeID, count) {
    console.log(action, memeID, count)

    const URL = `${REACT_APP_DBURI}/memes/${memeID}`
    if (action !== "buy" && action !== "sell") {
      console.log("Can't complete transaction")
      alert("Can't complete transaction")
      return false
    }
    let error = false
    fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + UserToken,
      },
      body: JSON.stringify({
        action: action,
        quantity: count,
      }),
    })
      .then((r) => {
        // console.log(r)
        error = !r.ok
        return r.json()
      })
      .then((body) => {
        // console.log(body)
        if (error) {
          alert(body.message)
        } else {
          alert("Transaction succesful")
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export default Exchange
