import React from "react"
// import MaterialCard from "./MaterialCard"
import { MemeList } from "./MemeList"
import { Searchbar } from "./Searchbar"

export const Market = () => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center flex-grow-1 bd-highlight">
        <Searchbar />
      </div>
      <div className="p-1">
        <MemeList />
      </div>
    </div>
  )
}
