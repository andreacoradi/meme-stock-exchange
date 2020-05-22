import React from "react"
import axios from "axios"
import Auth from "./auth/Auth"

const { REACT_APP_DEVTOKEN, REACT_APP_DBURI } = process.env
const userToken = auth.TOKEN || REACT_APP_DEVTOKEN
let memesArray = []

const fetchMarket = async (count) => {
  memesArray = []
  await axios
    .get(`${REACT_APP_DBURI}/memes?count=${count}`, {
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
    .then((response) => {
      console.log(response)
      // meme list
      response.data.forEach((meme) => {
        const card = <Materialcard meme={meme} key={Date.now()} />
        memesArray.push(card)
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
    .get(`${REACT_APP_DBURI}/memes?count=${count}`, {
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
    .then((response) => {
      console.log(response)
      // meme list
      response.data.forEach((meme) => {
        const card = <Materialcard meme={meme} key={Date.now()} />
        memesArray.push(card)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

//todo
const fetchRanking = async () => {
  memesArray = []
  await axios
    .get(`${REACT_APP_DBURI}/memes?count=${count}`, {
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
    .then((response) => {
      console.log(response)
      // meme list
      response.data.forEach((meme) => {
        const card = <Materialcard meme={meme} key={Date.now()} />
        memesArray.push(card)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export function Fetcher(type) {
  // type: "market"
  // type: "user_owned"
  // type: "ranking"

  switch (type) {
    case "market":
      fetchMarket(10).then(() => {
        return memesArray
      })
      break
    case "user_owned":
      fetchOwned().then(() => {
        return memesArray
      })
      break
    case "ranking":
      fetchRanking().then(() => {
        return memesArray
      })
      break
  }
}
