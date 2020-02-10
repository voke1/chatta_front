import React, { Component } from "react";
// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Input, FormGroup, Container, Label } from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { SingleDatePicker } from "react-dates";
import * as moment from "moment";
// import "moment-timezone";

class App extends Component {
  state = {
    date1: null,
    focused1: null,
    startDate1: new Date(),
    endDate1: new Date(),

    date2: null,
    focused2: null,
    startDate2: new Date(),
    endDate2: new Date()
  };

  render() {
    return (
      <div>
        <div className="dates">
          <SingleDatePicker
            numberOfMonths={1}
            placeholder="Start Date"
            isOutsideRange={() => false}
            date={this.state.date1} // momentPropTypes.momentObj or null
            onDateChange={date => {
              this.setState({ date1: date, date2: "" });
            }} // PropTypes.func.isRequired
            focused={this.state.focused1} // PropTypes.bool
            onFocusChange={({ focused }) =>
              this.setState({ focused1: focused })
            } // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
          />
          <span>--</span>
          <SingleDatePicker
            numberOfMonths={1}
            placeholder="End Date"
            isOutsideRange={() => false}
            date={this.state.date2} // momentPropTypes.momentObj or null
            onDateChange={date => {
              this.setState({ date2: date });
              this.props.fetchVisits([this.state.date1, date]);
            }} // PropTypes.func.isRequired
            focused={this.state.focused2} // PropTypes.bool
            onFocusChange={({ focused }) => {
              this.setState({ focused2: focused });
            }} // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
          />
        </div>
      </div>
    );
  }
}

export default App;
