import React, { Component } from "react";
import Response from "./response";
import "./card.css";
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
          <div
            style={{
              marginLeft: "40px",
              marginRight: "100px",
              marginTop: "15px"
            }}
            className="form-group"
          >
            <div className="form-inline" >
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
                  style={{backgroundColor: "#ededed", color:"#5b616b"}}
                  
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
