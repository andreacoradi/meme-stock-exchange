import React, { Component } from "react"
import { Materialcard } from "./components/Materialcard"
import axios from "axios"

export class ArticleList extends Component {
  constructor() {
    super()
    this.state = { memes: [] }
  }

  async componentDidMount() {
    // todo fetch dal db
  }

  render() {
    const memes = this.state.memes
    if (memes.length === 0) {
      return null
    }
    return (
      <div>
        {memes.map((article) => {
          return article
        })}
      </div>
    )
  }
}
