import React, { useState, useRef, Component } from "react";
import "./accordion.css";
import CardView from "./card-view";
import OptionBox from "./option-box";

class Accordion2 extends Component {
  state = {
    height: "0px",
    active: "",
    init: "0px",
    newHeight: "0px"
  };
  syncHeight = height => {
    this.setState({
      init: this.state.init + height,
      height: this.state.init + height + this.divElement.clientHeight * 2 + "px"
    });
  };

  toggleAccordion = () => {
    this.setState({
      active: this.state.active === "" ? "active" : "",
      height:
        this.state.active === "active"
          ? "0px"
          : this.state.init + this.divElement.clientHeight + "px"
    });
  };
  setActive = () => (this.state.active === "" ? "active" : "");
  render() {
    return (
      <div
        ref={divElement => (this.divElement = divElement)}
        className="accoconst identity = uuid()rdion-section"
        style={{
          marginLeft: "50px",
          marginBottom: "10px",
          marginTop: "10px",
          transition: "max-width 0.6s ease"
        }}
      >
        <CardView
          className={`accordion ${this.setActive}`}
          onClick={this.toggleAccordion}
          syncHeight={this.syncHeight}
          syncTree={this.props.syncTree}
          res={this.props.res}
        />
        <div
          style={{ maxHeight: `${this.state.height}` }}
          className="accordion_content"
        >
          <OptionBox
            res={this.props.res}
            syncTree={this.props.syncTree}
            syncHeight={this.syncHeight}
            identity={this.props.identity}
          />
        </div>
      </div>
    );
  }
  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ init: height });
  }
}
export default Accordion2;
