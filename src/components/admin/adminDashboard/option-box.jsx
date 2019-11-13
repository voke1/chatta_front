import React, { Component } from "react";
import Response from "./response";
import "./card.css";
import Accordion from "./accordion";
import uuid from "uuid/v1";
const identity = uuid();
class OptionBox extends Component {
  state = {
    responses: [],
    response: "",
    height: "0px"
  };
  initialResponses = [];
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  key = uuid();
  onClick = info => {
    const botKeys = uuid();
    this.initialResponses.push({
      key: this.key,
      val: this.state.response,
      identity: botKeys
    });
    this.props.syncHeight(this.state.height);
    const initialResponse = [...this.state.responses];
    initialResponse.push(info.response);
    this.setState({
      responses: initialResponse,
      response: "",
      height: this.divElement.clientHeight
    });
    const botTree = {
      identity: this.props.identity,
      prompt: this.props.res,
      response: {
        buttons: [...this.initialResponses],
        text: ""
      }
    };
    console.log(botTree);
    console.log(this.props);
    this.props.syncTree(botTree);
  };
  response;

  render() {
    return (
      <div ref={divElement => (this.divElement = divElement)}>
        <div className="option-box">
          {this.state.responses.map(res => {
            return (
              <Accordion
                key={res}
                res={res}
                identity={res.identity}
                syncTree={this.props.syncTree}
              />
            );
          })}
          <div
            style={{
              marginLeft: "40px",
              marginRight: "100px",
              marginTop: "15px"
            }}
            className="form-group"
          >
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
    this.setState({ height: height });
  }
}
export default OptionBox;
