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
import {MDBIcon} from "mdbreact";
import ExportOverlay from '../Bot/export-overlay'

const BASE_URL = APP_ENVIRONMENT.base_url;

/**
 * @description class for chatbots
 * @component
 * @type {Class}
 * @property {Function} - CloseDialog function
 *
 */
export class Bot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: [],
      loading: true,
      botDelete: false,
      delete: false,
      settingsId: null,
      notification: "no"
    };
  }
  setNotification = (status, message) => {
    this.setState({ notification: status, message });
  };
  componentDidMount() {
    this.setGlobal({ setNotification: this.setNotification });
    fetch(`${BASE_URL}/setting`)
      .then(res => res.json())
      .then(data => {
        this.setState({ settings: data });
      })
      .catch(e => {
        console.log("error", e);
      });
  }

  /**
   * Function to close delete dialog window
   * @type {Function}
   * @property {Function} - CloseDialog function
   */
  closeDialog = () => {
    this.setState({ botDelete: false });
  };

  dialogConfirmDelete = () => {
    this.setState({ delete: true, botDelete: false });
    // if (this.state.delete) {
    this.deleteBot(this.state.settingsId);
    // }
  };

  confirmDelete = settingId => {
    this.setState({ botDelete: true, settingsId: settingId });
  };

  deleteBot = settingId => {
    fetch(`${BASE_URL}/setting/` + settingId, {
      method: "DELETE",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          settings: [
            ...this.state.settings.filter(setting => setting._id !== settingId)
          ],
          loading: false
        });
      });
  };

  render() {
    return (
      <div>
        <ExportOverlay/>
        <Notification
          show={this.state.notification}
          type={"success"}
          msg={this.state.message}
          timeOut={4000}
          event="saveTemplate"
          resetNotification={() => {}}
        />
        {this.state.loading ? (
          <div className="preloader">
            <div id="status">
              <div className="spinner"></div>
            </div>
          </div>
        ) : null}
        <div className="header-bg">
          {/* <!-- Navigation Bar--> */}
          <Header />
          {/* <!-- End Navigation Bar--> */}

          <div className="container-fluid">
            {/* <!-- Page-Title --> */}
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">
                  <ModalComponent />
                </div>
              </div>
            </div>
            {/* <!-- end page title end breadcrumb --> */}
          </div>
        </div>

        <div className="wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 m-b-30 header-title">CHAT BOTS</h4>

                    <div className="table-responsive">
                      <table className="table m-t-20 mb-0 table-vertical">
                        {this.state.botDelete ? (
                          <BotDeleteDialog
                            closeDialog={this.closeDialog}
                            dialogDelete={this.dialogConfirmDelete}
                          />
                        ) : null}
                        <tbody>
                          {this.state.settings
                            ? this.state.settings.map(setting => (
                                <tr>
                                  <td>
                                    <img
                                      src={setting.botImage}
                                      alt="bot-image"
                                      className="thumb-sm rounded-circle mr-2"
                                    />
                                    {setting.chatbotName}
                                  </td>
                                  <td>
                                    <i className="mdi mdi-checkbox-blank-circle text-success"></i>{" "}
                                    {setting.welcomeMessage}
                                  </td>
                                  <td>
                                    {setting.fallbackMessage}
                                    <p className="m-0 text-muted font-14">
                                      Fallback Message
                                    </p>
                                  </td>
                                  <td>
                                    {setting.delayPrompt}
                                    <p className="m-0 text-muted font-14">
                                      Delay Prompt
                                    </p>
                                  </td>
                                  <td>

                                    
                                      <Link
                                        to={`/dashboard/admin/bot/${setting._id}`}
                                      >
                                      <button className="btn btn-secondary btn-sm waves-effect" 
>
                                        <MDBIcon icon="cog" />
                                        </button>
                                      </Link>
                                      <button
                                        className="btn btn-red btn-sm waves-effect"
                                        onClick={() => {
                                          this.confirmDelete(setting._id);
                                        }}
                                        
                                      >
                                      <MDBIcon  icon="trash-alt" />
                                      </button>
                                    
                                  </td>
                                </tr>
                              ))
                            : null}
                        </tbody>
                      </table>
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
      </div>
    );
  }

  // render() {
  //   return <this.Apps />;
  // }
}
