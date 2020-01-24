import React, { Component } from "react";
import "../Bot/css/triangle.css";
class Triangle extends Component {
  style = {
    width: 0,
    height: 0,
    borderTop: "35px solid transparent",
    borderLeft: "35px solid indigo"
    // [`border${
    //   this.props.direction === "right" ? "Left" : "Right"
    // }`]: `35px solid ${this.props.color}`
  };
  render() {
    return <div className="trianglex" style={this.style}></div>;
  }
}
export default Triangle;
