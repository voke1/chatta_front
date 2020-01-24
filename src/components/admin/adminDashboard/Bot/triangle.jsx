import React, { Component } from "react";
import "../Bot/css/triangle.css";
class Triangle extends Component {
  size = this.props.size || "35px";
  style = {
    width: 0,
    height: 0,
    borderTop: `${this.size} solid transparent`,
    [`border${
      this.props.direction === "right" ? "Left" : "Right"
    }`]: `${this.size} solid ${this.props.color}`
  };
  render() {
    return <div className="trianglex" style={this.style}></div>;
  }
}
export default Triangle;
