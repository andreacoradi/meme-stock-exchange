import React from "react"
// import MaterialCard from "./MaterialCard"
import { MemeList } from "./MemeList"
import { Searchbar } from "./Searchbar"

export const Home = () => {
  return (
    <div className="d-flex flex-column">
      <div className="p-1">
        <Searchbar />
      </div>
      <div className="p-1">
        <MemeList />
      </div>
    </div>
  )
}
