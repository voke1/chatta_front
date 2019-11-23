import React, { Component } from "react";
import { Tab, Tabs, Row, Col, Form, Button } from "react-bootstrap";
import "../../css/style.css";
import "../../css/icons.css";
import "../../css/bootstrap.min.css";
import "../../images/favicon.ico";
import CreateIntent from "./create-intent";
import * as apiService from "../../../../services/apiservice";
import ProgressBar from "../../../progressbar";
import { storage } from "../../../../firebase/index";

class BotTabs extends Component {
  state = {
    show: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false,
    showProgress: false,
    chatbotName: "",
    welcomeMessage: "",
    fallbackMessage: "",
    delayPrompt: "",
    botImage: " ",
    tab: "home",
    settingsSaved: false,
    fileUpload: null,
    delayTime: null,
    primaryColor: " ",
    secondaryColor: ", "
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    // alert(event.target.value);
  };

  fileSelectedHandler = event => {
    // if (event.target.files[0]) {
    console.log("event.target:", event.target);
    const fileInput = event.target.files[0];
    this.setState({ fileUpload: fileInput });
    console.log("fileUpload", fileInput);
    // }
    return null;
  };
  saveData = url => {
    const setting = {
      chatbotName: this.state.chatbotName,
      fallbackMessage: this.state.fallbackMessage,
      delayPrompt: this.state.delayPrompt,
      botImage: url,
      primaryColor: this.state.primaryColor,
      secondaryColor: this.state.secondaryColor,
      delayTime: this.state.delayTime
    };
    console.log("saving data:", setting);
    apiService

      .post("setting", setting)
      .then(res => {
        this.setState({
          tab: "intent",
          showProgress: false,
          settingsSaved: true
        });
        console.log("RESPONSE:", res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleSubmit = event => {
    event.preventDefault();
    // this.fileUploadHandler();
    const { fileUpload } = this.state;

    const uploadTask = storage.ref(`images/${fileUpload.name}`).put(fileUpload);

    uploadTask.on(
      "state_changed",
      snapshot => {
        // progrss function ....
        // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // this.setState({progress});
      },
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(fileUpload.name)
          .getDownloadURL()
          .then(url => {
            console.log("URL:", url);
            // this.setState({ botImage: url });
            this.saveData(url);
            console.log("this.state.botImage: ", this.state.botImage);
          });
      }
    );

    this.setState({ showProgress: true });

    // console.log("SETTING:", setting);
  };

  fileUploadHandler = () => {};

  getTab = tab => {
    return this.state.settingsSaved ? tab : this.state.tab;
  };
  render() {
    return (
      <div className="container-holder">
        <Tabs
          activeKey="intent"
          id="controlled-tab-example"
          onSelect={tab => this.setState({ tab: this.getTab(tab) })}
        >
          &nbsp;
          <Tab eventKey="home" title="Create Bot" className>
            <div className="" style={{ background: "none" }}>
              <div className="card">
                <div className="card-body px-lg-5">
                  <form
                    className="text-center"
                    style={{ color: "#757575" }}
                    action="#!"
                    onSubmit={this.handleSubmit}
                  >
                    <p>
                      Let's start by giving your bot some default setticolor
                      picker css stylingcolor picker css stylingngs
                    </p>

                    <div className="md-form mt-3">
                      <input
                        type="text"
                        id="materialSubscriptionFormPasswords"
                        className="form-control"
                        placeholder="Bot name"
                        name="chatbotName"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="md-form mt-3">
                      <input
                        type="text"
                        id="materialSubscriptionFormPasswords"
                        className="form-control"
                        placeholder="Fallback Message"
                        name="fallbackMessage"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="md-form">
                      <Row>
                        <Col>
                          <p className="text-left">Primary Colour</p>[]
                          <input
                            type="color"
                            id="materialSubscriptionFormEmail"
                            onChange={this.handleChange}
                            className="form-control"
                            name="primaryColor"
                          />
                        </Col>
                        <Col>
                          <p className="text-left">Secondary Colour</p>[]
                          <input
                            type="color"
                            id="materialSubscriptionFormEmail"
                            onChange={this.handleChange}
                            name="secondaryColor"
                            className="form-control"
                          />
                        </Col>
                      </Row>
                    </div>

                    <div className="md-form">
                      <input
                        type="text"
                        id="materialSubscriptionFormEmail"
                        className="form-control"
                        placeholder="Delay Prompt"
                        name="delayPrompt"
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="md-form">
                      <input
                        type="number"
                        id="materialSubscriptionFormEmail"
                        className="form-control"
                        placeholder="Delay Time"
                        name="delayTime"
                        onChange={this.handleChange}
                      />
                    </div>

                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFileLang"
                        lang="en"
                        onChange={this.fileSelectedHandler}
                      />
                      <label class="custom-file-label" for="customFileLang">
                        Upload bot image
                      </label>
                    </div>
                    <hr></hr>
                    {this.state.showProgress ? <ProgressBar /> : ""}
                    <button
                      className="btn btn-sm btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect"
                      // type="submit"
                      style={{ width: "100px", float: "right" }}
                      onClick={this.handleSubmit}
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
                <CreateIntent
                  closeOverlay={this.props.closeOverlay}
                  disableHomeTab={() =>
                    this.setState({ tab: "intent", settingsSaved: false })
                  }
                />
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
export default BotTabs;
