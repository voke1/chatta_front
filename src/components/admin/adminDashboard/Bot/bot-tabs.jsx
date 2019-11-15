import React, { Component } from "react";
import { Tab, Tabs, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import CreateIntent from "./create-intent";
class BotTabs extends Component {
  state = {
    show: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false,
    chatbotName: "",
    welcomeMessage: "",
    fallbackMessage: "",
    delayPrompt: "",
    botImage: "",
    tab: "intent"
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();

    const setting = {
      chatbotName: this.state.chatbotName,
      welcomeMessage: this.state.welcomeMessage,
      fallbackMessage: this.state.fallbackMessage,
      delayPrompt: this.state.delayPrompt,
      botImage: this.state.botImage
    };

    console.log(setting);
    axios
      .post("http://localhost:9000/setting", setting)
      .then(res => {
        this.setState({ tab: "intent" });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  fileSelectedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  fileUploadHandler = () => {
    const formData = new FormData();
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    axios.post("").then(res => {
      console.log(res);
    });
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  overlayShow() {
    this.setState({ show: true });
  }

  overlayClose() {
    this.setState({ show: false });
  }
  render() {
    return (
      <div className="container-holder">
        <Tabs defaultActiveKey={this.state.tab} id="controlled-tab-example">
          &nbsp;
          <Tab eventKey="home" title="Create Bot">
            <div className="" style={{ background: "none" }}>
              <div className="card">
                <div className="card-body px-lg-5">
                  <form
                    className="text-center"
                    style={{ color: "#757575" }}
                    action="#!"
                    onSubmit={this.handleSubmit}
                  >
                    <p>Let's start by giving your bot some default settings</p>

                    <div className="md-form mt-3">
                      <input
                        type="text"
                        id="materialSubscriptionFormPasswords"
                        className="form-control"
                        placeholder="Bot name"
                        name="chatbotName"
                        value={this.state.chatbotName}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="md-form">
                      <input
                        type="text"
                        id="materialSubscriptionFormEmail"
                        className="form-control"
                        placeholder="Welcome message"
                        name="welcomeMessage"
                        value={this.state.welcomeMessage}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="md-form">
                      <input
                        type="text"
                        id="materialSubscriptionFormEmail"
                        className="form-control"
                        placeholder="Fallback message"
                        name="fallbackMessage"
                        value={this.state.fallbackMessage}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="md-form">
                      <input
                        type="text"
                        id="materialSubscriptionFormEmail"
                        className="form-control"
                        placeholder="Delay prompt"
                        name="delayPrompt"
                        value={this.state.delayPrompt}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFileLang"
                        lang="en"
                        name="botImage"
                        value={this.state.botImage}
                      />
                      <label class="custom-file-label" for="customFileLang">
                        Upload bot image
                      </label>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect"
                      type="submit"
                      style={{ width: "100px", float: "right" }}
                    >
                      Next
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="intent" title="Add Intent" className="open">
            <div className="card w-100">
              <div className="card-body">
                <CreateIntent />
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
export default BotTabs;
