import React, { useRef, useState, useEffect, useCallback } from "react"
import { Redirect, useHistory } from "react-router-dom"
import ScrollTop from 'react-scrolltop-button';

import { Fetcher } from "./Fetcher"
import { Materialcard } from "../components/MaterialCard"

export function MemeList(props) {
  const [pageNumber, setPageNumber] = useState(0)
  const [memesArray, setMemesArray] = useState([])
  // const [lastItem, setlastItem] = useState(null)

  let history = useHistory()


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
      <ScrollTop />;
    </div>
  )
}