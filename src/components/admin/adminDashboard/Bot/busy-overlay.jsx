import React, { Component } from "reactn";
import ProgressBar from "../Authentication/progressbar";
import "./css/busy.css";
class BusyOverlay extends Component {
  state = {
    action: "hide-busy-overlay"
  };
  showOverlay = show => {
    if (show || this.props.show) {
      this.setState({
        action: "show-busy-overlay"
      });
    } else {
      this.setState({
        action: "hide-overlay"
      });
    }
  };
  render() {
    return (
      <div>
        <div className={this.state.action}>
          <ProgressBar />
        </div>
      </div>
    );
  }
  componentWillReceiveProps(props) {
    this.showOverlay()
  }
  componentDidMount() {
    console.log("overlay mounted");
    this.showOverlay()
    this.setGlobal({
      showBusyOverlay: this.showOverlay
    });
  }
}
export default BusyOverlay;
