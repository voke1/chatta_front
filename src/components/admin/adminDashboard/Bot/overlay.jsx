/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, setGlobal } from "reactn";
import ImportTemplateOverlay from "./import-overlay";
import "./css/overlay.css";
import BotTabs from "./bot-tabs";
import InternetCheck from "./internet-check";
import BusyOverlay from "./busy-overlay";
class Overlay extends Component {
  state = {
    height: this.props.height,
    internet: true
  };
  handleClick = () => {
    this.setState({ height: "0%" });
    this.props.closeOverlayWithState();
  };
  showAlert = async show => {
    await this.setState({ internet: show === false ? false : true });
    setInterval(() => {
      if (navigator.onLine) {
        this.setState({ internet: true });
        return true;
      } else {
        this.setState({ internet: false });
        return false;
      }
    }, 5000);
  };

  render() {
    return (
      <div
        id="myNav"
        className="bot-overlay"
        style={{ height: this.state.height }}
      >
        <BusyOverlay />
        <ImportTemplateOverlay show={true} />
        {!this.state.internet ? <InternetCheck /> : null}

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
  componentDidMount() {
    setGlobal({
      showAlert: this.showAlert
    });
    this.showAlert();
  }
}
export default Overlay;
