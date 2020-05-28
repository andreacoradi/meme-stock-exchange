import React, { useRef, useState, useEffect, useCallback } from "react"
import { Redirect, useHistory } from "react-router-dom"

import { Fetcher } from "./Fetcher"
import { Materialcard } from "../components/MaterialCard"
// import memesJSON from "../assets/memes.json"

//  todo: sometimes it load 100+ memes instead of 10
//  I hope its backend related. :D

export function MemeList(props) {
  const [pageNumber, setPageNumber] = useState(0)
  const [memesArray, setMemesArray] = useState([])
  // const [lastItem, setlastItem] = useState(null)

  let history = useHistory()

  // const observer = useRef(
  //   new IntersectionObserver((entries) => {
  //     const first = entries[0]
  //     if (first.isIntersecting) setPageNumber(pageNumber + 1)
  //   })
  // )

  const observer = useRef()

  const ultimoMeme = useCallback((node) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      //console.log(entries);
      if (entries[0].isIntersecting) {
        setPageNumber(pageNumber + 1)
        //console.log("VISIBLE", pageNumber)
      }
    }, [])
    //console.log(node);
    if (node) observer.current.observe(node)
  })

  // useEffect(() => {
  //   const currentElement = lastItem
  //   const currentObserver = observer.current

  //   if (currentElement) {
  //     currentObserver.observe(currentElement)
  //   }

  //   return () => {
  //     if (currentElement) {
  //       currentObserver.unobserve(currentElement)
  //     }
  //   }
  // }, [lastItem])

  useEffect(() => {
    async function fetchData() {
      console.log(`Filling ${props.count} memes, we are at page ${pageNumber}`)
      const newResults = await Fetcher(
        props.requestType,
        props.count,
        pageNumber
      )
      // console.log(newResults.length);
      if (newResults === undefined) {
        console.log("No vez, logga", memesArray.length)
        // localStorage.clear
        history.push("/login")
      } else if (newResults.length === 0) {
        // <h3>Vai su market a comprare qualche meme ;)</h3>
      }
      setMemesArray(memesArray.concat(newResults))
      //setMemesArray(m => [...m, newResults])
    }
    fetchData()
  }, [pageNumber])

  return (
    <div>
      {memesArray.map((meme, index) => {
        if (!meme.url) return <Redirect to="/login" />

        if (meme.url.endsWith(".gifv")) {
          meme.url = meme.url.replace(".gifv", ".mp4")
        }

        if (memesArray.length === index + 1 && props.scroll) {
          return (
            <div ref={ultimoMeme} key={meme.url}>
              <Materialcard
                key={meme.url}
                meme={meme}
                action="buy"
                sell={props.sell}
              />
            </div>
          )
        } else
          return (
            <Materialcard
              meme={meme}
              action="buy"
              key={meme.url}
              sell={props.sell}
            />
          )
      })}
    </div>
  )
}

// export class MemeList extends Component {
//   constructor(props) {
//     super(props)
//     this.userToken = localStorage.getItem('token') // || REACT_APP_DEVTOKEN
//     // console.log(this.userToken)
//     this.state = { memesArray: [] }
//   }

//   // fetcher -> memelist -> several materialcards

//   async componentDidMount() {
//     const result = await Fetcher(
//       this.props.requestType,
//       this.props.count,
//       this.state.pageNumber
//     )

//     result.forEach((meme) => {
//       // const card = <Materialcard meme={meme} action='buy' key={Date.now()} />
//       this.state.memesArray.push(meme)
//       this.forceUpdate()
//     })

//     // only for testing since I have CORS troubles
//     // memesJSON.forEach((meme) => {
//     //   const card = <Materialcard meme={meme} key={Date.now()} />
//     //   this.state.memesArray.push(card)
//     //   this.forceUpdate()
//     // })
//   }

//   /*

//   Example of a meme object

//   {
//     "name": "t3_gnhraa",
//     "title": "Im not wrong",
//     "url": "https://i.redd.it/sf9xxljoyyz41.jpg",
//     "subreddit": "dankmemes",
//     "score": 1,
//     "archived": 0,
//     "created_at": 1590001974
//   },

//   */

//   render() {
//     const memesList = this.state.memesArray
//     if (memesList.length === 0) {
//       return null
//     }
//     return (
//       <div>
//         {memesList.map((meme, index) => {
//           if (meme.length === index + 1) {
//             return (
//               <Materialcard
//                 ref={this.lastMemeReference}
//                 meme={meme}
//                 action='buy'
//                 key={Date.now()}
//               />
//             )
//           } else
//             return <Materialcard meme={meme} action='buy' key={Date.now()} />
//         })}
//       </div>
//     )
//   }
// }
