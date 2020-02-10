import axios from "axios";
import React, { Component } from "reactn";
import BotForm from "../../../components/admin/adminDashboard/Bot/botForm";
import { APP_ENVIRONMENT } from "../../../environments/environment";
import { defaultStyle } from "../chat/defaultStyle";
import Triangle from "../../../components/admin/adminDashboard/Bot/triangle";
import { AppService } from "../../../services/app.service";
import * as apiService from "../../../services/apiservice";
import thinker from "../../../thinker.gif";
import "./convo.component.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  isChrome,
  isFirefox,
  isEdge,
  isOpera,
  isIE,
  isSafari
} from "react-device-detect";
export default class Convo extends Component {
  appService;
  static userName;
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      browser: "",
      visitor: "",
      online: false,
      conversationTree: [],
      chatTimer: 1,
      typingTimer: null,
      times: [],
      userChoices: [],
      thinking: false,
      canListen: true,
      self: true,
      tree: [],
      collectUserInfo: false,
      userIsKnown: false,
      anything: "xx",
      username: "",
      email: "",
      fetchUserInfo: true,
      defaultStyle: defaultStyle,
      userDetails: {},
      empty: {
        identity: "empty",
        prompt:
          "Sorry I don't understand what you said. Would you like to know about the following?",
        response: {
          buttons: [
            {
              key: "final_expenses",
              val: "Final Expenses"
            },
            {
              key: "mortgage_protection",
              val: "Mortgage Protection"
            },
            {
              key: "college_funding",
              val: "College Funding"
            },
            {
              key: "income_replacement",
              val: "Income Replacement"
            }
          ],
          text: "We offer Solutions, applications, delivery.."
        }
      },
      responses: [] //user's choices
    };
  }
  details = {
    name: "",
    email: ""
  };
  appService = new AppService();

  handleBotFormsubmit = async userDetails => {
    this.sendOnlineStatus(userDetails);
    this.details = userDetails;
    const userName = userDetails.name;
    const userEmail = userDetails.email;

    await this.setState({
      userDetails,
      username: userName,
      email: userEmail,
      anything: "yyy",
      collectUserInfo: false,
      userIsKnown: true,
      canListen: true
    });
    this.searchTree("start", `Thanks ${this.state.username}`);
    this.setDelayListener();
  };
  render() {
    return (
      <div>
        <div
          className="chat-history"
          style={{ backgroundColor: this.state.defaultStyle.botBodyFillColor }}
        >
          {this.isThinking()}
          <ul id="chat_list">{this.renderConversation()}</ul>

          <div id="chat_bottom"></div>
        </div>
      </div>
    );
  }
  determineLister() {}

  getBrowser = () => {
    let browser = "";
    switch ("true") {
      case isChrome.toString():
        browser = "Chrome";
        break;
      case isFirefox.toString():
        browser = "Firefox";
        break;
      case isOpera.toString():
        browser = "Opera";
        break;
      case isIE.toString():
        browser = "IE";
        break;
      case isEdge.toString():
        browser = "Edge";
        break;
      default:
        browser = "Safari";
        break;
    }
    console.log("browser:", browser);
    this.setState({ browser });
  };

  componentDidMount = async () => {
    this.getBrowser();
    console.log("bot id", this.props.settings._id);
    // console.log("chat body", this.props.chat_body);
    // console.log("windows location href", window.location.href);
    // console.log("document referer", document.referrer);
    // this.determineLister()
    if (this.props.settings.collectUserInfo) {
      await this.setState({
        canListen: false,
        collectUserInfo: true,
        chat_body: this.props.chat_body
      });
    }
    this.getConversationTree();
  };

  componentWillReceiveProps(newProps) {
    const userInput = newProps.userInput;
    if (userInput && userInput !== this.props.userInput) {
      const key = this.searchKeywordsFromUserInput(userInput);
      this.updateConverstion(key, userInput);
    }
    this.setState({
      defaultStyle: newProps.settings.templateSettings
    });
  }

  /**\
   * This method get a company's conversation tree by company Id
   */
  getConversationTree = async (companyId = null) => {
    console.log("convo tree", this.state.chat_body);
    /**
     * The companyId is gotten from the domain name. But for now it is not passed
     */

    // const convoTree = await this.appService.getConversationTree('tree');  This is your main API function for convo tree

    const convoTree = this.state.chat_body;
    convoTree[0].prompt = `Thanks ${this.state.username} ${convoTree[0].prompt}`;
    const conversationTree = this.deepCopy(convoTree);
    await this.setState({
      conversationTree: conversationTree
    });
    this.updateConverstion(convoTree[0].identity);
  };

  handleUserChoice = () => {};

  /**
   * This method searches the conversation tree
   * to match  bot response, but returns a default message if match fails;
   */
  sendOnlineStatus = userDetails => {
    console.log("lead", userDetails);
    const leads = { ...userDetails };
    leads.location = this.state.visitor.city;
    if (!this.state.online) {
      this.props.socketIo.emit("msgToServer", {
        visitor: this.state.visitor,
        botId: this.props.botId,
        lead: leads,
        conversations: this.state.conversations
      });
      console.log("settingss", this.props.botId);
      // this.props.socketIo.on("msgToClient", message => {});
      this.setState({ online: true });
    }
  };

  getDate = () => {
    const time = new Date();
    return `${time.getMonth() +
      1}/${time.getDate()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  };
  searchTree = (key, info = null) => {
    if (this.state.fetchUserInfo) {
      fetch(
        "http://api.ipstack.com/197.210.47.58?access_key=8b9d64d8dc53ce80c405b22daf7fe5a5&format=1"
      )
        .then(data => data.json())
        .then(visitor => {
          this.setState({ fetchUserInfo: false });
          visitor.time = this.getDate();
          visitor.browser = this.state.browser;
          this.setState({ fetchUserInfo: false, visitor });
          console.log("visitor:", visitor);
        })
        .catch(error => {
          console.log("request error", error);
        });
    }

    const result = this.state.conversationTree.filter((node, index) => {
      if (info && index === 0) {
        node.prompt = `${info} ${node.prompt}`;
      }
      // console.log("Serach tree Calling::", this.state.username);
      return node.identity === key;
    });

    return result.length > 0 ? result[0] : this.searchTree("empty");
  };

  /**
   * This method renders response buttons
   *
   */
  renderChatButtons = buttons => {
    return buttons.map(button => {
      return (
        <button
          style={{
            backgroundColor: this.state.defaultStyle.optionFillColor,
            borderRadius: this.state.defaultStyle.optionBorderRadius,
            border: `${this.state.defaultStyle.optionBorder} solid ${this.state.defaultStyle.optionBorderColor}`,
            color: this.state.defaultStyle.optionTextColor
          }}
          key={this.setUniqueKey(button.key, "b")}
          type="button"
          className="ith_chat-button"
          onClick={() => {
            this.updateConverstion(button.key, button.val);
            this.sendOnlineStatus();
          }}
        >
          {button.val}
        </button>
      );
    });
  };
  conversations = [];
  saveConversation = content => {
      
    this.conversations.push(content);
    this.props.socketIo.emit("updateConversation", this.conversations);
  };

  /**
   * This method updates the UI converstion
   */

  updateConverstion = (key, val = null) => {
    const choices = this.deepCopy(this.state.responses);
    console.log("time of cht", this.setTimeOfChat());
    if (val) {
      const userChoice = {
        selection: val,
        time: this.setTimeOfChat()
      };
      choices.push(userChoice);
      
      this.saveConversation({
        from: "user",
        timeStamp: this.setTimeOfChat(),
        name: "You",
        message: val
      });
    }

    this.setState({
      thinking: true,
      responses: choices
    });
    this.props.getResponder(true);
    //this set timeout forces the  update scrollbar function
    setTimeout(() => {
      this.updateScrollbar();
    }, 10);

    this.refreshConvo(key, choices);
  };

  refreshConvo = (key, choices) => {
    const responses = this.deepCopy(choices);
    const times = this.deepCopy(this.state.times);
    times.push(this.setTimeOfChat());
    let info = null;
    if (this.state.username) {
      info = `Thanks ${this.state.username}`;
    }
    const searchResult = this.searchTree(key, info);
    responses.push(searchResult);
    console.log("refreshing result", searchResult);
    this.saveConversation({
      from: "bot",
      name: this.props.settings.chatbotName,
      message: searchResult.prompt,
      buttons: searchResult.response.buttons,
      timeStamp: this.setTimeOfChat()
    });
    this.restartTimer();
    const timeOutTime = this.delayChat(searchResult.prompt);
    setTimeout(() => {
      this.setState({
        responses: responses,
        times: times,
        thinking: false
      });
      this.props.getResponder(false);

      this.updateScrollbar();
    }, timeOutTime);
  };

  /**
   * This method restarts the delay timer
   */
  restartTimer = () => {
    this.setState({
      chatTimer: 1
    });
    clearInterval(this.state.typingTimer);
    this.setDelayListener();
  };

  /**
   * This method sets a unique key for mappimg ui elements
   */

  setUniqueKey = (id, l = "li") => {
    return `${Date.now()}${Math.random()}${id}${l}`;
  };
  renderConversation;
  /**
   * This method creates a detached (deep) copy of a variable
   */

  deepCopy = variable => {
    return JSON.parse(JSON.stringify(variable));
  };

  /**
   * This method sets delay for bot response
   */

  delayChat = prompt => {
    const noOfWords = prompt.split(" ").length;
    const time = noOfWords * 250;
    const delayTime = time > 10000 ? 10000 : time;

    return delayTime;
  };
  /**
   * This method renders the UI converstion
   */
  renderConversation = () => {
    // console.log("Render Calling::", this.state.username, "ggdgd");
    let now = new Date();
    let time = now.getTime();

    if (this.state.collectUserInfo) {
      return (
        <BotForm
          handleBotFormsubmit={this.handleBotFormsubmit}
          settings={this.props.settings}
          botMessageFillColor={this.state.defaultStyle.botMessageFillColor}
        />
      );
    }

    return this.state.responses.map((convo, index) => {
      return (
        <li key={this.setUniqueKey(convo.id)}>
          {!convo.selection ? (
            <React.Fragment>
              <div className="bot-div">
                <div className="message-data">
                  <span className="message-data-name">
                    <i
                      className="fa fa-circle"
                      style={{
                        color: this.state.defaultStyle.botOnlineFillColor
                      }}
                    ></i>{" "}
                    <span
                      style={{
                        color: this.state.defaultStyle.botOnlineNameTextColor
                      }}
                    >
                      {this.props.settings.chatbotName}
                    </span>
                  </span>
                  <span
                    className="message-data-time"
                    style={{
                      color: this.state.defaultStyle.botOnlineTimeTextColor
                    }}
                  >
                    {this.state.times[index] || "Now"}
                  </span>
                </div>
                <div className="content row" style={{}}>
                  <div
                    className="col-md-10 message other-message"
                    id="chat_box"
                    style={{
                      backgroundColor: this.state.defaultStyle
                        .botMessageFillColor,
                      borderRadius: this.state.defaultStyle
                        .botMessageBorderRadius,
                      border: `${this.state.defaultStyle.botMessageBorder} solid ${this.state.defaultStyle.botMessageBorderColor}`,
                      color: this.state.defaultStyle.botMessageTextTextColor
                    }}
                  >
                    <div>
                      {/* <div style={{ background: "green" }}>
                      </div> */}
                      <span
                        style={{
                          color: this.state.defaultStyle.botMessageTextTextColor
                        }}
                      >
                        {convo.prompt}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-1 triangle-left" style={{}}>
                    <div style={{ marginTop: "0px" }}>
                      <Triangle
                        color={this.state.defaultStyle.botMessageFillColor}
                        direction="right"
                        size="35px"
                      />
                    </div>
                  </div>
                </div>
                <div className="button_container">
                  {this.renderChatButtons(convo.response.buttons)}
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div className="response-div">
              <div className="message-data">
                <span className="message-data-name">
                  <i
                    className="fa fa-circle online"
                    style={{
                      color: this.state.defaultStyle.userOnlineFillColor
                    }}
                  ></i>{" "}
                  <span
                    style={{
                      color: this.state.defaultStyle.userOnlineNameTextColor
                    }}
                  >
                    You
                  </span>
                </span>
                <span
                  className="message-data-time"
                  style={{
                    color: this.state.defaultStyle.userOnlineTimeTextColor
                  }}
                >
                  {convo.time}
                </span>
              </div>
              <div className="row content">
                <div className="col-md-1 triangle-left" style={{}}>
                  <div style={{ marginLeft: "10px", marginTop: "10px" }}>
                    <Triangle
                      color={this.state.defaultStyle.userMessageFillColor}
                      direction="left"
                      size="15px"
                    />
                  </div>
                </div>
                <div
                  className="col-md-10 message  my-message"
                  id="chat_box"
                  style={{
                    backgroundColor: this.state.defaultStyle
                      .userMessageFillColor,
                    borderRadius: this.state.defaultStyle
                      .userMessageBorderRadius,
                    border: `${this.state.defaultStyle.userMessageBorder} solid ${this.state.defaultStyle.userMessageBorderColor}`,
                    color: this.state.defaultStyle.userMessageTextTextColor
                  }}
                >
                  <div>
                    {/* <span className="b-triangle"></span> */}
                    <span className="user-choice">{convo.selection}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>
      );
    });
  };

  /**
   * This method set's time of  choice
   *
   */

  setTimeOfChat() {
    const today = new Date();
    const hour = today.getHours();
    const suffix = +hour < 12 ? "AM" : "PM";
    return `${hour} : ${today.getMinutes()}  ${suffix}`;
  }

  renderUserChoice = (key = null) => {
    // return (<div>What </div>
    // )
    // return;
    // const ul = document.getElementById('chat_list').lastChild;
    // const div = document.createElement('div');
    // div.className = 'user_message'
    // const text = document.createTextNode(key);
    // div.appendChild(text);
    // ul.appendChild(div);
    // return ul;
  };

  /**
   * This method updates the scrollbar to follow conversation
   *
   */
  updateScrollbar = () => {
    const scrollBar = document.getElementById("chat_bottom");
    if (scrollBar && this.state.userIsKnown) {
      scrollBar.scrollIntoView({ behavior: "smooth" });
    }
  };

  isThinking = () => {
    return this.state.thinking ? (
      <img src={thinker} className="thinker loader" />
    ) : null;
  };

  /**
   * This method searches user input keywords and returns a search key
   * Please search organization keywords
   */

  searchKeywordsFromUserInput = input => {
    const userInput = input ? input.toLowerCase() : "";
    const conversationTree = this.deepCopy(this.state.conversationTree);
    const treeNodes = conversationTree.map(node => {
      return node.identity
        ? node.identity
            .toLowerCase()
            .split("_")
            .join(" ")
        : "";
    });
    const userInputArray = userInput.split(" ");
    for (let i = 0; i < userInputArray.length; i++) {
      const keywordIndex = treeNodes.indexOf(
        this.checkMultiWordSearch(userInputArray, i)
      );
      if (keywordIndex > -1) {
        return treeNodes[keywordIndex].split(" ").join("_");
      }
    }
    return "empty";
  };

  checkMultiWordSearch = (userInputArray, i) => {
    return userInputArray.length > 0
      ? userInputArray.join(" ")
      : userInputArray[i];
  };

  /**
   * This method prompts the user if they have stayed dormant for a while
   */

  promptUser = (refreshTimer = false) => {
    return refreshTimer ? this.updateConverstion("delay_prompt") : null;
  };

  /**
   * This method sets the delay listener that checks user activity
   */

  setDelayListener = () => {
    if (this.state.canListen) {
      const typingTimer = setInterval(() => {
        let timer = this.deepCopy(this.state.chatTimer); //get initial delay time
        const refreshTimer =
          timer >= (this.props.settings.delayTime + 0 || 60000); //delay of 60 seconds
        timer += 1000;
        this.setState({ chatTimer: timer });
        this.promptUser(refreshTimer);
      }, 1000);

      this.setState({
        typingTimer: typingTimer
      });
    }
  };
}
