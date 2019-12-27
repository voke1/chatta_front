import React, { Component } from "react";
import Axios from "axios";
import "../conversation/convo.component.css";
import "./chat.component.css";
import "../../../utilities/slimscroll/slimscroll.css";
import $ from "jquery";
// import '../../../utilities/slimscroll/slimscroll';
import { AppService } from "../../../services/app.service";
import Convo from "../conversation/convo.component";
import botpic from "../../../bot1.jpg";
import DecodeToken from "../../../utilities/decodeToken";
import { APP_ENVIRONMENT } from "../../../environments/environment";


const BASE_URL = APP_ENVIRONMENT.base_url;

export default class Chat extends Component {
  appService;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
      botImage: ""
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

        <div className="container1 clearfix">
          <div className="chat">
            <div
              className="chat-header clearfix"
              style={{ backgroundColor: this.state.settings.secondaryColor }}
            >
              <img
                src={this.state.botImage}
                alt="avatar"
                height="50"
                width="50"
                className="img img-rounded"
              />
              <div className="chat-about">
                <div className="chat-with">
                  {this.state.settings.chatbotName}
                </div>
                <div className="chat-num-messages">
                  {this.state.isResponding
                    ? this.state.who + " is responding..."
                    : ""}
                </div>
              </div>
              <span id="close-chat" onClick={this.toggleChatDisplay}>
                <i className="fa fa-times fa-2x"></i>
              </span>
            </div>

            <Convo
              userInput={this.state.userInput}
              getResponder={this.getResponder}
              settings={this.state.settings}
            />

            <div id="input-container1" className="chat-message clearfix">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.textValue}
                      id="message-to-send"
                      placeholder="Type your message"
                      rows="2"
                      onChange={this.handleChange}
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

  async componentDidMount() {
    const appKey = window.location.href;
    console.log("API", appKey);
    try {
      const result = await Axios.get(`${BASE_URL}/setting`);
      if (result.data) {
        const settings = result.data[result.data.length - 1];
        settings.collectUserInfo = true;
        console.log("settings", settings);
        this.setState({
          btnStyle: {
            backgroundColor:
              settings.primaryColor === " "
                ? this.state.btnStyle
                : settings.primaryColor
          },
          who: settings.chatbotName,
          botImage: settings.botImage,
          settings
        });
      }
    } catch (e) { }

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
    this.setState({
      showChatArea: !this.state.showChatArea
    });
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
  };

  handleChange = event => {
    this.setState({
      textValue: event.target.value
    });
  };
}
