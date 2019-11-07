import React, { Component } from "react";
import Response from "./response";
import Accordion from "./accordion";
class OptionBox extends Component {
  state = {
    responses: [],
    response: "",
    height: "0px"
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onClick = info => {
    this.props.syncHeight(this.state.height);
    const initialResponse = [...this.state.responses];
    initialResponse.push(info.response);
    this.setState({
      responses: initialResponse,
      response: "",
      height: this.divElement.clientHeight
    });
  };
  render() {
    return (
      <div ref={divElement => (this.divElement = divElement)}>
        <div className="option-box">
          {this.state.responses.map(res => {
            console.log("tjis is res", res);
            return <Accordion key={res} res={res} />;
          })}
          <hr></hr>
          <div
            style={{
              marginLeft: "40px",
              marginRight: "100px"
            }}
            className="form-group"
          >
            <label for="response">Add response</label>
            <div className="form-inline">
              <input
                className="form-control"
                placeholder="Enter response"
                name="response"
                value={this.state.response}
                onChange={this.onChange}
                style={{ width: "72%" }}
              ></input>
              <div style={{ width: "10%", marginLeft: "3px" }}>
                <button
                  className="add-response"
                  type="button"
                  onClick={() =>
                    this.onClick({ response: this.state.response })
                  }
                  style={{
                    width: "67px",
                    height: "37px",
                    color: "#141473",
                    backgroundColor: "#f0f0f5",
                    borderRadius: 5
                  }}
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
