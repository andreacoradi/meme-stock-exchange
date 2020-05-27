// axios bad, fetch gud

const { REACT_APP_DBURI } = process.env
const userToken = localStorage.getItem("token") //  || REACT_APP_DEVTOKEN
const username = localStorage.getItem("username")

//  I hope somebody is gonna actually use this class ffs
//  All I need to do is to re-write this but using fetch
//  instead of axios
//                                    - cit

const fetchMarket = async (count, pageNumber) => {
  const URL = `${REACT_APP_DBURI}/memes?count=${count}&page=${pageNumber}`

  // console.log(URL)

  return await fetch(URL, {
    method: "GET",
    headers: {
      authorization: "Bearer " + userToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
}

//todo
const fetchOwned = async () => {
  const URL = `${REACT_APP_DBURI}/users/${username}/portfolio`

  // console.log(URL)

  return await fetch(URL, {
    method: "GET",
    headers: {
      authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      // console.log(response)
      return response.json()
    })
    .then((data) => {
      // console.log(data)
      return data.data
    })
  // todo
}

const fetchRanking = async (count) => {
  // todo
}

const fetchCoinsAmount = async () => {
  const URL = `${REACT_APP_DBURI}/users/${username}`
  return await fetch(URL, {
    method: "GET",
    headers: {
      authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      // console.log(response)
      return response.json()
    })
    .then((data) => {
      // console.log(data)
      return data.coins
    })
}

export async function Fetcher(type, count, pageNumber) {
  // console.log(`Qui parla fetcher: ${count}, ${type}, ${pageNumber}`)

  // type: "market"
  // type: "user_owned"
  // type: "ranking"

  // console.log(type, count)

  switch (type) {
    case "market":
      try {
        return await fetchMarket(count, pageNumber)
      } catch (error) {
        console.log(error)
      }
      break
    case "user_owned":
      try {
        return await fetchOwned()
      } catch (error) {
        console.log(error)
      }
      break
    case "ranking":
      try {
        return await fetchRanking(count)
      } catch (error) {
        console.log(error)
      }
      break

    case "coins":
      try {
        return await fetchCoinsAmount()
      } catch (error) {
        console.log(error)
      }
      break
    default:
      break
  }
}
