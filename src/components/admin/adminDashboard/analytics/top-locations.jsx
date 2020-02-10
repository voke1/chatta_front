import React, { Component } from "reactn";
import Doughnut from "./doughnut";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon
} from "mdbreact";

class TabsMaterial extends Component {
  state = {
    activeItem: "1",
    tab: ""
  };

  toggle = tab => async  () => {
    if (this.state.activeItem !== tab) {
      await this.setState({
        activeItem: tab
      });
    }
    this.props.setTab(tab);
  };

  render() {
    return (
      <MDBContainer>
        <MDBNav tabs>
          <MDBNavItem>
            <MDBNavLink to="#" active="1" onClick={this.toggle("1")} role="tab">
              Top continents
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#" active="2" onClick={this.toggle("2")} role="tab">
              Top countries
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#" active="3" onClick={this.toggle("3")} role="tab">
              Top cities
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent className="card" activeItem={this.state.activeItem}>
          <MDBTabPane tabId="1" role="tabpanel">
            {this.state.activeItem === "1" ? (
              <Doughnut
                data={this.props.topContinents}
                caption="Top continents"
              />
            ) : null}
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            {this.state.activeItem === "2" ? (
              <Doughnut
                data={this.props.topCountries}
                caption="Top countries"
              />
            ) : null}
          </MDBTabPane>
          <MDBTabPane tabId="3" role="tabpanel">
            {this.state.activeItem === "3" ? (
              <Doughnut
                data={this.props.topCities}
                caption="Top cities"
              />
            ) : null}
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
}

export default TabsMaterial;
