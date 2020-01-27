import React, { Component } from "reactn";
import ReactTooltip from "react-tooltip";
import border from "../../../../border.png";
import "./css/bot-ui-template.css";
import Template from "./constants/bot-ui-template-state";
import * as ApiService from "../../../../services/apiservice";
import Notification from "../../../../utilities/notification/app-notification";
import Options from "./options";
import ColorPickerOverlay from "./color-picker-overlay";
import ProgressBar from "../Authentication/progressbar";
class BotUITemplate extends Component {
  state = Template;
  onSelect = name => {
    this.setState({
      selected: name,
      borderColor: this.state[`${name}BorderColor`] || this.state.borderColor,
      border: this.state[`${name}Border`] || this.state.border,
      borderRadius:
        this.state[`${name}BorderRadius`] || this.state.borderRadius,
      fillColor: this.state[`${name}FillColor`] || this.state.fillColor,
      textColor: this.state[`${name}TextColor`] || this.state.textColor,
      fontSize: this.state[`${name}FontSize`] || this.state.fontSize
    });
  };
  onSelectStyle = name => {
    this.setState({ styleSelected: name });
  };
  buildTemplate = (event, target) => {
    const name = event ? event.target.name : target.name;
    const value = event ? event.target.value : target.value;
    console.log("building template");
    this.setState({
      [this.state.selected + "" + name]: value,
      borderColor: name === "BorderColor" ? value : this.state.borderColor,
      borderRadius: name === "BorderRadius" ? value : this.state.borderRadius,
      border: name === "Border" ? value : this.state.border,
      fillColor: name === "FillColor" ? value : this.state.fillColor,
      textColor: name === "TextColor" ? value : this.state.textColor,
      fontSize: name === "FontSize" ? value : this.state.fontSize
    });
  };
  saveTemplate = async () => {
    console.log("save template called", this.state);
    this.setState({
      showNotification: "yes",
      saveClass: "disable-button",
      switchTab: true,
      notificationMessage: "Saved"
    });
    this.props.setTemplateSettings(this.state);
    this.props.changeState();
  };
  resetNotification = async () => {
    if (
      this.state.showNotification === "yes" &&
      this.global.getTab() !== "intent"
    ) {
      this.global.setTab("intent");
    }
    await this.setState({ showNotification: "no", saveClass: "" });
  };
  setElementHover = (event, name) => {
    event.stopPropagation();
    this.setState({ hovered: name });
  };
  getBorder = name => {
    return this.state.selected === name ||
      this.state.hovered === name ||
      this.state.styleSelected === name
      ? "2px solid #4c9ff9"
      : "2px solid transparent";
  };
  setBusyNotification = async () => {
    this.setState({
      showNotification: "yes",
      notificationMessage: "Applying design"
    });
  };
  componentWillReceiveProps = async props => {
    if (this.global.setDefaultTemplate) {
      await this.setState({
        ...this.global.activeTemplate
      });

      this.global.showImportOverlay(false);
      this.setGlobal({
        setDefaultTemplate: false
      });
      this.global.showBusyOverlay(false);
      this.global.setNotification("yes", "Applied successfully");
    }
  };
  componentDidMount() {
    this.setGlobal({ setBusyNotification: this.setBusyNotification });
  }
  render() {
    return (
      <div class="m-0 template">
        {this.state.showNotification === "yes" ? (
          <Notification
            show="yes"
            type={"success"}
            msg={this.state.notificationMessage}
            resetNotification={this.resetNotification}
            timeOut={4000}
          />
        ) : null}

        <div
          class="row"
          style={{ backgroundColor: "white" }}
          onClick={() => {
            this.global.showImportOverlay(false);
          }}
          onMouseOver={event => {
            event.stopPropagation();
            this.setElementHover(event, "xx");
          }}
        >
          <div
            class="col-md-8 p-0 bot-wrapper "
            onMouseOver={event => {
              event.stopPropagation();
              this.setElementHover(event, "botWrapper");
            }}
          >
            <div
              className="p-20"
              style={{
                border: this.getBorder("botBody"),
                height: "85%",
                width: "300px",
                margin: "auto",
                marginLeft: "600px",
                marginTop: "1%",
                paddingBottom: 0,
                height: "75%"
              }}
              onMouseOver={event => {
                this.setElementHover(event, "botBody");
              }}
            >
              <div
                style={{
                  backgroundColor: this.state.botBodyFillColor,
                  border: `${this.state.botBodyBorder} solid ${this.state.botBodyBorderColor}`,
                  borderRadius: this.state.botBodyBorderRadius,
                  height: "100%"
                }}
                onClick={event => {
                  event.stopPropagation();
                  this.onSelect("botBody");
                }}
              >
                <div
                  className="bot-header"
                  style={{
                    height: "15%",
                    borderRadius: 0
                  }}
                >
                  <div
                    className="container"
                    style={{
                      border: this.getBorder("header"),
                      height: "100%"
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
                        backgroundColor: this.state.headerFillColor,
                        border: `${this.state.headerBorder} solid ${this.state.headerBorderColor}`,
                        height: "100%"
                      }}
                      onClick={event => {
                        event.stopPropagation();
                        this.onSelect("header");
                      }}
                    >
                      <div className="col-sm-8" style={{ height: "100%" }}>
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
                                  width: "38.4px",
                                  height: "38.4px",

                                  borderRadius: this.state.botImageBorderRadius
                                }}
                                src="https://lh3.googleusercontent.com/-yYJZaf4v13w/XYt9Qyo3cmI/AAAAAAAAE1Q/F_NC0RglkoseC314FnaFeXEbRhYEdwwRACEwYBhgL/w138-h140-p/879195BF-5E43-443A-9404-FE29CACDF63F.jpeg"
                              ></img>
                            </div>
                          </div>
                          <div className="col-sm-5 p-0 m-0">
                            <div
                              style={{
                                color: this.state.botNameTextColor,
                                float: "left",
                                marginTop: "20%",
                                fontWeight: "bold",
                                marginLeft: 10,
                                fontSize: this.state.botNameFontSize,
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
                            fontSize: this.state.closeButtonFontSize,
                            color: this.state.closeButtonTextColor,
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
                    height: "25%",
                    float: "right",
                    marginTop: "4%",
                    marginRight: 19.2
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
                          backgroundColor: this.state.botOnlineFillColor,
                          height: "8.32px",
                          width: "8.32px",
                          borderRadius: "50%",
                          marginTop: 7
                        }}
                        onClick={event => {
                          event.stopPropagation();
                          this.onSelect("botOnline");
                        }}
                      ></div>
                    </div>

                    <div
                      style={{
                        marginBottom: 4,
                        border: this.getBorder("botOnlineName")
                      }}
                      onMouseOver={event => {
                        this.setElementHover(event, "botOnlineName");
                      }}
                    >
                      <span
                        style={{
                          marginTop: 1.92,
                          marginLeft: 5.12,
                          fontWeight: "bold",
                          color: this.state.botOnlineNameTextColor,
                          cursor: "pointer",
                          fontSize: "10px"
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
                        marginBottom: "1%"
                      }}
                      onMouseOver={event => {
                        this.setElementHover(event, "botOnlineTime");
                      }}
                    >
                      <span
                        style={{
                          marginTop: 8,
                          marginLeft: 5.44,
                          color: this.state.botOnlineTimeTextColor,
                          cursor: "pointer",
                          fontSize: "10px"
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
                      marginTop: "0.1%",
                      height: "39%"
                    }}
                    onMouseOver={event => {
                      this.setElementHover(event, "botMessage");
                    }}
                  >
                    <div
                      className=" card message"
                      style={{
                        height: "100%",

                        backgroundColor: this.state.botMessageFillColor,
                        border: `${this.state.botMessageBorder} solid ${this.state.botMessageBorderColor}`,
                        borderRadius: this.state.botMessageBorderRadius
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
                          color: this.state.botMessageTextTextColor,
                          border: this.getBorder("botMessageText"),
                          fontSize: "10px"
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
                        borderBottom: this.getBorder("option"),
                        marginTop: "10%"
                      }}
                      onMouseOver={event => {
                        this.setElementHover(event, "option");
                      }}
                    >
                      <div
                        className="cardd"
                        style={{
                          marginTop: "100%",
                          padding: 5,
                          backgroundColor: this.state.optionFillColor,
                          color: this.state.optionTextColor,
                          cursor: "pointer",
                          border: `${this.state.optionBorder} solid ${this.state.optionBorderColor}`,
                          borderRadius: this.state.optionBorderRadius,
                          fontSize: 10
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
                        borderBottom: this.getBorder("option"),
                        marginTop: "15%",
                        marginLeft: 9.6
                      }}
                      onMouseOver={event => {
                        this.setElementHover(event, "option");
                      }}
                    >
                      <div
                        className="cardd"
                        style={{
                          marginTop: "100%",
                          padding: 5,
                          backgroundColor: this.state.optionFillColor,
                          color: this.state.optionTextColor,
                          cursor: "pointer",
                          border: `${this.state.optionBorder} solid ${this.state.optionBorderColor}`,
                          borderRadius: this.state.optionBorderRadius,
                          fontSize: 10
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
                        borderBottom: this.getBorder("option"),
                        marginTop: "43%"
                        // marginLeft: 9.6
                      }}
                      onMouseOver={event => {
                        this.setElementHover(event, "option");
                      }}
                    >
                      <div
                        className="cardd"
                        style={{
                          marginTop: "100%",
                          padding: 6.4,
                          backgroundColor: this.state.optionFillColor,
                          color: this.state.optionTextColor,
                          cursor: "pointer",
                          border: `${this.state.optionBorder} solid ${this.state.optionBorderColor}`,
                          marginLeft: 9.6,
                          borderRadius: this.state.optionBorderRadius,
                          fontSize: 10
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
                    height: "80px",
                    float: "left",
                    marginTop: 8,
                    marginLeft: 24
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
                          backgroundColor: this.state.userOnlineFillColor,
                          height: "8.32px",
                          width: "8.32px",
                          borderRadius: "50%",
                          marginTop: 4
                        }}
                        onClick={event => {
                          event.stopPropagation();
                          this.onSelect("userOnline");
                        }}
                      ></div>
                    </div>
                    <div
                      style={{
                        marginBottom: 4,
                        border: this.getBorder("userOnlineName")
                      }}
                      onMouseOver={event => {
                        this.setElementHover(event, "userOnlineName");
                      }}
                    >
                      <span
                        style={{
                          marginTop: 1.92,
                          marginLeft: 5.12,
                          fontWeight: "bold",
                          color: this.state.userOnlineNameTextColor,
                          cursor: "pointer",
                          fontSize: "10px"
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
                        marginBottom: 4
                      }}
                      onMouseOver={event => {
                        this.setElementHover(event, "userOnlineTime");
                      }}
                    >
                      <span
                        style={{
                          marginTop: 1.92,
                          marginLeft: 5.44,
                          color: this.state.userOnlineTimeTextColor,
                          cursor: "pointer",
                          fontSize: "10px"
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
                      marginTop: "0.1%",
                      marginLeft: 0,
                      height: "50%"
                    }}
                    onMouseOver={event => {
                      this.setElementHover(event, "userMessage");
                    }}
                  >
                    <div
                      className=" card message"
                      style={{
                        height: "100%",

                        backgroundColor: this.state.userMessageFillColor,
                        border: `${this.state.userMessageBorder} solid ${this.state.userMessageBorderColor}`,
                        borderRadius: this.state.userMessageBorderRadius
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
                          color: this.state.userMessageTextTextColor
                        }}
                        onClick={event => {
                          event.stopPropagation();
                          this.onSelect("userMessageText");
                        }}
                      >
                        <div
                          style={{
                            border: this.getBorder("userMessageText"),
                            fontSize: "11px"
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
                    height: "17%",
                    float: "right",
                    marginTop: "1%",
                    marginRight: 19.2
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
                          backgroundColor: this.state.botOnlineFillColor,
                          height: "8.32px",
                          width: "8.32px",
                          borderRadius: "50%",
                          marginTop: 7
                        }}
                        onClick={event => {
                          event.stopPropagation();
                          this.onSelect("botOnline");
                        }}
                      ></div>
                    </div>
                    <div
                      style={{
                        marginBottom: 4,
                        border: this.getBorder("botOnlineName")
                      }}
                      onMouseOver={event => {
                        this.setElementHover(event, "botOnlineName");
                      }}
                    >
                      <span
                        style={{
                          marginTop: 1.92,
                          marginLeft: 5.32,
                          fontWeight: "bold",
                          color: this.state.botOnlineNameTextColor,
                          cursor: "pointer",
                          fontSize: "10px"
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
                        marginBottom: 4
                      }}
                      onMouseOver={event => {
                        this.setElementHover(event, "botOnlineTime");
                      }}
                    >
                      <span
                        style={{
                          marginTop: 1.92,
                          marginLeft: 5.44,
                          color: this.state.botOnlineTimeTextColor,
                          cursor: "pointer",
                          fontSize: "10px"
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
                      marginTop: 0.64,
                      height: "60%"
                    }}
                    onMouseOver={event => {
                      this.setElementHover(event, "botMessage");
                    }}
                  >
                    <div
                      className=" card message"
                      style={{
                        height: "100%",

                        backgroundColor: this.state.botMessageFillColor,
                        border: `${this.state.botMessageBorder} solid ${this.state.botMessageBorderColor}`,
                        borderRadius: this.state.botMessageBorderRadius
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
                          color: this.state.botMessageTextTextColor,
                          border: this.getBorder("botMessageText"),
                          fontSize: "11px"
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
                          The following are our various insurance packages
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
                          marginTop: "70%",
                          padding: 5,
                          backgroundColor: this.state.optionFillColor,
                          color: this.state.optionTextColor,
                          cursor: "pointer",
                          border: `${this.state.optionBorder} solid ${this.state.optionBorderColor}`,
                          borderRadius: this.state.optionBorderRadius,
                          fontSize: 10
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
                          marginTop: "90%",
                          padding: 5,
                          backgroundColor: this.state.optionFillColor,
                          color: this.state.optionTextColor,
                          cursor: "pointer",
                          border: `${this.state.optionBorder} solid ${this.state.optionBorderColor}`,
                          marginLeft: 9.6,
                          borderRadius: this.state.optionBorderRadius,
                          fontSize: 10
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
                    marginTop: "115%",
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
                      height: "25.6px",
                      backgroundColor: this.state.inputFillColor,
                      color: this.state.inputTextColor,
                      border: `${this.state.inputBorder} solid ${this.state.inputBorderColor}`,
                      cursor: "pointer",
                      borderRadius: this.state.inputBorderRadius,
                      fontSize: this.state.inputFontSize
                    }}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 " style={{ padding: "none", overflowY: "scroll" }}>
            <div
              className="card style-picker"
              style={{
                backgroundColor: "white",
                height: 600,
                border: "none",
                width: "224px",
                float: "right",
                borderRadius: 0
              }}
            >
              <div
                className=""
                style={{ height: 96, borderBottom: "0.8px solid #EEEEEE" }}
              >
                <div
                  style={{
                    marginTop: 9.6,
                    margin: "none",
                    marginLeft: "3%",
                    fontSize: 11.52
                  }}
                >
                  <span style={{ color: "#9D8B8B", fontWeight: "bold" }}>
                    Border
                  </span>
                </div>

                <div
                  className="selected"
                  style={{
                    marginTop: 6.4,
                    marginLeft: 6.4,
                    fontSize: 11.52,
                    display: "flex",
                    border: this.getBorder("borderRadius")
                  }}
                  onClick={event => {
                    this.onSelectStyle("borderRadius");
                  }}
                >
                  <span style={{ color: "#9D8B8B" }}>Radius</span>
                  <input
                    type="text"
                    placeholder="50%"
                    name="BorderRadius"
                    value={this.state.borderRadius}
                    style={{
                      marginLeft: 12.8,
                      width: 32,
                      border: "none",
                      color: "#655353",
                      cursor: "pointer"
                    }}
                    onChange={this.buildTemplate}
                  ></input>
                </div>
                <div
                  className="selected"
                  style={{
                    marginTop: 6.4,
                    marginLeft: 6.4,
                    fontSize: 11.52,
                    display: "flex",
                    border: this.getBorder("borderColor")
                  }}
                  onClick={event => {
                    this.onSelectStyle("borderColor");
                  }}
                >
                  <ColorPickerOverlay
                    name="BorderColor"
                    buildTemplate={this.buildTemplate}
                    defaultColor={this.state.borderColor}
                  />
                  <input
                    name="borderColorCode"
                    style={{
                      width: "64px",
                      marginLeft: 12.8,
                      border: "0.64px solid #706c6c",
                      color: "#918d8d",
                      cursor: "pointer"
                    }}
                    value={this.state.borderColor}
                    onChange={event => {
                      this.setState({
                        borderColor: event.target.value,
                        [`${this.state.selected}BorderColor`]: event.target
                          .value
                      });
                    }}
                  ></input>
                  <div
                    alt="border img"
                    className="border-image"
                    style={{ marginLeft: 12.8 }}
                  >
                    <img
                      alt="border img"
                      src={border}
                      style={{ height: 8.96 }}
                    ></img>
                  </div>
                  <input
                    type="text"
                    placeholder="1.28px"
                    name="Border"
                    value={this.state.border}
                    onChange={this.buildTemplate}
                    style={{
                      marginLeft: 12.8,
                      width: 32,
                      color: "#655353",
                      border: "none",
                      cursor: "pointer"
                    }}
                  ></input>
                </div>
              </div>
              {/* Text */}
              <div
                className=""
                style={{ height: 180, borderBottom: "0.64px solid #EEEEEE" }}
              >
                <div
                  className=""
                  style={{ marginTop: 9.6, marginLeft: 6.4, fontSize: 11.52 }}
                >
                  <span style={{ color: "#9D8B8B", fontWeight: "bold" }}>
                    Text
                  </span>
                </div>
                <div
                  class="form-group selected"
                  onClick={event => {
                    this.onSelectStyle("fontFamily");
                  }}
                  style={{
                    marginLeft: 6.4,
                    width: 96,
                    border: this.getBorder("fontFamily")
                  }}
                >
                  <select
                    style={{ border: 0, fontSize: 11.52, color: "#9D8B8B" }}
                    class="form-control"
                    id="exampleFormControlSelect1"
                  >
                    <option>Roboto</option>
                    <option>New Times</option>
                  </select>
                </div>
                <div
                  className="selected"
                  style={{
                    marginTop: 1,
                    marginLeft: 6.4,
                    fontSize: 11.52,
                    display: "flex",
                    border: this.getBorder("fontStyle")
                  }}
                  onClick={event => {
                    this.onSelectStyle("fontStyle");
                  }}
                >
                  <div
                    class="form-groupp"
                    style={{
                      marginLeft: 0,
                      width: 96
                    }}
                  >
                    <select
                      style={{ border: 0, fontSize: 11.52, color: "#9D8B8B" }}
                      class="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option>Regular</option>
                      <option>Bold</option>
                      <option>Italics</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="20px"
                    name="FontSize"
                    value={this.state.fontSize}
                    style={{
                      marginLeft: 16,
                      width: 40,
                      border: "none",
                      color: "#655353",
                    }}
                    onChange={this.buildTemplate}
                  ></input>
                </div>
                <div
                  className="selected"
                  style={{
                    marginTop: 6.4,
                    marginLeft: 6.4,
                    fontSize: 11.52,
                    display: "flex",
                    border: this.getBorder("textColor")
                  }}
                  onClick={event => {
                    this.onSelectStyle("textColor");
                  }}
                >
                  <ColorPickerOverlay
                    name="TextColor"
                    buildTemplate={this.buildTemplate}
                    defaultColor={this.state.textColor}
                  />
                  <input
                    name="textColorCode"
                    style={{
                      width: "64px",
                      marginLeft: 12.8,
                      border: "0.64px solid #706c6c",
                      color: "#918d8d",
                      cursor: "pointer"
                    }}
                    value={this.state.textColor}
                    onChange={event => {
                      this.setState({
                        textColor: event.target.value,
                        [`${this.state.selected}TextColor`]: event.target.value
                      });
                    }}
                  ></input>
                </div>
              </div>
              {/* Fill */}
              <div
                className="fill"
                style={{ height: 80, borderBottom: "0.64px solid #EEEEEE" }}
              >
                <div
                  style={{ marginTop: 10, marginLeft: 6.4, fontSize: 11.52 }}
                >
                  <span style={{ color: "#9D8B8B", fontWeight: "bold" }}>
                    Fill
                  </span>
                </div>

                <div
                  className="selected"
                  style={{
                    marginTop: 6.4,
                    marginLeft: 6.4,
                    fontSize: 11.52,
                    display: "flex",
                    border: this.getBorder("fillColor")
                  }}
                  onClick={event => {
                    this.onSelectStyle("fillColor");
                  }}
                >
                  <ColorPickerOverlay
                    name="FillColor"
                    buildTemplate={this.buildTemplate}
                    defaultColor={this.state.fillColor}
                  />
                  <input
                    name="fillColor"
                    style={{
                      width: "64px",
                      marginLeft: 12.8,
                      border: "0.64px solid #706c6c",
                      color: "#918d8d",
                      cursor: "pointer"
                    }}
                    value={this.state.fillColor}
                    onChange={event => {
                      this.setState({
                        fillColor: event.target.value,
                        [`${this.state.selected}FillColor`]: event.target.value
                      });
                    }}
                  ></input>
                  <div
                    alt="border img"
                    className="border-image"
                    style={{ marginLeft: 12.8 }}
                  >
                    <img
                      alt="border img"
                      src={border}
                      style={{ height: 8.96 }}
                    ></img>
                  </div>
                  <input
                    type="text"
                    placeholder="1.28px"
                    name="borderRadius"
                    style={{
                      marginLeft: 12.8,
                      width: 32,
                      color: "#655353",
                      border: "none"
                    }}
                  ></input>
                </div>
              </div>
              {/* Effects */}
              <div
                className=""
                style={{ height: 180, borderBottom: "0.64px solid #EEEEEE" }}
              >
                <div
                  style={{ marginTop: 9.6, marginLeft: 6.4, fontSize: 11.52 }}
                >
                  <span style={{ color: "#9D8B8B", fontWeight: "bold" }}>
                    Effect
                  </span>
                </div>
                <div
                  className="form-group selected"
                  style={{
                    marginLeft: 6.4,
                    width: 96,
                    display: "flex",
                    paddingTop: 6.4,
                    border: this.getBorder("effectShadow")
                  }}
                  onClick={event => {
                    this.onSelectStyle("effectShadow");
                  }}
                >
                  <span
                    style={{
                      fontSize: 11.52,
                      color: "#9D8B8B",
                      marginTop: 5.12,
                      marginLeft: 12.8,
                      marginRight: "19.2px"
                    }}
                  >
                    Shadow
                  </span>
                  <select
                    className="selected"
                    style={{
                      border: 0,
                      fontSize: 11.52,
                      color: "#9D8B8B",
                      marginLeft: 19.2,
                      width: 96
                    }}
                    class="form-control"
                    id="exampleFormControlSelect1"
                  >
                    <option>None</option>
                    <option>New Times</option>
                  </select>
                </div>

                <div
                  style={{
                    margin: "auto",
                    width: "90%",
                    height: 115,
                    borderTop: "0.64px solid #EEEEEE"
                  }}
                >
                  <div
                    className="row hover selected"
                    style={{
                      border: this.getBorder("effectHover")
                    }}
                    onClick={event => {
                      this.onSelectStyle("effectHover");
                    }}
                  >
                    <div className="col-md-5 ">
                      <div
                        className=""
                        style={{
                          marginLeft: 12.8,
                          marginTop: "6.4px",
                          fontSize: 12.8,
                          color: "#655353"
                        }}
                      >
                        <span style={{ color: "#655353" }}>Hover</span>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div
                        className="hover"
                        style={{
                          marginTop: 6.4,
                          marginLeft: 6.4,
                          fontSize: 11.52,
                          display: "flex"
                        }}
                      >
                        <div
                          className="borderColor"
                          style={{
                            backgroundColor: "#75d18e",
                            height: 12.8,
                            width: 12.8
                          }}
                        ></div>
                        <span
                          name="borderColorCode"
                          style={{
                            marginLeft: 12.8,
                            color: "#9D8B8B"
                          }}
                        >
                          Fill
                        </span>
                      </div>
                      <div
                        className="click"
                        style={{
                          marginTop: 6.4,
                          marginLeft: 6.4,
                          fontSize: 11.52,
                          display: "flex"
                        }}
                      >
                        <div
                          className="borderColor"
                          style={{
                            backgroundColor: "#75d18e",
                            height: 12.8,
                            width: 12.8
                          }}
                        ></div>
                        <span
                          name="borderColorCode"
                          style={{
                            marginLeft: 12.8,
                            color: "#9D8B8B"
                          }}
                        >
                          Border
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="row selected"
                    style={{
                      border: this.getBorder("effectClick")
                    }}
                    onClick={event => {
                      this.onSelectStyle("effectClick");
                    }}
                  >
                    <div className="col-md-5">
                      <div
                        style={{
                          marginLeft: 12.8,
                          marginTop: "6.4px",
                          fontSize: 12.8,
                          color: "#655353"
                        }}
                      >
                        <span>Click</span>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div
                        className="hover"
                        style={{
                          marginTop: 6.4,
                          marginLeft: 6.4,
                          fontSize: 11.52,
                          display: "flex"
                        }}
                      >
                        <div
                          className="borderColor"
                          style={{
                            backgroundColor: "#662866",
                            height: 12.8,
                            width: 12.8
                          }}
                        ></div>
                        <span
                          name="borderColorCode"
                          style={{
                            marginLeft: 12.8,
                            color: "#9D8B8B"
                          }}
                        >
                          Fill
                        </span>
                      </div>
                      <div
                        className="click"
                        style={{
                          marginTop: 6.4,
                          marginLeft: 6.4,
                          fontSize: 11.52,
                          display: "flex"
                        }}
                      >
                        <div
                          className="borderColor"
                          style={{
                            backgroundColor: "blue",
                            height: 12.8,
                            width: 12.8
                          }}
                        ></div>
                        <span
                          name="borderColorCode"
                          style={{
                            marginLeft: 12.8,
                            color: "#9D8B8B"
                          }}
                        >
                          Border
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <input
            name="BorderColor"
            ref={borderColor => (this.borderColor = borderColor)}
            type="color"
            onChange={this.buildTemplate}
          ></input>
          <input
            name="FillColor"
            ref={fillColor => (this.fillColor = fillColor)}
            type="color"
            onChange={this.buildTemplate}
          ></input>
          <input
            name="TextColor"
            ref={textColor => (this.textColor = textColor)}
            type="color"
            onChange={this.buildTemplate}
          ></input>
        </div>

        <Options
          handleNext={this.saveTemplate}
          handlePrevious={() => {
            this.global.setTab("home");
          }}
          template={this.state}
          saveClass={this.state.saveClass}
          disabledButtons={{
            previous: false,
            next: false,
            undo: false,
            redo: false,
            preview: true,
            import: false,
            export: false,
            save: false,
            deploy: true
          }}
          importTemplate={this.importTemplate}
        />
      </div>
    );
  }
}
export default BotUITemplate;
