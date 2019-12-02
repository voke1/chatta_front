import React, { Component } from "reactn";
import "../../css/intent.css";
import Response from "./response";
import OptionForm from "./option-form";
import uuid from "uuid/v1";
import * as apiService from "../../../../services/apiservice";
import ProgressBar from "../../../progressbar";
import DeletePrompt from "./delete-prompt-modal";
class CreateIntent extends Component {
  state = {
    responses: [],
    response: "",
    chatBody: [],
    showProgress: false,
    buttonText: "DEPLOY",
    buttonColor: "btn-success",
    animation: "",
    disabledButton: false,
    openDialog: false
  };
  getTree = tree => {
    console.log("this is tree", tree);
    this.setState({ chatBody: tree });
  };
  openDialog = () => {
    console.log("open dialogue");
    this.setState({
      openDialog: true
    });
  };
  closeDialog = () => {
    this.setState({
      openDialog: false
    });
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
      <div className="container" style={{ background: "none", width: "90%" }}>
        {this.state.openDialog ? <DeletePrompt /> : ""}

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
          <OptionForm
            tree={this.getTree}
            prompt={this.state.prompt}
            getTab={this.props.getTab}
          />
          <hr></hr>
          {this.state.setProgress ? <ProgressBar /> : ""}
          <div>
            <button
              className={` ${this.state.buttonColor} btn btn-secondary btn-sm waves-effect ${this.state.animation}`}
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
  componentDidMount() {
    this.setGlobal({
      openDialog: this.openDialog,
      closeDialog: this.closeDialog
    });
  }
}
export default CreateIntent;
