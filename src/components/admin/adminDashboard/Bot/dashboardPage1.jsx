import React, { Component } from "reactn";
import { Link } from "react-router-dom";
import "./sections/paymentDashboardPage.css";
import avatar from "../../images/users/avatar-1.jpg";
import "../../plugins/datatables/dataTables.bootstrap4.min.css";
import "../../plugins/datatables/responsive.bootstrap4.min.css";
import "../../css/style.css";
import "../../css/icons.css";
import "../../css/bootstrap.min.css";
import "../../images/favicon.ico";
import BotDeleteDialog from "../Bot/botDeleteDialog";
import { ButtonToolbar } from "react-bootstrap";
import { Manage } from "../manageBot";
import { ModalComponent } from "./botSettings";
import Header from "../../layouts/layouts.header";
import Footer from "../../layouts/layouts.footer";
import { APP_ENVIRONMENT } from "../../../../environments/environment";
import Notification from "../../../../utilities/notification/app-notification";
import ExportOverlay from "../Bot/export-overlay";
import ChartSection1 from "../Bot/sections/ChartSection1";
import AdminCardSection1 from "../Bot/sections/AdminCardSection1";
import Axios from 'axios';
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';

const BASE_URL = APP_ENVIRONMENT.base_url;

/**
 * @description class for chatbots
 * @component
 * @type {Class}
 * @property {Function} - CloseDialog function
 *
 */
export default class Bot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: [],
            loading: false,
            botDelete: false,
            delete: false,
            settingsId: null,
            notification: "no",
            error: "",
            uniqueBots: [],
            botId: "",
            botPayments: [
                {
                    _id: "5e748bc52e87f60d6a393e72",
                    botId: "5e69fe8f145c2f001756a177",
                    name: "tunde ednut",
                    email: "ednut@gbedu.com",
                    amount: 20000,
                    message: "Approved",
                    reference: "T908312688188055",
                    status: "success",

                },
                {
                    _id: "5e74a6a38b053a1f2bcbd35b",
                    botId: "5e69fe8f145c2f001756a177",
                    name: "Jim Kane",
                    email: "Kane@ulm.ng",
                    amount: 20000,
                    message: "Approved",
                    reference: "T620652734031597",
                    status: "success",


                }
            ]

        };
    }
    componentDidMount = async () => {
        const clientId = JSON.parse(localStorage.getItem("userdetails")).id;

        const response = await Axios.get(`${BASE_URL}/tree/all/${clientId}`);
        await this.setState({ uniqueBots: response.data })

    }

    handleChange = async (event) => {
        await this.setState({ [event.target.name]: event.target.value });
        this.getPayments()

    }
    getPayments = async () => {
        const botPayments = await Axios.get(`${BASE_URL}/payment?botId=${this.state.botId}`);
        // await this.setState({botPayments: botPayments});
        // await this.setState({ botPayments: botPayments })
        console.log("botPayments:", this.state.botPayments)
    }
    render() {
        return (
            <div>
                <div className="header-bg">
                    {/* <!-- Navigation Bar--> */}
                    <Header />
                    {/* <!-- End Navigation Bar--> */}

                </div>

                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card m-b-30">
                                    <div className="card-body">

                                        <div className="table-responsive">
                                            <div style={{ margin: "1%" }}>

                                                <React.Fragment>
                                                    <div style={{ height: "40rem" }}>

                                                        <MDBCard className="mb-5">
                                                            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
                                                                <div style={{ width: "20rem" }}>
                                                                    <select name="botId" value={this.state.botId} className="browser-default custom-select" onChange={this.handleChange} >
                                                                        <option value="string">select a chatbot</option>
                                                                        {console.log("unik:", this.state.uniqueBots)}
                                                                        {this.state.uniqueBots.map((bot, index) => {
                                                                            if (bot.setting_id) {
                                                                                return <option value={null}>{bot.setting_id.chatbotName || "no name"}</option>
                                                                            }

                                                                        })}
                                                                    </select>

                                                                </div>
                                                            </MDBCardBody>
                                                        </MDBCard>

                                                        {this.state.botId ? (<div><AdminCardSection1 botPayments={this.state.botPayments} />
                                                            <ChartSection1 botPayments={this.state.botPayments} /></div>) : <div><p style={{ color: "black", margin: "10%" }}>NO BOT SELECTED</p></div>
                                                        }

                                                    </div>
                                                </React.Fragment>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- end col --> */}
                        </div>
                        {/*  <!-- end row --> */}
                    </div>
                    {/*  <!-- end container -->        */}
                </div>
                {/* <!-- end wrapper --> */}

                {/* <!-- Footer --> */}
                <Footer />

                {/* <!-- End Footer --> */}
                {this.state.loading ? (
                    <div className="preloader" style={{}}>
                        <div id="status">
                            <div className="spinner"></div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }

    // render() {
    //   return <this.Apps />;
    // }
}
