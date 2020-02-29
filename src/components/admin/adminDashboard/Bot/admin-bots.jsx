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
      loading: false,
      botDelete: false,
      delete: false,
      settingsId: null,
      notification: "no",
      error: ""
    };
  }
  setNotification = (status, message) => {
    this.setState({ notification: status, message });
  };
  async componentDidMount() {
    this.setState({ loading: true })
    const clientId = await JSON.parse(localStorage.getItem("userdetails")).id;
    console.log("client id", clientId);
    this.setGlobal({ setNotification: this.setNotification });
    fetch(`${BASE_URL}/setting/all/${clientId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ settings: data, error: "", loading: false });
      })
      .catch(e => {
        console.log("error", e);
        this.setState({ error: e.message, loading: false });
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
        <ExportOverlay />
        <Notification
          show={this.state.notification}
          type={"success"}
          msg={this.state.message}
          timeOut={4000}
          event="saveTemplate"
          resetNotification={() => {}}
        />

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
                          {this.state.settings.length && !this.state.error ? (
                            this.state.settings.map(setting => (
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
                                  <span className="m-0 text-muted font-14">
                                    Fallback Message
                                  </span>

                                  <span
                                    style={{
                                      marginTop: "12px",
                                      display: "block",
                                      lineHeight: "20px"
                                    }}
                                  >
                                    {setting.fallbackMessage}
                                  </span>
                                </td>
                                <td>
                                  <p className="m-0 text-muted font-14">
                                    Delay Prompt
                                  </p>
                                  <span
                                    style={{
                                      marginTop: "12px",
                                      display: "block",
                                      lineHeight: "20px"
                                    }}
                                  >
                                    {setting.delayPrompt}
                                  </span>
                                </td>
                                <td>
                                  {console.log("settings ID:", setting._id)}

                                  <ButtonToolbar>
                                    <Link
                                      to={`/dashboard/admin/bot/${setting._id}`}
                                    >
                                      <button className="btn btn-secondary btn-sm waves-effect">
                                        Manage
                                      </button>
                                    </Link>
                                    <button
                                      className="btn btn-secondary btn-sm waves-effect"
                                      onClick={() => {
                                        this.confirmDelete(setting._id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </ButtonToolbar>
                                </td>
                              </tr>
                            ))
                          ) : this.state.error ? (
                            <div>
                              {this.state.error}
                              {this.state.loading ? (
                                <div
                                  className="preloader"
                                  style={{ marginTop: 100 }}
                                >
                                  <div id="status">
                                    <div className="spinner"></div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          ) : !this.state.settings.length &&
                            !this.state.loading ? (
                            <div>No records found</div>
                          ) : null}
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
