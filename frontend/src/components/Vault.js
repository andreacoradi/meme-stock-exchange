import React from "react"
import ScrollTop from 'react-scrolltop-button';
// import MaterialCard from "./MaterialCard"
import { MemeList } from "./MemeList"
import { Searchbar } from "./Searchbar"

export const Vault = () => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center flex-grow-1 bd-highlight">
        {/* <Searchbar /> */}
        <p id="fillingSpace"></p>
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
      <ScrollTop />
    </div>
  )
}
