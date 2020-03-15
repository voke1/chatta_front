import React, { Component } from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Bar, Pie } from 'react-chartjs-2';
import { Line, Doughnut, Radar } from 'react-chartjs-2';


class ChartSection1 extends Component {
    render() {

        const dataLine = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };

        const dataRadar = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: '#1',
                    backgroundColor: 'rgba(245, 74, 85, 0.5)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: '#2',
                    backgroundColor: 'rgba(90, 173, 246, 0.5)',
                    data: [12, 42, 121, 56, 24, 12, 2]
                },
                {
                    label: '#3',
                    backgroundColor: 'rgba(245, 192, 50, 0.5)',
                    data: [2, 123, 154, 76, 54, 23, 5]
                }
            ]
        };

        const dataDoughnut = {
            labels: ["Failed", "Success", "Cancelled", "Error", "Others"],
            datasets: [{
                data: [300, 50, 100, 40, 120],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
            }]
        };

        const dataBar = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: '#1',
                    data: [12, 39, 3, 50, 2, 32, 84],
                    backgroundColor: 'rgba(245, 74, 85, 0.5)',
                    borderWidth: 1
                }, {
                    label: '#2',
                    data: [56, 24, 5, 16, 45, 24, 8],
                    backgroundColor: 'rgba(90, 173, 246, 0.5)',
                    borderWidth: 1
                }, {
                    label: '#3',
                    data: [12, 25, 54, 3, 15, 44, 3],
                    backgroundColor: 'rgba(245, 192, 50, 0.5)',
                    borderWidth: 1
                }
            ]
        };

        const barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    barPercentage: 1,
                    gridLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

        const dataPie = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    data: [300, 50, 100, 40, 120, 24, 52],
                    backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad'],
                    hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db']
                }
            ]
        }
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

                                    <tbody>
                                        <tr>
                                            <td>
                                                Herbert C. Patton
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-success"></i> Confirm</td>
                                            <td>
                                                $14,584
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                5/12/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Mathias N. Klausen
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-warning"></i> Waiting payment</td>
                                            <td>
                                                $8,541
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                10/11/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Nikolaj S. Henriksen
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-success"></i> Confirm</td>
                                            <td>
                                                $954
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                8/11/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>

                                        </tr>

                                        <tr>
                                            <td>
                                                Lasse C. Overgaard
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-danger"></i> Payment expired</td>
                                            <td>
                                                $44,584
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                7/11/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>

                                        </tr>

                                        <tr>
                                            <td>
                                                Kasper S. Jessen
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-success"></i> Confirm</td>
                                            <td>
                                                $8,844
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                1/11/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td>
                                                Kasper S. Jessen
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-success"></i> Confirm</td>
                                            <td>
                                                $8,844
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                1/11/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td>
                                                Kasper S. Jessen
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-success"></i> Confirm</td>
                                            <td>
                                                $8,844
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                1/11/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td>
                                                Lasse C. Overgaard
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-danger"></i> Payment expired</td>
                                            <td>
                                                $44,584
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                7/11/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>

                                        </tr>

                                        <tr>
                                            <td>
                                                Lasse C. Overgaard
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-danger"></i> Payment expired</td>
                                            <td>
                                                $44,584
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                7/11/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </MDBCol>
                <MDBCol md="4" className="mb-4">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Transactions analytics</MDBCardHeader>
                        <MDBCardBody >
                            <Doughnut data={dataDoughnut} height={300} options={{ responsive: true }} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}

export default ChartSection1;

