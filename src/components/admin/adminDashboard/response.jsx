import React, { Component } from "react";
import Dialogue from "./response-dialog";
class Response extends Component {
  state = {
    openDialogue: false,
    height: "0px",
    openAccordion: false,
    toggleButton: "close"
  };
  onClick = () => {
    this.props.syncHeight(this.state.height);
    this.setState({
      openDialogue: true,
    });
    console.log("open dialog", this.state.openDialogue);
  };
  handleToggle = () => {
    this.props.onClick();
    this.setState({
      toggleButton: this.state.toggleButton === "close" ? "open" : "close"
    });
  };
  render() {
    return (
      <div ref={divElement => (this.divElement = divElement)}>
        {this.state.openDialogue ? (
          <Dialogue open={this.state.openDialogue} response={this.props.res} />
        ) : (
          ""
        )}
        <div className="form-inline" style={{margin: "10px"}}></div>
        <input
          className="form m-2"
          style={{
            width: "72%",
            height: "38px",
            borderRadius: "5px",
            border: "1px solid #67e2eb",
            paddingLeft: "10px",
            backgroundColor: "white",
            color: "#8a8a8a"
          }}
          type="text"
          value={this.props.res}
          disabled
        />
        <i
          className="fas fa-pen fa-lg info-text ml-2"
          onClick={this.onClick}
        ></i>
        <label
          className="ml-2"
          style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}
        >
          X
        </label>
        <i
          className={`fas fa-${
            this.state.toggleButton === "close" ? "plus" : "minus"
          }-circle primary-color-text ml-2`}
          onClick={this.handleToggle}
        ></i>
      </div>
    );
  }
  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height: height });
  }
}
export default Response;
