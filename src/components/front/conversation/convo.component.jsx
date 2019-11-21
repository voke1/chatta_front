import React, { Component } from "react";
import "./convo.component.css";
import thinker from "../../../thinker.gif";
import { AppService } from "../../../services/app.service";
import $ from "jquery";
import JsonTree from "./convo.json";
import axios from "axios";

export default class Convo extends Component {
  appService;
  state = {
    conversationTree: [],
    chatTimer: 1,
    typingTimer: null,
    times: [],
    userChoices: [],
    thinking: false,
    self: true,
    tree: [],
    emeka: "",
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
  appService = new AppService();

  render() {
    return (
      <div>
        <div className="chat-history">
          {this.isThinking()}
          <ul id="chat_list">{this.renderConversation()}</ul>

          <div id="chat_bottom"></div>
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    this.getConversationTree();
    this.setDelayListener();
  };

  componentWillReceiveProps(newProps) {
    const userInput = newProps.userInput;
    if (userInput && userInput !== this.props.userInput) {
      const key = this.searchKeywordsFromUserInput(userInput);
      this.updateConverstion(key, userInput);
    }
  }

  /**\
   * This method get a company's conversation tree by company Id
   */
  getConversationTree = (companyId = null) => {
    /**
     * The companyId is gotten from the domain name. But for now it is not passed
     */

    // const convoTree = await this.appService.getConversationTree('tree');  This is your main API function for convo tree

    axios
      .get("http://localhost:9000/tree/")
      .then(res => {
        console.log(res.data[res.data.length - 1].chat_body);
        // const convoTree = res.data[res.data.length - 1].chat_body;
        const convoTree = res.data[res.data.length - 1].chat_body;
        setTimeout(() => {
          const conversationTree = this.deepCopy(convoTree);
          this.setState({
            conversationTree: conversationTree
          });
          this.updateConverstion(
            convoTree[0].identity
          );
        }, 10);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleUserChoice = () => {};

  /**
   * This method searches the conversation tree
   * to match  bot response, but returns a default message if match fails;
   */
  searchTree = key => {
    const result = this.state.conversationTree.filter(node => {
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
          key={this.setUniqueKey(button.key, "b")}
          type="button"
          className="ith_chat-button"
          onClick={() => this.updateConverstion(button.key, button.val)}
        >
          {button.val}
        </button>
      );
    });
  };

  /**
   * This method updates the UI converstion
   */

  updateConverstion = (key, val = null) => {
    const choices = this.deepCopy(this.state.responses);

    if (val) {
      const userChoice = {
        selection: val,
        time: this.setTimeOfChat()
      };
      choices.push(userChoice);
    }
    this.setState({
      thinking: true,
      responses: choices
    });
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
    responses.push(this.searchTree(key));
    this.restartTimer();
    this.delayChat();
    setTimeout(() => {
      this.setState({
        responses: responses,
        times: times,
        thinking: false
      });
      this.updateScrollbar();
    }, this.delayChat());
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

  /**
   * This method creates a detached (deep) copy of a variable
   */

  deepCopy = variable => {
    return JSON.parse(JSON.stringify(variable));
  };

  /**
   * This method sets delay for bot response
   */

  delayChat = () => {
    const period = Math.floor(Math.random() * 10);
    const delay = period > 4 ? 3 : period;
    console.log("Delay ::", delay);
    return delay * 1000;
  };
  /**
   * This method renders the UI converstion
   */
  renderConversation = () => {
    let now = new Date();
    let time = now.getTime();
    return this.state.responses.map((convo, index) => {
      return (
        <li key={this.setUniqueKey(convo.id)}>
          {!convo.selection ? (
            <React.Fragment>
              <div className="bot-div">
                <div className="message-data">
                  <span className="message-data-name">
                    <i className="fa fa-circle me"></i> chatta
                  </span>
                  <span className="message-data-time">
                    {this.state.times[index] || "Now"}
                  </span>
                </div>
                <div className="message other-message" id="chat_box">
                  <div>
                    <span className="a-triangle"></span>
                    {convo.prompt}
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
                  <i className="fa fa-circle online"></i> You
                </span>
                <span className="message-data-time">{convo.time}</span>
              </div>
              <div className="message  my-message" id="chat_box">
                <div>
                  <span className="b-triangle"></span>
                  <span className="user-choice">{convo.selection}</span>
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
    if (scrollBar) {
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
    const typingTimer = setInterval(() => {
      let timer = this.deepCopy(this.state.chatTimer);
      const refreshTimer = timer >= 60000; //delay of 60 seconds
      timer += 1000;
      this.setState({ chatTimer: timer });
      this.promptUser(refreshTimer);
    }, 1000);

    this.setState({
      typingTimer: typingTimer
    });
  };
}
