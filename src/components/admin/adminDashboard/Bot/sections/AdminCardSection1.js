import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';

export default class AdminCardSection1 extends Component {

  state = {
    payments: [],
    successPayments: []

  }

  componentDidMount() {

    fetch(`http://localhost:9000/payment`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          successPayments: [
            ...data.filter(payment => payment.status === 'success')
          ]
        });
      })
      .then(() => {
        let initialValue = 0;
        let sum = this.state.successPayments.reduce(
          (accumulator, currentValue) => accumulator + currentValue.amount
          , initialValue
        );
        this.setState({ totalAmount: sum })
      })
      .catch(e => {
        this.setState({ error: e.message });
      });
  }

  render() {
    return (
      <MDBRow className="mb-4" >
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="money-bill-alt" className="primary-color" />
              <div className="data">
                <p>TOTAL PAYMENTS RECEIVED</p>
                <h4>
                  <strong>{`NGN ${this.state.totalAmount}.00`}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
            
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="chart-line" className="warning-color" />
              <div className="data">
                <p>PAYMENTS RECEIVED TODAY</p>
                <h4>
                  <strong>NGN 200,000</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="chart-pie" className="light-blue lighten-1" />
              <div className="data">
                <p>PAYMENTS SUCCESS RATE</p>
                <h4>
                  <strong>100%</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
          
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="chart-bar" className="red accent-2" />
              <div className="data">
                <p>UNIQUE USERS</p>
                <h4>
                  <strong>2000</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
          
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )

  }

}


