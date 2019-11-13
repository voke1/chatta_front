import React, { Component } from "react";
import "../../css/intent.css";
import Response from "./response";
import OptionForm from "./option-form";
import uuid from "uuid/v1";

class CreateIntent extends Component {
  state = {
    responses: [],
    response: "",
    
  };
  getTree = tree => {
    console.log("here is the tree",tree);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  identity = uuid()
  onClick = info => {
    const initialResponse = [...this.state.responses];
    initialResponse.push(info.response);
    this.setState({
      responses: initialResponse,
      response: ""
    });
  };

  render() {
    return (
      <div className="container" style={{ background: "none", width: "60%" }}>
        <form className="text-center">
          <div className="row">
            <div className="md-col-8"></div>
          </div>
          <div className="md-form mt-3">
            <input
              type="text"
              id="materialSubscriptionFormPasswords"
              className="form-control"
              name="prompt"
              value={this.state.prompt}
              onChange={this.onChange}
              placeholder="Enter a prompt"
            />
          </div>

          <hr className="mt-3"></hr>
          <OptionForm
            tree={this.getTree}
            prompt={this.state.prompt}
          />
          <hr></hr>
          <div>
            <button
              className="btn btn-sm btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect"
              type="submit"
              style={{ width: "100px", float: "right" }}
            >
              Deploy
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default CreateIntent;
