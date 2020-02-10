import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";

class BarExample extends Component {
  state = {
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "#008AC8",
          borderColor: "grey",
          borderWidth: 1,
          hoverBackgroundColor: "#64648c",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }
  };
  componentWillReceiveProps(props) {
      console.log("barchart", props.dataSet)
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
        <div
          className="container"
          style={{ height: "30px", borderBottom: "1px solid #e3e3e3" }}
        >
          <span
            style={{
              color: "#639094",
              fontWeight: "500",
              fontSize: "15px"
            }}
            className="mt-1"
          >
            Top 5 browsers
          </span>
        </div>

        <HorizontalBar
          data={this.state.data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
    );
  }
}
export default BarExample;
