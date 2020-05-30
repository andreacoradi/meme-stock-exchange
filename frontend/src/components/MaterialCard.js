import React, { Component } from "react"
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBInput,
  MDBMedia,
  MDBCardFooter,
  MDBCardHeader,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTooltip,
} from "mdbreact"
import numeral from "numeral"

import "./style/MemeCard.css"
import Exchange from "./Exchange"

export class Materialcard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapseID: "",
      showModal: false,
      quantity: 0,
      showSellButton: props.action === "sell",
    }

    // let sellButton : props.action == ""
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
    let media = (
      <MDBMedia
        className="mx-auto align-items-center"
        object
        src={this.props.meme.url}
        onClick={this.toggleModal(this.state.showModal)}
        style={{ maxWidth: "100%", maxHeight: "auto" }}
      />
    )

    if (this.props.meme.url.endsWith(".mp4")) {
      media = (
        <video
          src={this.props.meme.url}
          controls
          autoPlay
          loop
          style={{ maxWidth: "100%" }}
        />
      )
    }

    // Buttons
    let sellBtn
    let actionsBtn
    let scoreBtn = (
      <MDBBtn className="z-depth-0 bg-success">{numeral(this.props.meme.score).format("($ 0a)")}</MDBBtn>
    )

    if (this.props.sell) {
      sellBtn = (
        <MDBBtn // invisible sell
          color="red text-white"
          disabled={
            this.state.quantity <= 0 || this.state.quantity === undefined
          }
          onClick={
            () => {
              Exchange.transaction(
                "sell", // either "buy" or "sell"
                this.props.meme.name, // memeID
                this.state.quantity // how many memes the user wants
              )
            }
            // refresh memes
          }
        >
          <MDBIcon icon="shopping-basket" className="mr-1" />
          Sell
        </MDBBtn>
      )

      const totalValue = parseInt(this.props.meme.score) * parseInt(this.props.meme.quantita)
      const initialValue = this.props.meme.coin_investiti / this.props.meme.quantita
      const percent = ((this.props.meme.score - (initialValue)) / initialValue) * 100 // (totalValue - this.props.meme.coin_investiti) / 100
      let color = "bg-success"
      if (totalValue === this.props.meme.coin_investiti) color = "bg-warning"
      else if (totalValue < this.props.meme.coin_investiti) color = "bg-danger"

      scoreBtn = <MDBBtn className={color}>{numeral(totalValue).format("($ 0a)")} ({(percent > 0 ? "+" : "-")}{numeral(percent).format("0.0a")}%)</MDBBtn>
      actionsBtn = (
        <MDBTooltip placement="bottom">
          <MDBBtn className="bg-info">{numeral(this.props.meme.quantita).format("0a")} azioni</MDBBtn>
          <span>{this.props.meme.quantita}</span>
        </MDBTooltip>
      )
    }

    return (
      <div>
        <MDBModal
          centered
          isOpen={this.state.showModal}
          toggle={this.toggleModal(this.state.showModal)}
        >
          <MDBModalHeader>{this.props.meme.title}</MDBModalHeader>
          <MDBModalBody>
            <MDBMedia object src={this.props.meme.url} thumbnail={true} />
          </MDBModalBody>
        </MDBModal>

        <MDBCard className="mx-auto mb-5 text-center">
          <MDBCardHeader>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-left">
                {scoreBtn}
              </div>
              <div className="d-flex align-items-center">
                {this.props.meme.title.length < 25
                  ? this.props.meme.title
                  : this.props.meme.title.substring(0, 24) + "..."}
              </div>
              <div className="d-flex align-items-right">
                {/* ADD TOOLTIP */}
                {actionsBtn}
              </div>
            </div>
          </MDBCardHeader>
          <MDBCardBody>
            <div className="d-flex flex-row">
              <div className="d-flex justify-content-center">{media}</div>
            </div>
          </MDBCardBody>

          <MDBCardFooter small={true}>
            <div className="d-flex justify-content-around align-items-center">
              <div id="buttons">
                <MDBInput
                  label="Quantity"
                  // icon='plus-circle'
                  size="sm"
                  type="number"
                  min="0"
                  onChange={(e) => {
                    this.setQuantity(e.target.value)
                  }}
                />
              </div>
              <div id="buttons">
                <MDBBtn // buy
                  color="success"
                  disabled={
                    this.state.quantity <= 0 ||
                    this.state.quantity === undefined
                    || this.props.meme.score <= 0
                  }
                  onClick={() => {
                    Exchange.transaction(
                      "buy", // either "buy" or "sell"
                      this.props.meme.name, // memeID
                      this.state.quantity // how many memes the user wants
                    )
                  }}
                >
                  <MDBIcon icon="shopping-basket" className="mr-1" />
                  Buy
                </MDBBtn>
                {sellBtn}
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
