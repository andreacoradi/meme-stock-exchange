// import React from "react"
import axios from "axios"
import Auth from "./auth/Auth"

const { REACT_APP_DEVTOKEN, REACT_APP_DBURI } = process.env
const userToken = Auth.TOKEN || REACT_APP_DEVTOKEN
let memesArray = []
let rankedUsers = []
let ownedArray = []

const fetchMarket = async (count) => {
  memesArray = []
  await axios
    .get(`${REACT_APP_DBURI}/memes?count=${count}`, {
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
    .then((response) => {
      // console.log(response)
      // meme list
      response.data.forEach((meme) => {
        memesArray.push(meme)

        // {
        //   "name": "t3_gp06l9",
        //   "title": "You wanna know how I got these scars?",
        //   "url": "https://i.redd.it/krok4yn5lg051.jpg",
        //   "subreddit": "dankmemes",
        //   "score": 2,
        //   "archived": 0,
        //   "created_at": 1590215348
        // }
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

//todo
const fetchOwned = async () => {
  memesArray = []
  await axios
    .get(`${REACT_APP_DBURI}/users/${Auth.username}/portfolio`, {
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
    .then((response) => {
      console.log(response)
      // meme list
      response.data.forEach((meme) => {
        ownedArray.push(meme)

        // {
        //   "quantita": 1,
        //   "name": "t3_gnhnug",
        //   "valore_meme": 9,
        //   "data_acquisto": "2020-05-22T09:52:48.000Z",
        //   "title": "WE ARE COMEDY",
        //   "url": "https://i.redd.it/3abaeluixyz41.png",
        //   "score": 56,
        //   "subreddit": "dankmemes"
        // }
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

const fetchRanking = async (count) => {
  rankedUsers = []
  await axios
    .get(`${REACT_APP_DBURI}/users?count=${count}`, {
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
    .then((response) => {
      console.log(response)
      // meme list
      response.data.forEach((user) => {
        rankedUsers.push(user)
        // {
        //   "username": "acoradi",
        //   "coins": 325
        // }
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export function Fetcher(type, count) {
  // type: "market"
  // type: "user_owned"
  // type: "ranking"

  switch (type) {
    case "market":
      fetchMarket(count).then(() => {
        return memesArray
      })
      break
    case "user_owned":
      fetchOwned().then(() => {
        return ownedArray
      })
      break
    case "ranking":
      fetchRanking(count).then(() => {
        return rankedUsers
      })
      break
    default:
      break
  }
}
