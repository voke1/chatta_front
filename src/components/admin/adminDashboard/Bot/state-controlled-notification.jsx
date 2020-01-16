import React, { Component } from "reactn";
import "../../../../utilities/notification/app-notification.css";

export default class AppNotification extends Component {
  state = {
    show: false,
    notificationType: null,
    notificationMessage: null
  };

  componentWillReceiveProps(props) {
    this.setState({
      show: props.show === "no" ? false : true,
      notificationType: props.type,
      message: props.message
    });

    this.notificationTimer = setTimeout(async () => {
      this.handleToggle();
      const tab = await this.global.getTab();
    }, props.timeOut || 8000);
  }

  render() {
    return (
      <div className={"alert alert-dismissible animated bounceInRight"}>
        <button type="button" className="close" onClick={this.handleToggle}>
          &times;
        </button>
        <strong>
          {""} <i className="fa fa-check-circle"></i>
        </strong>{" "}
        &nbsp; &nbsp;{this.props.message}
      </div>
    );
  }

  handleToggle = () => {
    this.setState({
      show: false
    });
  };
}
