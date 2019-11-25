import React, { Component } from "react";
import ManagBot from "./manageBot";
import Users from "./users";
import UserSettings from "./userSettings";
import M from "minimatch";

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: " "
    };
  }

  returnItem = property => {
    this.setState({ item: property });
    console.log("property:", property);
    return property;
  };

  render() {
    return (
      <div>
        <ManagBot todo="todo" />
        <Users data={this.returnItem.bind(this)} />
        <UserSettings />
      </div>
    );
  }
}

export default Settings;
