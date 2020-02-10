import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ChartsPage extends React.Component {
  state = {
    dataDoughnut: {
      labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
      datasets: [
        {
          data: [300, 50, 100, 40, 120],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774"
          ]
        }
      ]
    }
  };

  render() {
    return (
      <div>
        {this.state.dataDoughnut.labels ? (
          <MDBContainer>
            <h3 className="mt-1">{this.props.caption}</h3>
            <Doughnut
              data={this.state.dataDoughnut}
              options={{ responsive: true }}
            />
          </MDBContainer>
        ) : null}
      </div>
    );
  }
  componentWillReceiveProps(props) {
    console.log("this is props", props);
    const newDataDoughnut = { ...this.state.dataDoughnut };
    newDataDoughnut.labels = props.data.labels;
    newDataDoughnut.datasets[0].data = props.data.frequency;
    this.setState({ dataDoughnut: newDataDoughnut });
    console.log("top countries", props.data);
  }
}

export default ChartsPage;
