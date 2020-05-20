import React, { Component } from "react"
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCollapseHeader,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn,
  MDBInput,
} from "mdbreact"

import { Image } from "react-bootstrap"
import meme from "../assets/meme.jpeg"

class Materialcard extends Component {
  state = {
    collapseID: "collapse1",
  }

  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }))

  render() {
    return (
      <MDBContainer className="accordion md-accordion accordion-5">
        <MDBCard className="mb-4">
          <MDBCollapseHeader
            // put meme pic here
            onClick={this.toggleCollapse("collapse1")}
            className="p-0 z-depth-1"
            tag="h4"
            tagClassName="text-uppercase mb-0 d-flex justify-content-start align-items-center"
          >
            <div
              className="d-flex flex-column justify-content-center align-items-center mr-4"
              style={{ backgroundColor: "#fff", minWidth: "100px" }}
            >
              <Image src={meme} thumbnail="true" style={{ height: "8em" }} />
            </div>

            <div className="d-flex justify-content-end">
              <div className="p-2 col-example text-left">
                <p>Meme #1</p>
                <p>$230</p>
              </div>
              <div className="p-2 col-example text-left">
                <MDBBtn color="success">
                  <MDBIcon icon="shopping-basket" className="mr-1" />
                  Buy
                </MDBBtn>
                <MDBInput
                  label="Quantity"
                  icon="plus-circle"
                  size="sm"
                  style={{ width: "5em" }}
                />
              </div>
            </div>
          </MDBCollapseHeader>

          <MDBCollapse id="collapse1" isOpen={this.state.collapseID}>
            <MDBCardBody className="rgba-black-light white-text z-depth-1">
              <p className="p-md-4 mb-0">todo: gafico</p>
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
      </MDBContainer>
    )
  }
}

export default Materialcard
