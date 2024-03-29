/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./css/overlay.css";
import BotTabs from "./bot-tabs";

class Overlay extends Component {
  state = {
    height: this.props.height
  };
  handleClick = () => {
    this.setState({ height: "0%" });
    this.props.closeOverlayWithState();
  };
  render() {
    return (
      <div
        id="myNav"
        className="bot-overlay"
        style={{ height: this.state.height }}
      >
        <a
          href="javascript:void(0)"
          class="closebtn"
          onClick={this.handleClick}
        >
          &times;
        </a>

        <div class="overlay-content">
          <BotTabs closeOverlay={this.handleClick} />
        </div>
      </div>
    );
  }
  componentWillReceiveProps(props) {
    this.setState({ height: props.height });
  }
}
export default Overlay;
