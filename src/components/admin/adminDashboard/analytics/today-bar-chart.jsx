import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarExample extends Component {
  state = {
    data: {
      labels: [
        "12am",
        "1am",
        "2am",
        "3am",
        "4am",
        "5am",
        "6am",
        "7am",
        "8am",
        "9am",
        "10am",
        "11am",
        "12pm",
        "1pm",
        "2pm",
        "3pm",
        "4pm",
        "5pm",
        "6pm",
        "7pm",
        "8pm",
        "9pm",
        "10pm",
        "11pm"
      ],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "#008AC8",
          borderColor: "grey",
          borderWidth: 1,
          hoverBackgroundColor: "#64648c",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: []
        }
      ]
    }
  };
  componentWillReceiveProps(props) {
    console.log("barchart2", props.dataSet);
    if (props.dataSet.labels) {
      let newData = { ...this.state.data };
      newData.labels = props.dataSet.labels;
      newData.datasets[0]["data"] = props.dataSet.frequency;
      this.setState({ data: newData });
    }
  }
  render() {
    return (
      <div>
        <div className="containerl">
          <span
            style={{
              color: "#fcfcfc",
              fontWeight: "400",
              fontSize: "20px"
            }}
            className="mt-1"
          >
            Today's visits so far
          </span>
        </div>

        <Bar
          data={this.state.data}
          width={100}
          height={30}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
    );
  }
}
export default BarExample;
