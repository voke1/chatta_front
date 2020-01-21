import React, { Component } from "react";

class BotBody extends Component {
  state = {
    template: {
      selected: "",
      hovered: "",
      styleSelected: "",
      border: "1.28",
      fontSize: "",
      borderColor: "#726B6E",
      fillColor: "#F79595",
      borderRadius: "1.28",
      textColor: "#666363",
      headerBorderColor: "",
      headerFillColor: "#444753",
      headerBorder: "0px",
      botNameTextColor: "#ffffff",
      botNameFontSize: "16px",
      botOnlineFillColor: "#7D95E9",
      botOnlineNameTextColor: "#000000",
      botOnlineTimeTextColor: "#AE9999",
      botMessageFillColor: "#ffffff",
      botMessageTextTextColor: "#504848",
      botMessageBorder: "0px",
      botMessageBorderColor: "",
      botBodyFillColor: "#ecede8",
      closeButtonTextColor: "#ffffff",
      closeButtonFontSize: "25.6px",
      userOnlineFillColor: "#1ECB78",
      userOnlineNameTextColor: "#000000",
      userOnlineTimeTextColor: "#AE9999",
      userMessageFillColor: "#E4F2B2",
      userMessageBorder: "0px",
      userMessageBorderColor: "",
      userMessageTextTextColor: "#504848",
      optionFillColor: "#ffffff",
      optionBorderColor: "#2B72FC",
      optionBorder: "1.2px",
      optionTextColor: "#020101",
      inputFillColor: "#ffffff",
      inputTextColor: "#463C3C",
      inputBorder: "1.28",
      inputBorderColor: "C5BABA",
      inputFontSize: "10px",
      botBodyBorderRadius: "0px",
      botMessageBorderRadius: "0px",
      userMessageBorderRadius: "0px",
      optionBorderRadius: "6.4px",
      inputBorderRadius: "0px",
      botImageBorderRadius: "50%",
      botBodyBorder: "1.28",
      showNotification: "no",
      timeOut: 8000,
      saveClass: "",
      switchTab: false,
      animation: ""
    }
  };
  componentWillReceiveProps(props) {
      const time = 1000
    console.log("props", props);
    this.setState({
      template: props.activeTemplate
    });
    if (props.animate) {
      this.setState({ animation: "pulse" });
    } else {
      this.setState({ animation: "" });
    }
    setTimeout(() => {
      props.setAnimate(false);
    }, time);
  }
  setElementHover = () => {};
  getBorder = () => {};
  onSelect = () => {};
  render() {
    return (
      <div
        className={`p-16 animated ${this.state.animation}`}
        style={{
          border: this.getBorder("botBody"),
          height: "428px",
          width: "256px",
          margin: "auto",
          marginTop: 25.6,
          paddingBottom: "25.6px"
        }}
        onMouseOver={event => {
          this.setElementHover(event, "botBody");
        }}
      >
        <div
          style={{
            backgroundColor: this.state.template.botBodyFillColor,
            border: `${this.state.botBodyBorder} solid ${this.state.template.botBodyBorderColor}`,
            borderRadius: this.state.template.botBodyBorderRadius,
            height: "424.96px"
          }}
          onClick={event => {
            event.stopPropagation();
            this.onSelect("botBody");
          }}
        >
          <div
            className="card"
            style={{
              height: "40.96px",
              borderRadius: 0
            }}
          >
            <div
              className="container"
              style={{
                border: this.getBorder("header")
              }}
              onMouseOver={event => {
                this.setElementHover(event, "header");
              }}
            >
              <div
                ref={header => (this.header = header)}
                id="header"
                data-tag="header"
                className="row header"
                style={{
                  backgroundColor: this.state.template.headerFillColor,
                  border: `${this.state.template.headerBorder} solid ${this.state.template.headerBorderColor}`
                }}
                onClick={event => {
                  event.stopPropagation();
                  this.onSelect("header");
                }}
              >
                <div className="col-sm-8" style={{ height: "40.96px" }}>
                  <div className="row">
                    <div className="col-sm-3">
                      <div
                        style={{
                          margin: "auto",
                          marginTop: "18%",
                          width: "fit-content",
                          border: this.getBorder("botImage")
                        }}
                        onClick={event => {
                          event.stopPropagation();
                          this.onSelect("botImage");
                        }}
                        onMouseOver={event => {
                          this.setElementHover(event, "botImage");
                        }}
                      >
                        <img
                          alt="bot img"
                          style={{
                            width: "30.72px",
                            height: "30.72px",

                            borderRadius: this.state.template
                              .botImageBorderRadius
                          }}
                          src="https://lh3.googleusercontent.com/-yYJZaf4v13w/XYt9Qyo3cmI/AAAAAAAAE1Q/F_NC0RglkoseC314FnaFeXEbRhYEdwwRACEwYBhgL/w138-h140-p/879195BF-5E43-443A-9404-FE29CACDF63F.jpeg"
                        ></img>
                      </div>
                    </div>
                    <div className="col-sm-5 p-0 m-0">
                      <div
                        style={{
                          color: this.state.template.botNameTextColor,
                          float: "left",
                          marginTop: "20%",
                          fontWeight: "bold",
                          marginLeft: 1.5,
                          fontSize: this.state.template.botNameFontSize,
                          border: this.getBorder("botName")
                        }}
                        onClick={event => {
                          event.stopPropagation();
                          this.onSelect("botName");
                        }}
                        onMouseOver={event => {
                          this.setElementHover(event, "botName");
                        }}
                      >
                        <span>Chris</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div
                    style={{
                      fontSize: this.state.template.closeButtonFontSize,
                      color: this.state.template.closeButtonTextColor,
                      margin: "auto",
                      float: "right",
                      marginTop: "10%",
                      border: this.getBorder("closeButton")
                    }}
                    onClick={event => {
                      event.stopPropagation();
                      this.onSelect("closeButton");
                    }}
                    onMouseOver={event => {
                      this.setElementHover(event, "closeButton");
                    }}
                  >
                    {" "}
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="botResponse"
            style={{
              width: "80%",
              height: "112.6px",
              float: "right",
              marginTop: 20.48,
              marginRight: 15.36
            }}
          >
            <div className="bot name time" style={{ display: "flex" }}>
              <div
                style={{
                  border: this.getBorder("botOnline")
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "botOnline");
                }}
              >
                <div
                  style={{
                    backgroundColor: this.state.template.botOnlineFillColor,
                    height: "6.656px",
                    width: "6.656px",
                    borderRadius: "50%",
                    marginTop: 5.6
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("botOnline");
                  }}
                ></div>
              </div>

              <div
                style={{
                  marginBottom: 3.2,
                  border: this.getBorder("botOnlineName")
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "botOnlineName");
                }}
              >
                <span
                  style={{
                    marginTop: 1.536,
                    marginLeft: 4.096,
                    fontWeight: "bold",
                    color: this.state.template.botOnlineNameTextColor,
                    cursor: "pointer",
                    fontSize: "8px"
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("botOnlineName");
                  }}
                >
                  Chris
                </span>
              </div>
              <div
                style={{
                  border: this.getBorder("botOnlineTime"),
                  marginBottom: 3.2
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "botOnlineTime");
                }}
              >
                <span
                  style={{
                    marginTop: 1.536,
                    marginLeft: 4.352,
                    color: this.state.template.botOnlineTimeTextColor,
                    cursor: "pointer",
                    fontSize: "8px"
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("botOnlineTime");
                  }}
                  onMouseOver={event => {
                    this.setElementHover(event, "botOnlineTime");
                  }}
                >
                  22 : 14 PM
                </span>
              </div>
            </div>
            <div
              style={{
                border: this.getBorder("botMessage"),
                width: "90%",
                float: "right",
                marginTop: 0.512
              }}
              onMouseOver={event => {
                this.setElementHover(event, "botMessage");
              }}
            >
              <div
                className=" card message"
                style={{
                  height: 51.2,

                  backgroundColor: this.state.template.botMessageFillColor,
                  border: `${this.state.template.botMessageBorder} solid ${this.state.template.botMessageBorderColor}`,
                  borderRadius: this.state.template.botMessageBorderRadius
                }}
                onClick={event => {
                  event.stopPropagation();
                  this.onSelect("botMessage");
                }}
              >
                <div
                  style={{
                    margin: "auto",
                    width: "90%",
                    color: this.state.template.botMessageTextTextColor,
                    border: this.getBorder("botMessageText"),
                    fontSize: "8.8px"
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("botMessageText");
                  }}
                  onMouseOver={event => {
                    this.setElementHover(event, "botMessageText");
                  }}
                >
                  <span>
                    Thanks John. Welcome to Chatta. The following are the
                    services that we offer
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  borderBottom: this.getBorder("option")
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "option");
                }}
              >
                <div
                  className="cardd"
                  style={{
                    marginTop: 66.56,
                    padding: 5.12,
                    backgroundColor: this.state.template.optionFillColor,
                    color: this.state.template.optionTextColor,
                    cursor: "pointer",
                    border: `${this.state.template.optionBorder} solid ${this.state.template.optionBorderColor}`,
                    borderRadius: this.state.template.optionBorderRadius,
                    fontSize: 8
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("option");
                  }}
                >
                  <span>Insurance</span>
                </div>
              </div>
              <div
                style={{
                  borderBottom: this.getBorder("option")
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "option");
                }}
              >
                <div
                  className="cardd"
                  style={{
                    marginTop: 66.56,
                    padding: 4.096,
                    backgroundColor: this.state.template.optionFillColor,
                    color: this.state.template.optionTextColor,
                    cursor: "pointer",
                    border: `${this.state.template.optionBorder} solid ${this.state.template.optionBorderColor}`,
                    marginLeft: 7.68,
                    borderRadius: this.state.template.optionBorderRadius,
                    fontSize: 8
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("option");
                  }}
                >
                  <span>Mortgage</span>
                </div>
              </div>
              <div
                style={{
                  borderBottom: this.getBorder("option")
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "option");
                }}
              >
                <div
                  className="cardd"
                  style={{
                    marginTop: 66.56,
                    padding: 5.12,
                    backgroundColor: this.state.template.optionFillColor,
                    color: this.state.template.optionTextColor,
                    cursor: "pointer",
                    border: `${this.state.template.optionBorder} solid ${this.state.template.optionBorderColor}`,
                    marginLeft: 7.68,
                    borderRadius: this.state.template.optionBorderRadius,
                    fontSize: 8
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("option");
                  }}
                >
                  <span>Loan</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="userResponse"
            style={{
              width: "80%",
              height: "64px",
              float: "left",
              marginTop: 6.4,
              marginLeft: 19.2
            }}
          >
            <div className="bot name time" style={{ display: "flex" }}>
              <div
                style={{
                  border: this.getBorder("userOnline")
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "userOnline");
                }}
              >
                <div
                  style={{
                    backgroundColor: this.state.template.userOnlineFillColor,
                    height: "6.656px",
                    width: "6.656px",
                    borderRadius: "50%",
                    marginTop: 3.2
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("userOnline");
                  }}
                ></div>
              </div>
              <div
                style={{
                  marginBottom: 3.2,
                  border: this.getBorder("userOnlineName")
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "userOnlineName");
                }}
              >
                <span
                  style={{
                    marginTop: 1.536,
                    marginLeft: 4.096,
                    fontWeight: "bold",
                    color: this.state.template.userOnlineNameTextColor,
                    cursor: "pointer",
                    fontSize: "8px"
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("userOnlineName");
                  }}
                >
                  You
                </span>
              </div>
              <div
                style={{
                  border: this.getBorder("userOnlineTime"),
                  marginBottom: 3.2
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "userOnlineTime");
                }}
              >
                <span
                  style={{
                    marginTop: 1.536,
                    marginLeft: 4.352,
                    color: this.state.template.userOnlineTimeTextColor,
                    cursor: "pointer",
                    fontSize: "8px"
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("userOnlineTime");
                  }}
                >
                  22 : 14 PM
                </span>
              </div>
            </div>
            <div
              style={{
                border: this.getBorder("userMessage"),
                width: "90%",
                float: "left",
                marginTop: 5.12,
                marginLeft: 0
              }}
              onMouseOver={event => {
                this.setElementHover(event, "userMessage");
              }}
            >
              <div
                className=" card message"
                style={{
                  height: 40.96,

                  backgroundColor: this.state.template.userMessageFillColor,
                  border: `${this.state.template.userMessageBorder} solid ${this.state.template.userMessageBorderColor}`,
                  borderRadius: this.state.template.userMessageBorderRadius
                }}
                onClick={event => {
                  event.stopPropagation();
                  this.onSelect("userMessage");
                }}
              >
                <div
                  style={{
                    margin: "auto",
                    width: "90%",
                    color: this.state.template.userMessageTextTextColor
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("userMessageText");
                  }}
                >
                  <div
                    style={{
                      border: this.getBorder("userMessageText"),
                      fontSize: "8.8px"
                    }}
                    onMouseOver={event => {
                      this.setElementHover(event, "userMessageText");
                    }}
                  >
                    <span>I want to buy Insurance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="botResponse"
            style={{
              width: "80%",
              height: "112px",
              float: "right",
              marginTop: 20.48,
              marginRight: 15.36
            }}
          >
            <div className="bot name time" style={{ display: "flex" }}>
              <div
                style={{
                  border: this.getBorder("botOnline")
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "botOnline");
                }}
              >
                <div
                  style={{
                    backgroundColor: this.state.template.botOnlineFillColor,
                    height: "6.656px",
                    width: "6.656px",
                    borderRadius: "50%",
                    marginTop: 5.6
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("botOnline");
                  }}
                ></div>
              </div>
              <div
                style={{
                  marginBottom: 3.2,
                  border: this.getBorder("botOnlineName")
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "botOnlineName");
                }}
              >
                <span
                  style={{
                    marginTop: 1.536,
                    marginLeft: 4.256,
                    fontWeight: "bold",
                    color: this.state.template.botOnlineNameTextColor,
                    cursor: "pointer",
                    fontSize: "8px"
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("botOnlineName");
                  }}
                >
                  Chris
                </span>
              </div>
              <div
                style={{
                  border: this.getBorder("botOnlineTime"),
                  marginBottom: 3.2
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "botOnlineTime");
                }}
              >
                <span
                  style={{
                    marginTop: 1.536,
                    marginLeft: 4.352,
                    color: this.state.template.botOnlineTimeTextColor,
                    cursor: "pointer",
                    fontSize: "8px"
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("botOnlineTime");
                  }}
                >
                  22 : 14 PM
                </span>
              </div>
            </div>
            <div
              style={{
                border: this.getBorder("botMessage"),
                width: "90%",
                float: "right",
                marginTop: 0.512
              }}
              onMouseOver={event => {
                this.setElementHover(event, "botMessage");
              }}
            >
              <div
                className=" card message"
                style={{
                  height: 51.2,

                  backgroundColor: this.state.template.botMessageFillColor,
                  border: `${this.state.template.botMessageBorder} solid ${this.state.template.botMessageBorderColor}`,
                  borderRadius: this.state.template.botMessageBorderRadius
                }}
                onClick={event => {
                  event.stopPropagation();
                  this.onSelect("botMessage");
                }}
              >
                <div
                  style={{
                    margin: "auto",
                    width: "90%",
                    color: this.state.template.botMessageTextTextColor,
                    border: this.getBorder("botMessageText"),
                    fontSize: "8.8px"
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("botMessageText");
                  }}
                  onMouseOver={event => {
                    this.setElementHover(event, "botMessageText");
                  }}
                >
                  <span>The following are our various insurance packages</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  borderBottom: this.getBorder("option")
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "option");
                }}
              >
                <div
                  className="cardd"
                  style={{
                    marginTop: 66.56,
                    padding: 5.12,
                    backgroundColor: this.state.template.optionFillColor,
                    color: this.state.template.optionTextColor,
                    cursor: "pointer",
                    border: `${this.state.template.optionBorder} solid ${this.state.template.optionBorderColor}`,
                    borderRadius: this.state.template.optionBorderRadius,
                    fontSize: 8
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("option");
                  }}
                >
                  <span>Comprehensive</span>
                </div>
              </div>
              <div
                style={{
                  borderBottom: this.getBorder("option")
                }}
                onMouseOver={event => {
                  this.setElementHover(event, "option");
                }}
              >
                <div
                  className="cardd"
                  style={{
                    marginTop: 66.56,
                    padding: 5.12,
                    backgroundColor: this.state.template.optionFillColor,
                    color: this.state.template.optionTextColor,
                    cursor: "pointer",
                    border: `${this.state.template.optionBorder} solid ${this.state.template.optionBorderColor}`,
                    marginLeft: 7.68,
                    borderRadius: this.state.template.optionBorderRadius,
                    fontSize: 8
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.onSelect("option");
                  }}
                >
                  <span>Individual</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="message-input "
            style={{
              width: "90%",
              margin: "auto",
              marginTop: 348,
              border: this.getBorder("input")
            }}
            onClick={event => {
              event.stopPropagation();
              this.onSelect("input");
            }}
            onMouseOver={event => {
              this.setElementHover(event, "input");
            }}
          >
            <input
              type="text"
              placeholder="  Type your message"
              style={{
                width: "100%",
                height: "20.48px",
                backgroundColor: this.state.template.inputFillColor,
                color: this.state.template.inputTextColor,
                border: `${this.state.template.inputBorder} solid ${this.state.template.inputBorderColor}`,
                cursor: "pointer",
                borderRadius: this.state.template.inputBorderRadius,
                fontSize: this.state.template.inputFontSize
              }}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}

export default BotBody;
