import React, { Component } from "reactn";
import Axios from "axios";
import * as query_string from "query-string";
import socket from "socket.io-client";
// import "../conversation/convo.component.css";
import "./chat.component.css";
import "../../../utilities/slimscroll/slimscroll.css";
import $ from "jquery";
// import '../../../utilities/slimscroll/slimscroll';
import { AppService } from "../../../services/app.service";
import Convo from "../conversation/convo.component";
import botpic from "../../../bot1.jpg";
import DecodeToken from "../../../utilities/decodeToken";
import { APP_ENVIRONMENT } from "../../../environments/environment";
import { defaultStyle } from "./defaultStyle";
import * as apiService from "../../../services/apiservice";

const BASE_URL = APP_ENVIRONMENT.base_url;
const io = socket(BASE_URL);
export default class Chat extends Component {
  appService;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      count: 0,
      loading: [],
      isOpen: false,
      category_name: "",
      measuring_unit: "",
      showChatArea: false,
      textValue: "",
      userInput: "",
      isResponding: false,
      who: "",
      btnStyle: { backgroundColor: "transparent" },
      settings: {},
      botImage: "",
      chat_body: [],
      defaultStyle: defaultStyle,
      botId: ""
    };
    this.appService = new AppService();
  }
  getResponder = response => {
    console.log(response);
    this.setState({ isResponding: response });
  };
  render() {
    let { token } = localStorage;

    DecodeToken.getUserPayload(token);

    return this.state.showChatArea ? (
      <div className="slideInUp">
        <div className="container clearfix">
          <div className="chat" style={this.state.templateStyle}>
            <div
              className="chat-header clearfix"
              style={{
                backgroundColor: this.state.defaultStyle.headerFillColor
              }}
            >
              <img
                src={this.state.botImage}
                alt="avatar"
                height="50"
                width="50"
                style={{
                  borderRadius: this.state.defaultStyle.botImageBorderRadius
                }}
                className="img img-rounded"
              />
              <div className="chat-about">
                <div
                  className="chat-with"
                  style={{
                    fontSize: this.state.defaultStyle.botNameFontSize,
                    color: this.state.defaultStyle.botNameTextColor
                  }}
                >
                  {this.state.settings.chatbotName}
                </div>
                <div className="chat-num-messages">
                  {this.state.isResponding
                    ? this.state.who + " is responding..."
                    : ""}
                </div>
              </div>
              <span
                id="close-chat"
                onClick={() => {
                  this.toggleChatDisplay();
                }}
                style={{
                  color: this.state.defaultStyle.closeButtonTextColor,
                  fontSize: this.state.defaultStyle.closeButtonFontSize
                }}
              >
                <i className="fa fa-times fa-2x"></i>
              </span>
            </div>

            <Convo
              userInput={this.state.userInput}
              getResponder={this.getResponder}
              settings={this.state.settings}
              chat_body={this.state.chat_body}
              socketIo={io}
              botId={this.state.botId}
            />

            <div
              id="input-container"
              className="chat-message clearfix"
              style={{
                backgroundColor: this.state.defaultStyle.botBodyFillColor
              }}
            >
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <input
                      type={this.state.count === 1 && !this.state.settings.trainingMode? "email" : "text"}
                      className="form-control"
                      value={this.state.textValue}
                      id="message-to-send"
                      placeholder="Type your message"
                      rows="2"
                      onChange={this.handleChange}
                      style={{
                        backgroundColor: this.state.defaultStyle.inputFillColor,
                        color: this.state.defaultStyle.inputTextColor,
                        borderRadius: this.state.defaultStyle.inputBorderRadius,
                        border: `${this.state.defaultStyle.inputBorder} solid ${this.state.defaultStyle.inputBorderColor}`
                      }}
                    />
                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file-image-o"></i>
                  </div>
                  {/* <div className="col-md-1">
                                      <button id="play-btn" className="" type="submit">
                                          <i className="fa fa-play fa-2x"></i>
                                      </button>
                                  </div> */}
                </div>
                <div className="text-right">
                  <span id="powered_by">Powered by: </span> <b>IT Horizons</b>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <button
        id="chat-opener"
        data-toggle="tooltip"
        title="Chat with us"
        style={this.state.btnStyle}
        onClick={this.toggleChatDisplay}
      >
        <i className="far fa-comment-alt fa-2x"></i>
      </button>
    );
  }
  // deleteVisit = () => {
  //   apiService
  //     .del(`activeusers/${this.global.visitorId}`)
  //     .then(res => {
  //       console.log("deleted", res);
  //     })
  //     .catch(error => console.log(error.message));
  // }
  // onChatClose = () => {
  //   window.addEventListener("beforeunload", event => {
  //     event.preventDefault();
  //     this.deleteVisit();
  //   });
  //   window.addEventListener("onbeforeunload", ev => {
  //     ev.preventDefault();
  //     this.deleteVisit()
  //     // return (ev.returnValue = "Are you sure you want to close?");
  //   });
  // };
  componentWillUnmount() {
    // this.deleteVisit()
  }
  async componentDidMount() {
    const params = query_string.parse(this.props.location.search);
    try {
      const result = await Axios.get(
        `${BASE_URL}/setting/${params.setting_id}`
      );
      console.log("result", result);
      if (result.data) {
        // const settings = result.data[result.data.length - 1];
        const settings = result.data.findTree.setting_id;

        settings.collectUserInfo = true;
        settings.trainingMode = true;

        this.setState({
          btnStyle: {
            backgroundColor:
              settings.primaryColor === " "
                ? this.state.btnStyle
                : settings.primaryColor
          },
          who: settings.chatbotName,
          botImage: settings.botImage,
          settings,
          chat_body: result.data.findTree.chat_body,
          botId: result.data.findTree._id,
          defaultStyle: settings.templateSettings
        });
      }
    } catch (e) {}

    // Axios.get(`${BASE_URL}/setting`)
    //   .then(res => {
    //     const result = res.data[res.data.length - 1];
    //     color = result.prima
    //     console.log(result);
    //     const settings = result.findTree.setting_id;
    //     this.setState({
    //       btnStyle: { backgroundColor: "#ffffff" },
    //       chatbotName: settings.chatbotName,
    //       delayTime: settings.delayTime,
    //       primaryColor: settings.primaryColor,
    //       secondaryColor: settings.secondaryColor,
    //       botImage: settings.botImage
    //     });
    //   })
    //   .catch(err => {});
    // const appKey = window.location.href;
    // console.log("API", appKey);
    // this.setState({
    //   btnStyle: { backgroundColor: "black" }
    // });
    // // $('#chat-opener').tooltip();orange
    // $(document).ready(function () {orange
    //     $('[data-toggle="tooltip"]'orange
    // });
  }

  toggleChatDisplay = () => {
    this.state.showChatArea ? io.disconnect() : io.connect();
    this.setState({
      showChatArea: !this.state.showChatArea,
      count: 0
    });
    // this.deleteVisit()
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      userInput: this.state.textValue
    });
    setTimeout(() => {
      this.setState({
        textValue: ""
      });
    }, 10);
    this.setState({ count: this.state.count + 1 });
  };

  handleChange = event => {
    this.setState({
      textValue: event.target.value
    });
  };
}
