import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';

export default class AdminCardSection1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
      successPayments: [],
      propspayment: [],
      totalSuccessPayments: "",

    }
  }

  getUniqueUsers = () => {

    const uniqueUsers = this.state.payments.map(item => item.email)
      .filter((value, index, self) => self.indexOf(value) === index)
    console.log("uniqueuser: ", uniqueUsers.length)
    return uniqueUsers.length;
  }

  getPaymentStats = () => {
    let successPayments = this.state.payments.filter(payment => payment.status === 'success');
    this.setState({ totalSuccessPayments: successPayments.length })
    console.log("successpayments", successPayments)
    return successPayments;

  }

  async componentDidMount() {
    await this.setState({ payments: this.props.botPayments })

    this.setState({
      successPayments: this.getPaymentStats()
    })
    let initialValue = 0;
    let sum = this.state.successPayments.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount
      , initialValue
    );
    this.setState({ totalAmount: sum })

  }

  getPaymentSuccessRate = () => {
    let successRate = (this.state.totalSuccessPayments / this.state.payments.length) * 100
    console.log("successrates: ", successRate)
    return successRate;
  }

  getTodayPayments = () => {
    const today = new Date();
    let todayPayments = this.state.payments.filter(payment => payment.date === today);
    let initialValue = 0;
    let sum = todayPayments.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount
      , initialValue
    );

    return sum;

  }
  render() {
    console.log("propspayment:", this.state.successPayments)
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
    <strong>{`NGN${this.getTodayPayments()}.00`}</strong>
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
                  <strong>{`${this.getPaymentSuccessRate()}%`}</strong>
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
              <MDBIcon icon="chart-bar" className="purple accent-2" />
              <div className="data">
                <p>UNIQUE USERS</p>
                <h4>
                  <strong>{this.getUniqueUsers()
                  }</strong>
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


