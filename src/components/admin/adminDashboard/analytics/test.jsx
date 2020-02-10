import React, { Component } from "react";
class Test extends Component {
  state = {
    searchBox: ""
  };
  handleChange = event => {
    console.log(event.target.value);
    this.setState({
      searchBox: event.target.value
    });
    // shorthand way of setting many states
    // this.setState({
    //     [event.target.name]: event.target.value
    // })
  };
  render() {
    return (
      <div>
        <input
          type="text"
          name="searchBox"
          value={this.state.searchBox}
          onChange={this.handleChange}
        ></input>
      </div>
    );
  }
}

export default Test;
