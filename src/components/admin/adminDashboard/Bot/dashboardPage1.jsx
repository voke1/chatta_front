import React, { Component } from "reactn";
import { Link } from "react-router-dom";
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
import DashboardPaymentPage from "./DashboardPage";
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
            error: ""
        };
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
                                            <DashboardPaymentPage />
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
