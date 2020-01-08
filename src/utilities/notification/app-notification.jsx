import React, { Component } from "react";
import "./app-notification.css";

export default class AppNotification extends Component {
  notificationTimer = null;
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      notificationType: null,
      notificationMessage: null
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      show: props.show === "no" ? false : true,
      notificationType: props.type,
      notificationMessage: props.msg
    });

    this.notificationTimer = setTimeout(() => {
      this.handleToggle();
      this.props.resetNotification();
    }, props.timeOut || 8000);
  }

  render() {
    return this.state.show ? this.resolveNotificationType() : null;
  }

  resolveNotificationType = () => {
    let cName = "alert alert-dismissible animated bounceInRight";
    let icon = "fa";
    let msg = "";
    switch (this.state.notificationType.toLowerCase()) {
      case "success":
        cName = `${cName} alert-success`;
        icon = `${icon} fa-check-circle`;
        msg = "Success!";
        break;
      case "error":
        cName = `${cName} alert-danger`;
        icon = `${icon} fa-times-circle`;
        msg = "Error!";
        break;
      case "warning":
        cName = `${cName} alert-warning`;
        icon = `${icon} fa-times-circle`;
        msg = "Warning!";
        break;
      case "info":
        cName = `${cName} alert-danger`;
        icon = `${icon} fa-times-circle`;
        msg = "Info!";
        break;
      default:
        return null;
    }

    return (
      <div className={cName}>
        <button type="button" className="close" onClick={this.handleToggle}>
          &times;
        </button>
        <strong>
          {""} <i className={icon}></i>
        </strong>{" "}
        &nbsp; &nbsp;{this.state.notificationMessage}
      </div>
    );
  };

  handleToggle = () => {
    this.setState({
      show: false
    });
    clearTimeout(this.notificationTimer);
  };
}
