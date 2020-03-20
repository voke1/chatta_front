import React, { Component } from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Bar, Pie } from 'react-chartjs-2';
import { Line, Doughnut, Radar } from 'react-chartjs-2';
import moment from 'moment'


class ChartSection1 extends Component {
    state = {
        payments: [],
        success: 0,
        failed: 0,
    }
    noOfFailed = 0;
    noOfSuccess = 0;
    componentDidMount() {
        fetch(`http://localhost:9000/payment`)
            .then(res => res.json())
            .then(data => {
                this.setState({ payments: data });
                console.log("mypay,", this.state.payments)
                this.getStatus()
            })
            .catch(e => {
                console.log("error", e);
                this.setState({ error: e.message });
            });

    }

    getStatus = () => {
        this.state.payments.map((payment, index)=>{
            
            if(payment.status === 'success'){
                this.noOfSuccess++;
                this.setState({success: this.noOfSuccess})
            }else{
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
                backgroundColor: ["#F7464A", "#46BFBD"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
            }]
        };
        return (
            <MDBRow className="mb-4">
                <MDBCol md="8" className="mb-4">
                    {/* <MDBCard className="mb-4">
                        <MDBCardBody>
                            <Bar data={dataBar} height={500} options={barChartOptions} />
                        </MDBCardBody>
                    </MDBCard> */}
                    {/* <div className="col-xl-8"> */}
                    <div className="card m-b-30">
                        <div className="card-body">
                            <h4 className="mt-0 m-b-30 header-title">Transactions</h4>

                            <div className="table-responsive">
                                <table className="table m-t-20 mb-0 table-vertical">
                                    {this.state.payments.map((payment, index) => {
                                        return <tbody>
                                            <tr>
                                                <td>
                                                    {payment.name}
                                                </td>
                                                <td><i className="mdi mdi-checkbox-blank-circle text-success"></i> {payment.status}</td>
                                                <td>
                                                    {`₦ ${payment.amount}`}
                                                    <p className="m-0 text-muted font-14">Amount</p>
                                                </td>
                                                <td>
                                                    {moment(payment.created_at).format('Do-MMMM-YYYY, LT') || 'Date'}
                                                    <p className="m-0 text-muted font-14">Date</p>
                                                </td>
                                            </tr>
                                        </tbody>

                                    })}
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

