import React from "react";
import { Line, } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ChartsPage extends React.Component {
  state = {
    dataLine: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "#E6F3F9",
          borderColor: "#1385BB",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#1385BB",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
        // {
        //   label: "My Second dataset",
        //   fill: true,
        //   lineTension: 0.3,
        //   backgroundColor: "rgba(184, 185, 210, .3)",
        //   borderColor: "rgb(35, 26, 136)",
        //   borderCapStyle: "butt",
        //   borderDash: [],
        //   borderDashOffset: 0.0,
        //   borderJoinStyle: "miter",
        //   pointBorderColor: "rgb(35, 26, 136)",
        //   pointBackgroundColor: "rgb(255, 255, 255)",
        //   pointBorderWidth: 10,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "rgb(0, 0, 0)",
        //   pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        //   pointHoverBorderWidth: 2,
        //   pointRadius: 1,
        //   pointHitRadius: 10,
        //   data: [28, 48, 40, 19, 86, 27, 90]
        // }
      ]
    }
  };
  componentWillReceiveProps(props) {
    const newDataLine = { ...this.state.dataLine };
    if(props.dataSet) {
      newDataLine.labels = props.dataSet.labels;
    newDataLine.datasets[0].data = props.dataSet.frequency;
    this.setState({ dataLine: newDataLine });
    }
    
  }
  render() {
    return (
      <div>
        {this.state.dataLine.labels ? (
          <MDBContainer>
            <div style={{ height: "30px", borderBottom: "1px solid #e3e3e3" }}>
              <span
                style={{
                  color: "#639094",
                  fontWeight: "500",
                  fontSize: "15px"
                }}
                className="mt-1"
              >
                {this.props.title || "Visits"}
              </span>
            </div>

            <Line
              data={this.state.dataLine}
              options={{
                responsive: true,
                scales: {
                  xAxes: [
                    {
                      gridLines: {
                        display: false
                      }
                    }
                  ],
                  yAxes: [
                    {
                      gridLines: {
                        display: false
                      }
                    }
                  ]
                }
              }}
            />
          </MDBContainer>
        ) : null}
      </div>
    );
  }
}

export default ChartsPage;
