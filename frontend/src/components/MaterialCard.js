import React, { Component } from "react"
import {
  MDBCard,
  // MDBCardTitle,
  // MDBCardText,
  MDBCardBody,
  // MDBCollapseHeader,
  // MDBContainer,
  MDBIcon,
  // MDBCollapse,
  MDBBtn,
  MDBInput,
  // MDBCardImage,
  // MDBCardTitle,
  // MDBView,
  MDBMedia,
  MDBCardFooter,
  MDBCardHeader,
  // MDBCardText,
  MDBModal,
  MDBModalBody,
} from "mdbreact"

import Exchange from "./Exchange"

export class Materialcard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapseID: "",
      showModal: false,
      quantity: "",
    }
  }

  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }))

  toggleModal = (showModal) => () =>
    this.setState((prevState) => ({
      showModal: prevState.showModal === true ? false : true,
    }))

  setQuantity = (value) => {
    if (Number.isInteger(parseInt(value))) {
      this.setState({ quantity: value })
    }
  }

  render() {
    return (
      <div>
        <MDBModal
          centered
          isOpen={this.state.showModal}
          toggle={this.toggleModal(this.state.showModal)}
        >
          <MDBModalBody>
            <MDBMedia object src={this.props.meme.url} thumbnail="true" />
          </MDBModalBody>
        </MDBModal>

        <MDBCard className="mb-4" style={{ width: "77vmin" }}>
          <MDBCardHeader>
            <div className="d-flex justify-content-between">
              <MDBBtn className="z-depth-0">{this.props.meme.score}</MDBBtn>
              <div className="d-flex align-items-center">
                {this.props.meme.title}
              </div>
              <div id="blankSpaceDontRemoveMe"></div>
            </div>
          </MDBCardHeader>
          <MDBCardBody>
            <div className="d-flex flex-row">
              <div className="d-flex justify-content-center">
                <MDBMedia
                  object
                  src={this.props.meme.url}
                  onClick={this.toggleModal(this.state.showModal)}
                  style={{ "max-width": "50vmin" }}
                />
              </div>
            </div>
          </MDBCardBody>

          <MDBCardFooter small={true}>
            <div
              className="d-flex justify-content-around align-items-center"
              style={{ height: "4vh" }}
            >
              <div id="buttons">
                <MDBInput
                  label="Quantity"
                  icon="plus-circle"
                  size="sm"
                  type="number"
                  min="0"
                  style={{ width: "6em" }}
                  onChange={(e) => {
                    this.setQuantity(e.target.value)
                  }}
                />
              </div>
              <div id="buttons">
                <MDBBtn
                  color="success"
                  disabled={
                    this.state.quantity === "" || this.state.quantity === "0"
                  }
                  onClick={() =>
                    Exchange.transaction(
                      this.props.action, // either "buy" or "sell"
                      this.props.meme.name, // memeID
                      this.state.quantity // how many memes the user wants
                    )
                  }
                >
                  <MDBIcon icon="shopping-basket" className="mr-1" />
                  {this.props.action}
                </MDBBtn>
              </div>
            </div>
          </MDBCardFooter>
        </MDBCard>

        {/* <MDBContainer className="accordion md-accordion accordion-5">
          <MDBCard>
            <div className="d-flex justify-content-start">
              <div className="p-2 col-example text-left">
                <Image
                  src={this.props.meme.url}
                  thumbnail="true"
                  style={{ "max-width": "4rem", "max-heigt": "4rem" }}
                  onClick={this.toggleModal(this.state.showModal)}
                />
              </div>
              <div className="p-2 col-example text-left">
                <MDBCardBody className="rgba-black-light white-text z-depth-1">
                  <h4>Value: {this.props.meme.score}</h4>
                  <MDBBtn
                    color="success"
                    disabled={this.state.quantity === 0}
                    onClick={() =>
                      Exchange.transaction(
                        this.props.action, // either "buy" or "sell"
                        this.props.meme.name, // memeID
                        this.state.quantity // how many memes the user wants
                      )
                    }
                  >
                    <MDBIcon icon="shopping-basket" className="mr-1" />
                    {this.props.action}
                  </MDBBtn>
                  <MDBInput
                    label="Quantity"
                    icon="plus-circle"
                    size="sm"
                    style={{ width: "5em" }}
                    onChange={(e) => this.setQuantity(e.target.value)}
                  />
                </MDBCardBody>
              </div>
            </div>
          </MDBCard>
        </MDBContainer> */}
      </div>
    )
  }
}
