import axios from "axios";
import React, { Component } from "reactn";
import BotForm from "../../../components/admin/adminDashboard/Bot/botForm";
import { APP_ENVIRONMENT } from "../../../environments/environment";
import { defaultStyle } from "../chat/defaultStyle";
import Triangle from "../../../components/admin/adminDashboard/Bot/triangle";
import { AppService } from "../../../services/app.service";
import * as apiService from "../../../services/apiservice";
import thinker from "../../../thinker.gif";
import Axios from 'axios'
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
  isSafari,
} from "react-device-detect";
import PaystackButton from 'react-paystack';


const BASE_URL = APP_ENVIRONMENT.base_url;

export default class Convo extends Component {
  appService;
  static userName;
  constructor(props) {
    super(props);
    this.state = {
      closeChat: false,
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
      pay: false,
      email: "",
      fetchUserInfo: true,
      defaultStyle: defaultStyle,
      userDetails: {},
      paymentDetails: {},
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

  paystackCallback = (response) => {
    console.log("myresponse", response); // card charged successfully, get reference here
    const paymentObject = {
      "botId": this.props.settings._id,
      "name": this.state.userDetails.name,
      "email": this.state.userDetails.email,
      "amount": this.state.paymentDetails.amount,
      "message": response.message,
      "reference": response.reference,
      "status": response.status,      
    }
   
    Axios.post(`http://localhost:9000/payment`, {
      ...paymentObject
    })
      .then(res => {
        console.log(res)
        
      })
      .catch(err => {
        console.log(err);
      });






    // this.refreshConvo()
  }

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
          style={{
            backgroundColor: this.state.defaultStyle.botBodyFillColor
          }}
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
    await this.getBrowser();
    await this.getUserData();

    console.log("bot id", this.props.settings._id);
    // console.log("chat body", this.props.chat_body);
    // console.log("windows location href", window.location.href);
    // console.log("document referer", document.referrer);
    // this.determineLister()
    if (this.props.settings.collectUserInfo) {
      await this.setState({
        canListen: true,
        collectUserInfo: true,
        chat_body: this.props.chat_body
      });
    }
    this.getConversationTree();
  };

  async componentWillReceiveProps(newProps) {
    const userInput = newProps.userInput;
    console.log("newuserinput:", userInput)
    if (userInput && userInput !== this.props.userInput) {
      const key = this.searchKeywordsFromUserInput(userInput);
      
      const find_key = (await this.setUserDetails(userInput)) || key;
      
      console.log("comporecieveprops called, newProps is: ", newProps, "and find_key is:", find_key)
      this.updateConverstion(find_key, userInput);
      console.log("called after updateconversation");
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
    const firstConvo = convoTree[0];

    convoTree[0].prompt = `Thanks ${this.state.username} ${convoTree[0].prompt}`;
    const conversationTree = this.deepCopy(convoTree);
    console.log("rez3", conversationTree);
    if (this.count === 0) {
      conversationTree[0].prompt = `Hi my name is ${this.props.settings.chatbotName}. What's your name?`;
      conversationTree[0].response.buttons = [];
    }
    await this.setState({
      conversationTree: conversationTree,
      firstConvo
    });
    this.updateConverstion(convoTree[0].identity);
    console.log("TREE:", convoTree[0].identity, )
    
  };

  handleUserChoice = () => {};

  /**
   * This method searches the conversation tree
   * to match  bot response, but returns a default message if match fails;
   */
  sendOnlineStatus = (userDetails, visitor) => {
    console.log("lead", userDetails);
    const leads = { ...userDetails };
    leads.location = this.state.visitor.city;
    if (!this.state.online) {
      this.props.socketIo.emit("msgToServer", {
        visitor,
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
  getUserData = () => {
    if (this.state.fetchUserInfo) {
      fetch(
        "http://api.ipstack.com/197.210.227.104?access_key=b1a656a166707d7810e3dc4229cda8ec&format=1"
      )
        .then(data => data.json())
        .then(visitor => {
          this.setState({ fetchUserInfo: false });
          visitor.time = this.getDate();
          visitor.browser = this.state.browser;
          this.setState({ fetchUserInfo: false, visitor });
          this.sendOnlineStatus({}, visitor);
          console.log("visitor:", visitor);
        })
        .catch(error => {
          console.log("request error", error);
        });
    }
  };
  searchTree = (key, info = null, payment) => {
    if (key === "empty") this.error += 1;
    const result = this.state.conversationTree.filter((node, index) => {
      if (info && index === 0) {
        node.prompt = `${info} ${node.prompt}`;
      }
      // console.log("Serach tree Calling::", this.state.username);
      return node.identity === key;
    });

    // if (this.count === 1) {
    //   result[0].prompt = `Thanks ${this.state.userDetails.name}... and your email address ?`;
    //   result[0].response.buttons = [];
    // }

    return result.length > 0 ? result[0] : this.searchTree("empty");
  };

  /**
   * This method renders response buttons
   *
   */
  renderChatButtons = buttons => {
    return buttons.map(button => {
      {console.log("searchbutton:", button)}
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
            this.updateConverstion(button.key, button.val, button.payment);
            this.sendOnlineStatus();
            this.closeChatCount = 0;
          }}
        >
          {button.val}
        </button>
      );
    });
  };
  conversations = [];
  error = 0;
  saveConversation = content => {
    content.error = this.error;
    this.conversations.push(content);
    this.props.socketIo.emit("updateConversation", this.conversations);
  };

  /**
   * This method updates the UI converstion
   */

  updateConverstion = (key, val = null, payment) => {
    const choices = this.deepCopy(this.state.responses);
    if (val) {
      const userChoice = {
        selection: val,
        time: this.setTimeOfChat(),
        
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
      responses: choices,
    });

    console.log("responder:", this.state.response)
    this.props.getResponder(true);
    //this set timeout forces the  update scrollbar function
    setTimeout(() => {
      this.updateScrollbar();
    }, 10);

    this.refreshConvo(key, choices, payment);
  };
  randomizeResponse = (key, type) => {
    const index = Math.floor(Math.random() * 4);
    const name = this.state.userDetails.name;
    const responses = {
      delay_prompt: {
        name: [
          "Hello ? Could you type your name below ?",
          "I haven't got your name yet. Could you leave your name below ?",
          "I am yet to get your name. Kindly enter your name below",
          "Are you there ? Please tell me your name",
          "Hello there. What's your name ?"
        ],
        email: [
          `Hello ${name ? name : "there"}. What's your email address ?`,
          ` ${name ? name : ""} Are you there ? Your email address please ?`,
          `I haven't got your email ${name ? name : ""}. Kindly type it below`,
          `Hi ${
            name ? name : ""
          }...You haven't been responsive. I will need your email address so we can proceed`,
          `Hi ${name ? name : "there"}. Kindly respond with your email`
        ],
        random: [
          `Hello ${name ? name : "there"}. Are you there ?`,
          ` ${name ? name : ""} Are you still online ?`,
          `I haven't got any response ${name ? name : ""}. Are you there ?`,
          `Hi ${name ? name : ""}. Are you with me ?`,
          `Hi ${name ? name : "there"}. You there ?`
        ],
        offline: {
          withEmail: [
            `Hello ${
              name ? name : "there"
            }. We noticed you've been away for a while.
          One of our agents will contact you shortly via the email address you provided. Kindly leave us a feedback below`,
            `Hi ${
              name ? name : "there"
            }. We have sent you an email via the address you provided us. If you have further questions, kindly reply to the email we sent you`,
            `Hi ${
              name ? name : "there"
            }. It seems you've been offline for a while. Kindly check your inbox for a follow-up mail we just sent you. Have a nice day`,
            `Hello ${
              name ? name : "there"
            }. You've been away for a while. Your concerns mean a lot to us and we just sent you a mail just in case you'd want to contact one of our agents at your convenience. Thank you !`
          ],
          withoutEmail: [
            `Hello ${
              name ? name : "there"
            }. We noticed you've been away for a while. Since you didn't provide your email address, we'd like you to contact us via admin@ith.com for further enquiries. Have a nice day`,
            `Hello ${
              name ? name : "there"
            }. It seems you've been away. If you have further enquiries, kindly reach us via admin@ith.com. Have a good day!`,
            `Hi ${
              name ? name : "there"
            }. You've not been responding. Your concerns mean a lot to us. In case you'd like to reach us via mail, kindly send us a mail via amin@ith.com`,
            `Hi ${
              name ? name : "there"
            }. I haven't gotten any response from you. Feel free to reach us at admin@ith.com if you have more enquiries. Thanks and enjoy the rest of your day`
          ]
        }
      }
    };
    if (type === "offline") {
      if (this.state.userDetails.email) {
        return responses[key][type].withEmail[index];
      } else {
        return responses[key][type].withoutEmail[index];
      }
    }
    return responses[key][type][index];
  };
  closeChatCount = 0;
  refreshConvo = (key, choices, payment) => {
    let searchResult;
    if (!this.state.closeChat) {
      
      const responses = this.deepCopy(choices);
      
      const times = this.deepCopy(this.state.times);
      times.push(this.setTimeOfChat());
      let info = null;
      if (this.state.username) {
        info = `Thanks ${this.state.username}`;
      }
      
      if(key && choices){

        searchResult = this.searchTree(key, info, payment);
      }
      
      console.log("refreshConvo called,"+"searchResult is:");
      console.log("key is:", key, "choices", choices,"payment is:", payment)
      
      const index = searchResult.length - 1;
      
      if (searchResult.prompt && key === "delay_prompt") {
        if (this.count < 2) {
          if (this.count === 0) {
            searchResult.prompt = this.randomizeResponse(key, "name");
            searchResult.response.buttons = [];
            this.closeChatCount += 1;
          }
          if (this.count === 1) {
            searchResult.prompt = this.randomizeResponse(key, "email");
            searchResult.response.buttons = [];
            this.closeChatCount += 1;
          }
          if (this.closeChatCount === 3) {
            const name = this.state.userDetails.name;
            searchResult.prompt = this.randomizeResponse(key, "offline");
            searchResult.response.buttons = [];
            this.closeChatCount += 1;
            this.setState({ closeChat: true });
          }
        } else {
          if (this.closeChatCount < 3) {
            searchResult.prompt = this.randomizeResponse(key, "random");
            searchResult.response.buttons = [];
            this.closeChatCount += 1;
          } else {
            if (this.closeChatCount === 3) {
              searchResult.prompt = this.randomizeResponse(key, "offline");
              searchResult.response.buttons = [];
              this.closeChatCount += 1;
              this.setState({ closeChat: true });
            }
          }
        }
      }
      if (searchResult.prompt && key !== "delay_prompt" && payment) {

        if(key !== "empty"){
          console.log("mypayment", payment, "userdetails:", this.state.userDetails)
      this.setState({paymentDetails: payment})          

          searchResult = {
            identity: "payment",
            prompt: "payment",
            response: {
              buttons: [],
              text: ""
            }
          }
        }

      }
      if(!key && !choices && !payment){
        console.log("if statement reached")
        searchResult = {
          identity: "payment",
          prompt: "Congratulations!! payment is successfull. A payment receipt has been sent to your email",
          response: {
            buttons: [],
            text: ""
          }
        }

      }
      responses.push(searchResult);
      console.log("newresponse:", responses)
      console.log("refreshing result", searchResult);
      this.saveConversation({
        from: "bot",
        name: this.props.settings.chatbotName,
        message: searchResult.prompt,
        buttons: searchResult.response.buttons,
        timeStamp: this.setTimeOfChat()
      });
      this.restartTimer();
      const timeOutTime = this.delayChat(searchResult.prompt, payment);
      setTimeout(() => {
        this.setState({
          responses: responses,
          times: times,
          thinking: false
        });
        this.props.getResponder(false);

        this.updateScrollbar();
      }, timeOutTime);
    }
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

  delayChat = (prompt, payment) => {
    if(payment){
      return 
    }
    const noOfWords = prompt.split(" ").length;
    const time = noOfWords * 250;
    const delayTime = time > 10000 ? 10000 : time;
    

    return delayTime;
  };
  /**
   * This method renders the UI converstion
   */

  count = 0;
  setUserDetails = async value => {
    if (this.count < 2) {
      const identity = this.state.conversationTree[0].identity;
      const userDetails = {
        ...this.state.userDetails
      };
      const type = this.count === 0 ? "name" : "email";
      const kyObject = this.getKYCDetails(type, value);
      console.log('kycobject', kyObject)
      const conversationTree = [...this.state.conversationTree];
      conversationTree.push(kyObject);
      conversationTree.unshift(this.state.firstConvo);
      const find_key = type === "name" ? `kyc_${type}` : identity;
      console.log("kyc_object", find_key, kyObject, conversationTree);

      userDetails[type] = value;
      this.count += 1;
      this.closeChatCount = 0;
      await this.setState({
        userDetails,
        collectUserInfo: false,
        conversationTree,
        userIsKnown: true
      });

      if (this.count === 2) {
        const leads = this.state.userDetails;
        leads.location = this.state.visitor.city;
        this.props.socketIo.emit("updateLeads", leads);
      }
      return find_key;
    }
    return null;
  };
  renderConversation = () => {
    let now = new Date();
    let time = now.getTime();
console.log("consoleResponse:", this.state.responses)
    return this.state.responses.map((convo, index) => {
      // {console.log("CONVOSEARCH", convo.response.buttons[index].payment)}
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
                      {console.log("email details: ", this.state.email)}
                      {convo.prompt === "payment" ?<a>Please click {" "}<a style={{color: "blue"}}><PaystackButton
                        text="here"
                        class="payButton"
                        callback={this.paystackCallback}
                        // close={close}
                        email={this.state.userDetails.email}
                        amount={this.state.paymentDetails.amount || "500"}
                        paystackkey={"pk_test_5c136d07ea8e83e04f30445b866dbe50723c3975" || this.state.paymentDetails.paystackkey}
                        tag="a"
                      // embed={true}
                      /></a> to make payment</a>: <span
                        style={{
                          color: this.state.defaultStyle.botMessageTextTextColor
                        }}
                      >
                        {convo.prompt}
                      </span>}
                      
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
                  <div
                    style={{
                      marginLeft: "10px",
                      marginTop: "10px"
                    }}
                  >
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
    console.log("known", this.state.userIsKnown);
    const scrollBar = document.getElementById("chat_bottom");
    if (scrollBar && this.state.userIsKnown) {
      scrollBar.scrollIntoView({ behavior: "smooth" });
    }
  };

  isThinking = () => {
    return this.state.thinking ? (
      // <img src={thinker} className="thinker loader" />
      <div></div>
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
  getKYCDetails = (key, value) => {
    const kycDetails = {
      email: {
        identity: "kyc_email",
        prompt: "your mail is bal.balaj",
        response: {
          buttons: [],
          text: ""
        }
      },
      name: {
        identity: "kyc_name",
        prompt: `Thanks ${value}. Can I get your email ?`,
        response: {
          buttons: [],
          text: ""
        }
      }
    };
    return kycDetails[key];
  };
}
