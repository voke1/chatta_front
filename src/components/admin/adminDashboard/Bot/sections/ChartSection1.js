import React, { Component, useGlobal, setGlobal } from 'reactn';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Bar, Pie } from 'react-chartjs-2';
import { Line, Doughnut, Radar } from 'react-chartjs-2';
import moment from 'moment';
import Payments from '../../Bot/paymentDatatable';


class ChartSection1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: [],
            success: 0,
            failed: 0,
        }
    }
    noOfFailed = 0;
    noOfSuccess = 0;
    async componentDidMount() {
        await this.setState({ payments: this.props.botPayments })
        this.getStatus()
    }

    getStatus = () => {
        this.state.payments.map((payment, index) => {

            if (payment.status === 'success') {
                this.noOfSuccess++;
                this.setState({ success: this.noOfSuccess })
            } else {
                this.noOfFailed++;
                this.setState({ failed: this.noOfFailed })
            }
        })
    }
   
    render() {

        const dataDoughnut = {
            labels: ["Failed", "Success"],
            datasets: [{
                data: [this.state.failed, this.state.success],
                backgroundColor: ["#F7464A", "purple"],
                hoverBackgroundColor: ["#FF5A5E", "#302656"]
            }]
        };
        return (
            <MDBRow className="mb-4">
                <MDBCol md="8" className="mb-4">
                    <div className="card m-b-30">
                        <div className="card-body">
                            <h4 className="mt-0 m-b-30 header-title">Transactions</h4>

                            <div className="table-responsive">
                                <table className="table m-t-20 mb-0 table-vertical">
                                    <Payments payments={this.state.payments} />
                                </table>
                            </div>
                        </div>
                    </div>
                </MDBCol>
                <MDBCol md="4" className="mb-4">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Transactions chart</MDBCardHeader>
                        <MDBCardBody >
                            <Doughnut data={dataDoughnut} height={200} options={{ responsive: true }} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}

export default ChartSection1;

