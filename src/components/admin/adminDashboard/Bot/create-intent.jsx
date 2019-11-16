import React, { Component } from "react";
import "../../css/intent.css";
import Response from "./response";
import OptionForm from "./option-form";
import uuid from "uuid/v1";
import * as apiService from "../../../../services/apiservice";
import ProgressBar from "../../../progressbar";
class CreateIntent extends Component {
  state = {
    responses: [],
    response: "",
    chatBody: [],
    showProgress: false,
    buttonText: "DEPLOY",
    buttonColor: "btn-outline-info",
    animation: "",
    disabledButton: false
  };
  getTree = tree => {
    console.log(tree instanceof Object);
    this.setState({ chatBody: tree });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  identity = uuid();
  onClick = info => {
    const initialResponse = [...this.state.responses];
    initialResponse.push(info.response);
    this.setState({
      responses: initialResponse,
      response: ""
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.buttonText === "FINISH") {
      this.props.closeOverlay();
    }
    this.setState({ setProgress: true, disabled: true });
    apiService
      .post("tree", { chat_body: this.state.chatBody[0] })
      .then(res => {
        console.log(res);
        this.setState({
          setProgress: false,
          buttonText: "FINISH",
          buttonColor: "btn-success",
          animation: "animated shake",
          disabledButton: false
        });
        this.props.disableHomeTab();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container" style={{ background: "none", width: "60%" }}>
        <form className="text-center" onSubmit={this.handleSubmit}>
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
          <OptionForm tree={this.getTree} prompt={this.state.prompt} />
          <hr></hr>
          {this.state.setProgress ? <ProgressBar /> : ""}
          <div>
            <button
              className={`btn btn-sm ${this.state.buttonColor} btn-rounded btn-block z-depth-0 my-4 waves-effect ${this.state.animation}`}
              type="submit"
              style={{
                width: "100px",
                float: "right"
              }}
              disabled={this.state.disabledButton}
            >
              {this.state.buttonText}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default CreateIntent;
