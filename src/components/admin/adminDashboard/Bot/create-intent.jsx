import React, { Component } from "reactn";

import "../../css/intent.css";
import Response from "./response";
import OptionForm from "./option-form";
import uuid from "uuid/v1";
import * as apiService from "../../../../services/apiservice";
import ProgressBar from "../Authentication/progressbar";
import DeletePrompt from "./delete-prompt-modal";
import EditPrompt from "./response-dialog";
import Options from "./options";
import KeyForm from "./keyForm";

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
    openDialog: false,
    openEditDialog: false,
    warning: false,
    fallbackClass: "fas fa-times animated fadeIn red-text",
    delayPromptClass: "fas fa-times animated fadeIn red-text",
    fallbackCount: 0,
    delayPromptCount: 0,
    message: "",
    settings: {},
    treeId: "",
    fetched: false,
    deployed: false,
    stateChanged: false
  };
  getTree = tree => {
    console.log("this is tree", tree);
    console.log("getTree Called");
    this.setState({
      chatBody: tree,
      buttonText: this.state.deployed ? "UPDATE" : this.state.buttonText
    });
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
  saveSettings = () => {
    apiService
      .put(`setting/${this.props.settings._id}`, this.props.settings)
      .then(res => {
        this.props.setDeploymentStatus(true);
        this.setState({ deployed: true });
        this.props.changeState(false);
      })
      .catch(error => console.error("this is error", error));
  };
  handleSubmit = event => {
    const clientId = JSON.parse(localStorage.getItem("userdetails")).id;

    event.preventDefault();
    if (this.state.buttonText === "FINISH") {
      this.props.closeOverlay();
    } else {
      this.setState({ setProgress: true, disabled: true });
      if (this.props.fetched || this.state.deployed) {
        apiService
          .patch(`tree/${this.state.treeId}`, {
            chat_body: this.state.chatBody[0]
          })
          .then(res => {
            this.setState({
              setProgress: false,
              buttonText: this.props.ConvoTree ? "SAVED" : "FINISH",
              buttonColor: "btn-success",
              animation: "animated shake",
              disabledButton: this.props.ConvoTree ? true : false
            });
            this.setState({ deployed: true });
            this.props.changeState(false);
            this.saveSettings()
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        apiService
          .post("tree", {
            setting_id: this.props.settings._id,
            chat_body: this.state.chatBody[0],
            clientId
          })
          .then(res => {
            console.log("chat body", res.chat_body.chat_body);
            this.setState({
              setProgress: false,
              buttonText: this.props.ConvoTree ? "SAVED" : "FINISH",
              buttonColor: "btn-success",
              animation: "animated shake",
              disabledButton: this.props.ConvoTree ? true : false,
              treeId: res.chat_body._id,
              chat_body: res.chat_body.chat_body
            });
            this.saveSettings();
            // this.props.disableHomeTab();
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
  setButtonText = text => {
    !text
      ? this.setState({
          buttonText: this.props.ConvoTree
            ? "SAVE"
            : this.state.deployed
            ? "UPDATE"
            : "DEPLOY",
          buttonColor: "btn btn-secondary",
          disabledButton: false
        })
      : this.setState({ buttonText: text });
  };
  enableButton = (fallbackTree, delayPromptTree) => {
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
      <div className="container" style={{ background: "none", width: "90%"}}>
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
        {console.log("openstate:", this.state.openEditDialog, "globalresponse:", this.global.response)}
        {this.state.openDialog ? <DeletePrompt /> : ""}
        {this.state.openEditDialog ? (
          <EditPrompt response={this.global.response} />
        ) : (
          ""
        )}

        <form className="text-center" onSubmit={this.handleSubmit}>
          <div className="row" w0rd>
            <div className="md-col-8"></div>
          </div>

          <div className="md-form mt-3" >
            <input
              type="text"
              id="materialSubscriptionFormPasswords"
              className="form-control"
              name="prompt"
              value={this.state.prompt}
              onChange={this.onChange}
              placeholder="Enter a prompt"
              style={{width: "100%"}}
            />
          {/* <KeyForm /> */}
          </div>

          <hr className="mt-3"></hr>
          {/* {console.log("chattreeee",)} */}
          <OptionForm
            tree={this.getTree}
            prompt={this.state.prompt}
            getTab={this.props.getTab}
            chatTree={this.props.ConvoTree}
            fetchTree={this.props.fetchTree}
            settings={this.state.settings}
            fetched={this.props.fetched}
          />
          <hr></hr>
          {this.state.setProgress ? <ProgressBar /> : ""}

          <div>
            <button
              className={` ${this.state.buttonColor} btn btn-secondary btn-sm waves-effect ${this.state.animation}`}
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
    console.log("component mounted", this.props.ConvoTree);
    this.setState({
      prompt: this.props.ConvoTree ? this.props.ConvoTree[0].prompt : "",
      chatBody: this.props.ConvoTree ? this.props.ConvoTree : [],
      buttonText: this.props.ConvoTree ? "SAVE" : "DEPLOY",
      fallbackCount: this.props.ConvoTree
        ? this.props.ConvoTree[this.props.ConvoTree.length - 2].response.buttons
            .length
        : 0,
      delayPromptCount: this.props.ConvoTree
        ? this.props.ConvoTree[this.props.ConvoTree.length - 1].response.buttons
            .length
        : 0,
      fallbackClass: this.props.ConvoTree
        ? "fas fa-check animated fadeIn green-text"
        : "fas fa-times animated fadeIn red-text",
      delayPromptClass: this.props.ConvoTree
        ? "fas fa-check animated fadeIn green-text"
        : "fas fa-times animated fadeIn red-text",
      disabledButton: true,
      treeId: this.props.treeId,
      fetched: this.props.fetched
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
  componentWillReceiveProps(props) {
    console.log("receiving props", props.stateChanged);
    this.setState({ settings: props.settings });
    if (props.stateChanged) {
      this.setState({ buttonText: "UPDATE" });
    }
  }
  componentWillMount() {
    console.log("unmounted");
  }
}
export default CreateIntent;
