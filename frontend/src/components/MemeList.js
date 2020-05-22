import React, { Component } from "react"
import { Materialcard } from "../components/MaterialCard"
import axios from "axios"
import Auth from "../components/auth/Auth"
// import memesJSON from "../assets/memes.json"

const { REACT_APP_DEVTOKEN, REACT_APP_DBURI } = process.env

export class MemeList extends Component {
  constructor() {
    super()
    this.userToken = localStorage.getItem("token") || REACT_APP_DEVTOKEN
    console.log(this.userToken);
    this.state = { memesArray: [] }
  }

  // fetcher -> memelist -> several materialcards

  async componentDidMount() {
    // todo fetch dal db
    await axios
      .get(REACT_APP_DBURI + "/memes?count=10", {
        headers: {
          authorization: "Bearer " + this.userToken,
        },
      })
      .then((response) => {
        console.log(response)
        // meme list
        response.data.forEach((meme) => {
          const card = <Materialcard meme={meme} key={Date.now()} />
          this.state.memesArray.push(card)
          this.forceUpdate()
        })
      })
      .catch((error) => {
        console.log(error)
      })
    // only for testing since I have CORS troubles
    //   memesJSON.forEach((meme) => {
    //     const card = <Materialcard meme={meme} key={Date.now()} />
    //     this.state.memesArray.push(card)
    //     this.forceUpdate()
    //   })
  }

  /*

  Example of a meme object

  {
    "name": "t3_gnhraa",
    "title": "Im not wrong",
    "url": "https://i.redd.it/sf9xxljoyyz41.jpg",
    "subreddit": "dankmemes",
    "score": 1,
    "archived": 0,
    "created_at": 1590001974
  },


  */

  render() {
    const memesList = this.state.memesArray
    if (memesList.length === 0) {
      return null
    }
    return (
      <div>
        {memesList.map((meme) => {
          return meme
        })}
      </div>
    )
  }
}
