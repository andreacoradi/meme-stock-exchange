import React, { Component } from 'react'
import { Fetcher } from './Fetcher'
import { Materialcard } from '../components/MaterialCard'
// import memesJSON from "../assets/memes.json"

export class MemeList extends Component {
  constructor(props) {
    super(props)
    this.userToken = localStorage.getItem('token') // || REACT_APP_DEVTOKEN
    // console.log(this.userToken)
    this.state = { memesArray: [] }
  }

  // fetcher -> memelist -> several materialcards

  async componentDidMount() {
    const result = await Fetcher(this.props.requestType, this.props.count)

    result.forEach((meme) => {
      const card = <Materialcard meme={meme} key={Date.now()} />
      this.state.memesArray.push(card)
      this.forceUpdate()
    })

    // only for testing since I have CORS troubles
    // memesJSON.forEach((meme) => {
    //   const card = <Materialcard meme={meme} key={Date.now()} />
    //   this.state.memesArray.push(card)
    //   this.forceUpdate()
    // })
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
