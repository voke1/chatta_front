import React, { Component } from "react";
import Dialogue from "./response-dialog";
import OptionMenu from "./option-menu-overlay";
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
      >
        {this.state.openDialogue ? (
          <Dialogue open={this.state.openDialogue} response={this.props.res} />
        ) : (
          ""
        )}
        <div className="card-body pt-1 pb-1">
          <div className="row">
            <div
              className="col-20"
              style={{ margin: "10px" }}
              onClick={this.props.onClick}
            >
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
            <OptionMenu
              res={this.props.res}
              key={this.props.key}
              botKey={this.props.botKey}
              syncTree={this.props.syncTree}
              chatTree={this.props.chatTree}
              identity={this.props.identity}
            />
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height: height });
  }
  componentWillReceiveProps(props) {
    const height = this.divElement.clientHeight;
    this.setState({ height: height });
  }
}
