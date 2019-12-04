import React, { Component } from "reactn";
import "../../css/intent.css";
import Response from "./response";
import OptionForm from "./option-form";
import uuid from "uuid/v1";
import * as apiService from "../../../../services/apiservice";
import ProgressBar from "../../../progressbar";
import DeletePrompt from "./delete-prompt-modal";
import EditPrompt from "./response-dialog";
class CreateIntent extends Component {
  state = {
    responses: [],
    response: "",
    chatBody: [],
    showProgress: false,
    buttonText: "DEPLOY",
    buttonColor: "btn-outline-info",
    animation: "",
    disabledButton: false,
    openDialog: false,
    openEditDialog: false,
    warning: false,
    fallbackClass: "fas fa-times animated fadeIn red-text",
    delayPromptClass: "fas fa-times animated fadeIn red-text",
    fallbackCount: 0,
    delayPromptCount: 0,
    message: ""
  };
  getTree = tree => {
    console.log("this is tree", tree);
    this.setState({ chatBody: tree });

    this.setButtonText();
  };
  openDeleteDialog = () => {
    this.setState({
      openDialog: true
    });
  };
  closeDeleteDialog = () => {
    this.setState({
      openDialog: false
    });
  };
  openEditDialog = () => {
    this.setState({ openEditDialog: true });
  };
  closeEditDialog = () => {
    this.setState({ openEditDialog: false });
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
          buttonText: this.props.ConvoTree ? "SAVED" : "FINISH",
          buttonColor: "btn-success",
          animation: "animated shake",
          disabledButton: this.props.ConvoTree ? true : false
        });
        this.props.disableHomeTab();
      })
      .catch(err => {
        console.log(err);
      });
  };
  setButtonText = () => {
    this.setState({
      buttonText: this.props.ConvoTree ? "SAVE" : "DEPLOY",
      buttonColor: "btn-outline-info",
      disabledButton: false
    });
  };
  enableButton = (fallbackTree, delayPromptTree) => {
    console.log("called");
    this.setState({
      disabledButton: false,
      message: "",
      fallbackClass: "fas fa-check animated fadeIn green-text",
      delayPromptClass: "fas fa-check animated fadeIn green-text",
      fallbackCount: fallbackTree.response.buttons.length,
      delayPromptCount: delayPromptTree.response.buttons.length
    });
  };
  disableButton = (fallbackTree, delayPromptTree) => {
    this.setState({
      disabledButton: true,
      message: "Please set at least one fallback and one delay prompt option",
      fallbackClass:
        !fallbackTree || !fallbackTree.response.buttons.length
          ? "fas fa-times animated pulse red-text"
          : "fas fa-check animated fadeIn green-text",
      delayPromptClass:
        !delayPromptTree || !delayPromptTree.response.buttons.length
          ? "fas fa-times animated pulse red-text"
          : "fas fa-check animated fadeIn green-text",
      fallbackCount: fallbackTree ? fallbackTree.response.buttons.length : 0,
      delayPromptCount: delayPromptTree
        ? delayPromptTree.response.buttons.length
        : 0
    });
  };
  render() {
    return (
      <div className="container" style={{ background: "none", width: "90%" }}>
        <div style={{ color: "#595855", fontSize: "15px" }}>
          <i class={this.state.fallbackClass}></i>{" "}
          <span>Fallback option set ({this.state.fallbackCount})</span>
          <br></br>
          <i class={this.state.delayPromptClass}></i>{" "}
          <span>Delay prompt option set ({this.state.delayPromptCount})</span>
        </div>
        {/* {this.state.message ? (
          <div
            className="animated shake"
            style={{ color: "red", marginTop: "10px" }}
          >
            <p>{this.state.message}</p>
          </div>
        ) : (
          ""
        )} */}
        {this.state.openDialog ? <DeletePrompt /> : ""}
        {this.state.openEditDialog ? (
          <EditPrompt response={this.global.response} />
        ) : (
          ""
        )}

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
            chatTree={this.props.ConvoTree}
          />
          <hr></hr>
          {this.state.setProgress ? <ProgressBar /> : ""}

          <div>
            <button
              className={`btn btn-sm ${this.state.buttonColor} btn-rounded btn-block z-depth-0 my-4 waves-effect ${this.state.animation}`}
              type="submit"
              style={{
                width: "110px",
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
    this.setState({
      prompt: this.props.ConvoTree ? this.props.ConvoTree.tree[0].prompt : "",
      chatBody: this.props.ConvoTree ? this.props.ConvoTree.tree : [],
      buttonText: this.props.ConvoTree ? "SAVE" : "DEPLOY",
      fallbackCount: this.props.ConvoTree
        ? this.props.ConvoTree.tree[this.props.ConvoTree.tree.length - 2]
            .response.buttons.length
        : 0,
      delayPromptCount: this.props.ConvoTree
        ? this.props.ConvoTree.tree[this.props.ConvoTree.tree.length - 1]
            .response.buttons.length
        : 0,
      fallbackClass: this.props.ConvoTree
        ? "fas fa-check animated fadeIn green-text"
        : "fas fa-times animated fadeIn red-text",
      delayPromptClass: this.props.ConvoTree
        ? "fas fa-check animated fadeIn green-text"
        : "fas fa-times animated fadeIn red-text",
      disabledButton: true
    });
    this.setGlobal({
      openDialog: this.openDeleteDialog,
      closeDialog: this.closeDeleteDialog,
      openEditDialog: this.openEditDialog,
      closeEditDialog: this.closeEditDialog,
      enableButton: this.enableButton,
      disableButton: this.disableButton,
      setButtonText: this.setButtonText
    });
  }
}
export default CreateIntent;
