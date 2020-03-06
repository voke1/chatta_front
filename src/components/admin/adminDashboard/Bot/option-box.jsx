import React, { Component } from "reactn";
import Response from "./response";
import "./css/card.css";
import Accordion from "./accordion";
import uuid from "uuid/v1";
import ConvoTree from "../../../front/conversation/convo.json";
const identity = uuid();

class OptionBox extends Component {

  state = {
    responses: [],
    response: "",
    height: "0px",
    identity: "",
    prompt: "",
    validated: false,
    message: "",
    noOption: false,
    keyy: this.props.keyy,
    amount: this.props.amount,
  };

  initialResponses = [];
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, validated: false });
    const validated = this.checkDuplicate(e);
    this.setState({
      validated: validated.success,
      message: validated.message,
    });
    if (
      e.target.name === "prompt" &&
      (!e.target.value.length || !this.state.response)
    ) {
      this.setState({ validated: false });
    }
    if (e.target.name === "response" && !e.target.value.length) {
      this.setState({ validated: false });
    }
  };

  getResponse = (tree)=>{
    if (!tree.botId && this.props.keyy && this.props.amount) {
      console.log("pushing");
      return this.initialResponses.push({
        key: uuid(),
        val: this.state.response,
        payment: { "paystackkey": this.state.keyy, "price": this.state.amount }
      });
    } else if (!tree.botId) {
      this.initialResponses.push({
        key: uuid(),
        val: this.state.response,
      });
    }
  }
  onClick = tree => {
    console.log("tree of life", tree);
    console.log("key", this.state.keyy, "amount", this.state.amount)
    if (tree.val) {
      this.initialResponses.push(tree);
    } else {
      this.getResponse(tree)
    }

    this.props.syncHeight(this.state.height + this.divElement.clientHeight);
    this.setState({
      responses: this.initialResponses,
      response: "",
      height: this.divElement.clientHeight,
      validated: false
    });
    const botTree = {
      identity: this.state.identity,
      prompt: this.state.prompt,
      response: {
        buttons:
          this.state.response || tree.action ? [...this.initialResponses] : [],
        text: ""
      }
    };
    if (!tree.val) {
      this.props.syncTree(botTree);
      if (tree.botId) {
        this.props.syncTree(botTree, null, null, {
          botId: tree.botId,
          action: tree.action.type,
          text: tree.action.text
        });
      }
    }
  };

  checkDuplicate = event => {
    const isFound = this.initialResponses.filter(
      response =>
        response.val.trim().toLowerCase() ===
        event.target.value.trim().toLowerCase()
    );

    if (isFound.length) {
      let message;
      if (event.target.value.length > 30) {
        message = event.target.value.substr(0, 30) + "...";
      } else message = event.target.value;
      return {
        success: false,
        message: `"${message}" already exists as an option`
      };
    }
    return {
      success: true,
      message: ""
    };
  };
  modifyOption = (botId, action) => {
    console.log("this is global", this.global);
    if (action.type === "delete") {
      const button = this.initialResponses.filter(
        button => button.key === botId
      );
      this.initialResponses.splice(this.initialResponses.indexOf(button[0]), 1);
      this.onClick({ botId, action });
    }
    if (action.type === "edit") {
      const button = this.initialResponses.filter(
        button => button.key === botId
      );
      button[0].val = action.text;
      this.onClick({ botId, action });
      this.global.findAndEdit(botId, action.text);
    }
  };

  render() {
    return (
      <div ref={divElement => (this.divElement = divElement)}>
        <div className="option-box">
          <div
            style={{
              marginLeft: "40px",
              marginRight: "100px",
              marginTop: "15px"
            }}
            className="form-group"
          >
            <input
              className="form-control border-top-0 border-right-0 border-left-0"
              placeholder={"New prompt"}
              name="prompt"
              value={this.state.prompt}
              onChange={this.onChange}
              style={{ width: "300px" }}
            ></input>
            {this.state.responses.map(res => {
              return (
                <Accordion
                  key={res.key}
                  botKey={res.key}
                  res={res.val}
                  identity={res.key}
                  syncTree={this.props.syncTree}
                  prompt={this.state.prompt}
                  chatTree={this.props.chatTree}
                  modifyOption={this.modifyOption}
                />
              );
            })}
            <div className="form-inline">
              <input
                className="form-control border-top-0 border-right-0 border-left-0"
                placeholder="Add option"
                name="response"
                value={this.state.response}
                onChange={this.onChange}
                style={{ width: "300px" }}
                disabled={this.state.noOption}
              ></input>
              <div style={{ width: "10%" }}>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() =>
                    this.onClick({ response: this.state.response })
                  }
                  style={{ backgroundColor: "#ededed", color: "#5b616b" }}
                  disabled={!this.state.validated}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.message ? (
          <div
            className="animated shake"
            style={{ float: "left", marginLeft: "10px", color: "red" }}
          >
            <p>{this.state.message}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height: height, identity: this.props.botKey , keyy: this.props.keyy, amount: this.props.amount});
    if (this.props.chatTree) {
      this.props.chatTree.forEach(tree => {
        if (tree.identity === this.props.botKey) {
          tree.response.buttons.forEach(button => {
            setTimeout(() => {
              this.onClick(button);
              this.setState({ prompt: tree.prompt });
            }, 10);
          });
        }
      });
    }
  }
}
export default OptionBox;
