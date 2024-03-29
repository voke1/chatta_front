import React, { Component } from "react";
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
import { APP_ENVIRONMENT } from "../../../../environments/environment";

const BASE_URL = APP_ENVIRONMENT.base_url;

export class Bot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: [],
      loading: true,
      botDelete: false,
      delete: false,
      settingsId: null
    };
  }

  componentDidMount() {

    fetch(`${BASE_URL}/setting`)
      .then(res => res.json())
      .then(data => {
        this.setState({ settings: data });
      })
      .catch(e => {
        console.log("error", e);
      });
  }
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
        {this.state.loading ? (
          <div className="preloader">
            <div id="status">
              <div className="spinner"></div>
            </div>
          </div>
        ) : null}
        <div className="header-bg">
          {/* <!-- Navigation Bar--> */}
          <header id="topnav">
            <div className="topbar-main">
              <div className="container-fluid">
                {/* <!-- Logo container--> */}
                <div className="logo">
                  {/* <!-- Text Logo --> */}
                  <a href="index.html" className="logo">
                    <i className="dripicons-broadcast"></i>&nbsp; CHATTA
                  </a>

                  <a href="index.html" className="logo">
                    <img
                      src="assets/images/logo-sm.png"
                      alt=""
                      height="22"
                      className="logo-small"
                    ></img>
                    <img
                      src="assets/images/logo.png"
                      alt=""
                      height="24"
                      className="logo-large"
                    ></img>
                  </a>
                </div>
                {/* <!-- End Logo container--> */}

                <div className="menu-extras topbar-custom">
                  <ul className="list-inline float-right mb-0">
                    {/* <!-- notification--> */}
                    <li className="list-inline-item dropdown notification-list">
                      <a
                        className="nav-link dropdown-toggle arrow-none waves-effect"
                        data-toggle="dropdown"
                        role="button"
                        aria-haspopup="false"
                        aria-expanded="false"
                      >
                        <i className="ti-bell noti-icon"></i>
                        <span className="badge badge-info badge-pill noti-icon-badge">
                          3
                        </span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                        {/* <!-- item--> */}
                        <div className="dropdown-item noti-title">
                          <h5>Notification (3)</h5>
                        </div>

                        {/* <!-- item--> */}
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item notify-item active"
                        >
                          <div className="notify-icon bg-success">
                            <i className="mdi mdi-cart-outline"></i>
                          </div>
                          <p className="notify-details">
                            <b>Your order is placed</b>
                            <small className="text-muted">
                              Dummy text of the printing and typesetting
                              industry.
                            </small>
                          </p>
                        </a>

                        {/* <!-- item--> */}
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item notify-item"
                        >
                          <div className="notify-icon bg-warning">
                            <i className="mdi mdi-message"></i>
                          </div>
                          <p className="notify-details">
                            <b>New Message received</b>
                            <small className="text-muted">
                              You have 87 unread messages
                            </small>
                          </p>
                        </a>

                        {/* <!-- item--> */}
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item notify-item"
                        >
                          <div className="notify-icon bg-info">
                            <i className="mdi mdi-martini"></i>
                          </div>
                          <p className="notify-details">
                            <b>Your item is shipped</b>
                            <small className="text-muted">
                              It is a long established fact that a reader will
                            </small>
                          </p>
                        </a>

                        {/* <!-- All--> */}
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item notify-item"
                        >
                          View All
                        </a>
                      </div>
                    </li>
                    {/* <!-- User--> */}
                    <li className="list-inline-item dropdown notification-list">
                      <a
                        className="nav-link dropdown-toggle arrow-none waves-effect nav-user"
                        data-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-haspopup="false"
                        aria-expanded="false"
                      >
                        <img
                          src={avatar}
                          alt="user"
                          className="rounded-circle"
                        ></img>
                        <span className="ml-1">
                          Frank ONeil <i className="mdi mdi-chevron-down"></i>{" "}
                        </span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                        <a className="dropdown-item" href="#">
                          <i className="dripicons-user text-muted"></i> Profile
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">
                          <i className="dripicons-exit text-muted"></i> Logout
                        </a>
                      </div>
                    </li>
                    <li className="menu-item list-inline-item">
                      {/* <!-- Mobile menu toggle--> */}
                      <a className="navbar-toggle nav-link">
                        <div className="lines">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </a>
                      {/* <!-- End mobile menu toggle--> */}
                    </li>
                  </ul>
                </div>
                {/* <!-- end menu-extras --> */}

                <div className="clearfix"></div>
              </div>
              {/*<!-- end container --> */}
            </div>
            {/* <!-- end topbar-main --> */}
            {/* <!-- MENU Start --> */}
            <div className="navbar-custom">
              <div className="container-fluid">
                <div id="navigation">
                  {/* <!-- Navigation Menu--> */}
                  <ul className="navigation-menu">
                    <li className="has-submenu">
                      <Link to="/dashboard/admin">
                        <a>
                          <i className="dripicons-device-desktop"></i>Dashboard
                        </a>
                      </Link>
                    </li>

                    <li className="has-submenu">
                      <Link to="/dashboard/admin/bot">
                        <a>
                          <i className="dripicons-device-desktop"></i>Chatbots
                        </a>
                      </Link>
                    </li>

                    <li className="has-submenu">
                      {" "}
                      <Link to="/dashboard/admin/user">
                        <a>
                          <i className="dripicons-suitcase"></i>Users
                        </a>
                      </Link>
                    </li>

                    <li className="has-submenu">
                      <a href="#">
                        <i className="dripicons-to-do"></i>Integrations
                      </a>
                    </li>
                    <li className="has-submenu">
                      <a href="#">
                        <i className="dripicons-to-do"></i>Archives
                      </a>
                    </li>
                    <li className="has-submenu">
                      <Link to="/dashboard/admin/bot">
                        <a>
                          <i className="dripicons-device-desktop"></i>Analytics
                        </a>
                      </Link>
                    </li>

                    <li className="has-submenu">
                      <a href="#">
                        <i className="dripicons-trophy"></i>FAQ{" "}
                      </a>
                    </li>

                    <li className="has-submenu">
                      <a href="#">
                        <i className="dripicons-copy"></i>DOCS
                      </a>
                    </li>
                  </ul>
                  {/* <!-- End navigation menu --> */}
                </div>{" "}
                {/* /*</div><!-- end #navigation -->*/}
              </div>{" "}
              {/* <!-- end container --> */}
            </div>{" "}
            {/* <!-- end navbar-custom --> */}
          </header>
          {/* <!-- End Navigation Bar--> */}

          <div className="container-fluid">
            {/* <!-- Page-Title --> */}
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">
                  <form className="float-right app-search">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control"
                    ></input>
                    <button type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
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
                                    {console.log(setting)}
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
        <footer className="footer" id="check_jq">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                © 2019 Chatta - Crafted with{" "}
                <i className="mdi mdi-heart text-danger"></i> by IT Horizons
                Limited.
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- End Footer --> */}
      </div>
    );
  }

  // render() {
  //   return <this.Apps />;
  // }
}
