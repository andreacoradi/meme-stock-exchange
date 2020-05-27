import React from "react"
// import MaterialCard from "./MaterialCard"
import { MemeList } from "./MemeList"
import { Searchbar } from "./Searchbar"
import { Fetcher } from "./Fetcher"

export const Vault = () => {
  // const moneyCount = async () => await Fetcher("coins")

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center flex-grow-1 bd-highlight">
        <Searchbar />
        {/* {moneyCount} */}
      </div>
      <div className="d-flex justify-content-center">
        <MemeList
          requestType="user_owned"
          count=""
          scroll={false}
          sell={true}
        />
      </div>
    </div>
  )
}
