import React, { Component } from "react"
import { Materialcard } from "../components/MaterialCard"
import axios from "axios"
import auth from "../components/auth/Auth"

const { REACT_APP_DEVTOKEN, REACT_APP_DBURI } = process.env
const userToken = auth.TOKEN || REACT_APP_DEVTOKEN

export class MemeList extends Component {
  constructor() {
    super()
    this.state = { memesArray: [] }
  }

  async componentDidMount() {
    // todo fetch dal db
    await axios
      .get(REACT_APP_DBURI + "/memes", {
        headers: { authorization: "Bearer " + userToken },
      })
      .then((response) => {
        console.log(response)
        // meme list
        response.data.forEach((meme) => {
          const card = <Materialcard meme={meme} />
          this.state.memesArray.push(card)
          this.forceUpdate()
        })
      })
      .catch((error) => {
        console.log(error)
      })
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
