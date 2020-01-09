import React, { Component } from "reactn";
import { Tab, Tabs, Row, Col, Form, Button } from "react-bootstrap";
import "../../css/style.css";
import "../../css/icons.css";
import "../../css/bootstrap.min.css";
import "../../images/favicon.ico";
import CreateIntent from "./create-intent";
import * as apiService from "../../../../services/apiservice";
import ProgressBar from "../Authentication/progressbar";
import { storage } from "../../../../firebase/index";
import Preview from "./preview";
import { APP_ENVIRONMENT } from "../../../../environments/environment";
import EmbedCode from "./embed-code-dialog";
import BotUITemplate from "./bot-UI-template-design";
const BASE_URL = APP_ENVIRONMENT.base_url_front;
class BotTabs extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    show: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false,
    showProgress: false,
    chatbotName: "",
    welcomeMessage: null,
    fallbackMessage: "",
    delayPrompt: "",
    botImage: " ",
    tab: "home",
    settingsSaved: false,
    fileUpload: null,
    delayTime: null,
    primaryColor: "#000000",
    secondaryColor: "#000000",
    file: " Upload bot image",
    settings: {},
    previewSelected: false,
    templateSettings: {}
    // displayState: "none"
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileSelectedHandler = event => {
    if (event.target.files[0]) {
      const fileInput = event.target.files[0];
      this.setState({
        fileUpload: fileInput,
        file: event.target.files[0].name
      });
    }
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

    apiService
      .post("setting", setting)
      .then(res => {
        console.log("this is settings res", res);
        this.setState({
          tab: "intent",
          showProgress: false,
          settingsSaved: true,
          settings: res
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { fileUpload } = this.state;

    if (!fileUpload) {
      this.setState({ displayState: "visible" });
    }

    // this.fileUploadHandler();
    if (fileUpload) {
      const uploadTask = storage
        .ref(`images/${fileUpload.name}`)
        .put(fileUpload);
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
              this.saveData(url);
            });
        }
      );
      this.setState({ showProgress: true });
    }
  };

  fileUploadHandler = () => { };

  getTab = tab => {
    return this.state.settingsSaved ? tab : this.state.tab;
  };
  setTemplateSettings = templateSettings => {
    const newSettings = { ...this.state.settings };
    newSettings.templateSettings = templateSettings;
    this.setState({
      settings: newSettings
    });
  };
  render() {
    return (
      <div
        className=""
        style={{ margin: "auto", width: "99%", marginTop: "20px" }}
      >
        <EmbedCode />
        <Tabs
          style={{ padding: 0 }}
          activekey={this.state.tab}
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
                    onSubmit={this.handleSubmit}
                  >
                    {console.log("displayState:", this.state.displayState)}
                    {console.log(
                      "secondshowProgress: ",
                      this.state.showProgress
                    )}
                    <p
                      style={{
                        display: `none`,
                        color: "red"
                      }}
                    >
                      Please update all Fields to continue...
                    </p>

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
                    <div className="md-form mt-3">
                      <input
                        type="text"
                        id="materialSubscriptionFormPasswords"
                        className="form-control"
                        placeholder="Fallback Message"
                        name="fallbackMessage"
                        onChange={this.handleChange}
                        value={this.state.fallbackMessage}
                      />
                    </div>
                    <div className="md-form">
                      <Row>
                        <Col>
                          <p className="text-left">Primary Colour</p>
                          <input
                            type="color"
                            value={this.state.primaryColor}
                            id="materialSubscriptionFormEmail"
                            onChange={this.handleChange}
                            // className="form-control"
                            name="primaryColor"
                            style={{
                              width: "100%"
                            }}
                          />
                        </Col>
                        <Col>
                          <p className="text-left">Secondary Colour</p>
                          <input
                            type="color"
                            id="materialSubscriptionFormEmail"
                            onChange={this.handleChange}
                            name="secondaryColor"
                            value={this.state.secondaryColor}
                            style={{
                              width: "100%"
                            }}

                          // className="form-control"
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
                        value={this.state.delayPrompt}
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
                        value={this.state.delayTime}
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
                        {this.state.file}
                      </label>
                    </div>
                    <hr></hr>
                    {this.state.showProgress ? <ProgressBar /> : ""}
                    <button
                      className="btn btn-secondary btn-sm waves-effect"
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
          <Tab
            eventKey="template"
            title="Customize"
            className="open"
            style={{ padding: "none", margin: "none" }}
          >
            <BotUITemplate
              settings={this.state.settings}
              setTemplateSettings={this.setTemplateSettings}
            />
          </Tab>
          <Tab eventKey="intent" title="Add Intent" className="open">
            <div className="card w-100">
              <div className="card-body">
                <CreateIntent
                  settings={this.state.settings}
                  getTab={() => this.setState({ tab: "intent" })}
                  closeOverlay={this.props.closeOverlay}
                  disableHomeTab={() =>
                    this.setState({ tab: "intent", settingsSaved: false })
                  }
                />
              </div>
            </div>
          </Tab>
          <Tab eventKey="preview" title="Preview" className="open">
            <div className="w-100">
              <div className="card-body">{this.getPreview()}</div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
  getPreview() {
    return this.state.settingsSaved && this.state.tab === "preview" ? (

      <Preview settings={this.state.settings} orgUrl={`${BASE_URL}/chatbot?setting_id=${this.state.settings._id}`} />

    ) : null;
  }
  componentDidMount() {
    console.log("mounted");
    this.setGlobal({ getTab: this.getTab });
  }
}
export default BotTabs;
