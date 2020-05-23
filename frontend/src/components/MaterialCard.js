import React, { Component } from "react"
import {
  MDBCard,
  // MDBCardTitle,
  // MDBCardText,
  MDBCardBody,
  MDBCollapseHeader,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn,
  MDBInput,
} from "mdbreact"

import { Image, Modal } from "react-bootstrap"

// todo: fixa il modale

export class Materialcard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapseID: "",
      showModal: false,
    }
  }

  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }))

  toggleModal = (showModal) => () =>
    this.setState((prevState) => ({
      showModal: prevState.showModal !== true ? true : false,
    }))

  render() {
    return (
      <div>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showModal}
          onHide={this.toggleModal(this.state.showModal)}
        >
          <Modal.Body>
            <Image src={this.props.meme.url} thumbnail="true" />
          </Modal.Body>
        </Modal>

        <MDBContainer className="accordion md-accordion accordion-5">
          <MDBCard className="mb-4">
            <MDBCollapseHeader className="p-0 z-depth-1" tag="h4">
              <div className="d-flex flex-column align-content-around">
                <MDBIcon far icon="caret-square-down" />
                {/* <div
                  className="d-flex flex-column"
                  style={{ minWidth: "2em" }}
                ></div> */}
                {/* <div className="p-2 mr-auto">{this.props.meme.score}</div> */}
                <div className="justify-content-between">
                  {this.props.meme.score}
                  {this.props.meme.title}
                </div>
                <Image
                  src={this.props.meme.url}
                  thumbnail="true"
                  style={{ "max-width": "30vh" }}
                  onClick={this.toggleModal(this.state.showModal)}
                />
              </div>
            </MDBCollapseHeader>

            <MDBCollapse id="collapse" isOpen={this.state.collapseID}>
              <MDBCardBody className="rgba-black-light white-text z-depth-1">
                <div className="d-flex justify-content-around">
                  <div className="flex-fill p-2 align-content-center">
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
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>
        </MDBContainer>
      </div>
    )
  }
}
