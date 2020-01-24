import React, { Component } from "react";
import "./css/botform.css";
import Triangle from "./triangle";

class BotForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  async onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.handleBotFormsubmit({
      name: this.state.name,
      email: this.state.email
    });
  };

  render() {
    return (
      <div>
        <span className="message-data-name">
          <i
            className="fa fa-circle me"
            style={{
              color: this.props.settings.templateSettings.botOnlineFillColor
            }}
          ></i>{" "}
          <span style={{color: this.props.settings.templateSettings.botOnlineNameFillColor}}>{this.props.settings.chatbotName}</span>
        </span>
        <div className="row">
          <div
            className="col-md-10 message other-message"
            id="chat_box"
            style={{
              marginBottom: "9px",
              overflow: "hidden",
              backgroundColor: this.props.settings.templateSettings
                .botMessageFillColor,
              color: this.props.settings.templateSettings
                .botMessageTextTextColor
            }}
          >
            <div>
              {/* <span className="a-triangle"></span> */}
              {`Hi. my name is ${this.props.settings.chatbotName}. Kindly fill in the form below in case anything goes wrong`}
            </div>
          </div>
          <div className="col-md-1 triangle-left" style={{}}>
            <div style={{ marginTop: "0px" }}>
              <Triangle
                color={this.props.settings.templateSettings.botMessageFillColor}
                direction="right"
                size="35px"
              />
            </div>
          </div>
        </div>

        <div className="">
          <div className="">
            <form className="text-center" onSubmit={this.onSubmit}>
              <div className="md-form">
                <input
                  type="text"
                  id="materialSubscriptionFormPasswords"
                  className="form-control"
                  onChange={this.onChange}
                  name="name"
                  value={this.state.name}
                  placeholder="Name"
                />
              </div>

              <div className="md-form">
                <input
                  type="email"
                  id="materialSubscriptionFormEmail"
                  className="form-control"
                  onChange={this.onChange}
                  name="email"
                  value={this.state.email}
                  placeholder="Email"
                />
              </div>

              <button
                class=" btn "
                id="formBtn"
                type="submit"
                style={{ backgroundColor: this.props.settings.secondaryColor }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BotForm;
