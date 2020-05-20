import React from "react"
import { MDBCol, MDBIcon, MDBFormInline } from "mdbreact"

export const Searchbar = () => {
  return (
    <MDBFormInline className="md-form">
      <MDBIcon icon="search" />
      <input
        className="form-control form-control-sm ml-3 w-75"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
    </MDBFormInline>
  )
}
