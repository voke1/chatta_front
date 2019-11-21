import React, { Component } from "react";
import Response from "./response";
import "./css/card.css";
import Accordion from "./accordion";
import uuid from "uuid/v1";
const identity = uuid();
class OptionBox extends Component {
  state = {
    responses: [],
    response: "",
    height: "0px",
    identity: "",
    prompt: ""
  };
  initialResponses = [];
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = info => {
    this.initialResponses.push({
      key: uuid(),
      val: this.state.response
    });
    this.props.syncHeight(this.state.height + this.divElement.clientHeight);
    this.setState({
      responses: this.initialResponses,
      response: "",
      height: this.divElement.clientHeight
    });
    const botTree = {
      identity: this.state.identity,
      prompt: this.state.prompt,
      response: {
        buttons: this.state.response ? [...this.initialResponses]: [],
        text: ""
      }
    };
    this.props.syncTree(botTree);
  };
  response;

  render() {
    return (
      <div ref={divElement => (this.divElement = divElement)}>
        <div className="option-box">
          <div
            style={{
              marginLeft: "40px",
              marginRight: "100px",
              marginTop: "15px"
            }}
            className="form-group"
          >
            <input
              className="form-control border-top-0 border-right-0 border-left-0"
              placeholder="New prompt"
              name="prompt"
              value={this.state.prompt}
              onChange={this.onChange}
              style={{ width: "300px" }}
            ></input>
            {this.state.responses.map(res => {
              return (
                <Accordion
                  key={res.key}
                  botKey={res.key}
                  res={res.val}
                  identity={res.key}
                  syncTree={this.props.syncTree}
                  prompt={this.state.prompt}
                />
              );
            })}
            <div className="form-inline">
              <input
                className="form-control border-top-0 border-right-0 border-left-0"
                placeholder="Add option"
                name="response"
                value={this.state.response}
                onChange={this.onChange}
                style={{ width: "300px" }}
              ></input>
              <div style={{ width: "10%" }}>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() =>
                    this.onClick({ response: this.state.response })
                  }
                  style={{ backgroundColor: "#ededed", color: "#5b616b" }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height: height, identity: this.props.botKey });
  }
}
export default OptionBox;
