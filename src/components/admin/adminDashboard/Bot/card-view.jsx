import React, { Component } from "react";
import Dialogue from "./response-dialog";
import "./css/card.css";

export default class Card extends Component {
  state = {
    openDialogue: false,
    height: "0px",
    openAccordion: false,
    toggleButton: "close",
    options: "none"
  };
  onClick = () => {
    this.props.syncHeight(this.state.height);
    this.setState({
      openDialogue: true,
      toggleButton: this.state.toggleButton === "close" ? "open" : "close"
    });
  };
  handleToggle = () => {
    this.props.syncHeight(this.state.height);
    this.props.onClick();
    this.setState({
      toggleButton: this.state.toggleButton === "close" ? "open" : "close"
    });
  };
  showContent = event => {
    this.setState({ options: "inline" });
  };
  hideContent = event => {
    this.setState({ options: "none" });
  };
  render() {
    return (
      <div
        ref={divElement => (this.divElement = divElement)}
        className="card"
        style={{
          width: "fit-content",
          borderRadius: "5px",
          backgroundColor: "#edeff0",
          transition: "max-width 0.6s ease"
        }}
        onMouseOver={this.showContent}
        onMouseOut={this.hideContent}
        onClick={this.props.onClick}
      >
        {this.state.openDialogue ? (
          <Dialogue open={this.state.openDialogue} response={this.props.res} />
        ) : (
          ""
        )}
        <div className="card-body pt-1 pb-1">
          <div className="row" style={{}}>
            <div className="col-20" style={{ margin: "10px" }}>
              <p
                className="card-text m-0"
                style={{
                  maxWidth: "100ch",
                  color: "#525252",
                  fontSize: "16px",
                  textOverflow: "ellipses",
                  overflow: "hidden",
                  whiteSpace: "nowrap"
                }}
              >
                {this.props.res}
              </p>
            </div>
            <div className="ml-5" style={{ display: this.state.options }}>
              <i className="fas fa-pen m-1" onClick={this.onClick}></i>
              <i className="far fa-trash-alt m-1"></i>
              <i className="fas fa-plus m-1" onClick={this.handleToggle}></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height: height });
  }
}
