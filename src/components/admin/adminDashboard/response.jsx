import React, { Component } from "react";
import Dialogue from "./response-dialog";
class Response extends Component {
  state = {
    openDialogue: false,
    height: "0px"
  };
  onClick = () => {
    this.props.syncHeight(this.state.height);
    setTimeout(() => {
      this.setState({
        openDialogue: true
      });
      console.log("open dialog", this.state.openDialogue);
    }, 10);
  };
  render() {
    return (
      <div ref={divElement => (this.divElement = divElement)}>
        {this.state.openDialogue ? (
          <Dialogue
            open={this.state.openDialogue}
            response={this.props.res}
          />
        ) : (
          ""
        )}
        <div className="form-inline"></div>
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
          className="fas fa-pen fa-lg cyan-text ml-2"
          onClick={this.onClick}
        ></i>
        <i className="fas fa-minus-circle red-text ml-2"></i>
        <i
          className="fas fa-plus-circle green-text ml-2"
          onClick={this.props.onClick}
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
