import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../images/users/avatar-1.jpg";
import "../plugins/datatables/dataTables.bootstrap4.min.css";
import "../plugins/datatables/responsive.bootstrap4.min.css";
import "../css/style.css";
import "../css/icons.css";
import "../css/bootstrap.min.css";
import "../images/favicon.ico";

import { Button, ButtonToolbar } from "react-bootstrap";
import { SettingsModal } from "./settingsModal";
import { ModalComponent } from "../adminDashboard/botSettings";

export default class Bot extends Component {
  constructor(props) {
    super(props);
  }

  Apps() {
    const [modalShow, setModalShow] = useState(false);

    return (
      <div>
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
<<<<<<< HEAD
                      class="logo-small"
=======
                      className="logo-small"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                    ></img>
                    <img
                      src="assets/images/logo.png"
                      alt=""
                      height="24"
<<<<<<< HEAD
                      class="logo-large"
=======
                      className="logo-large"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                    ></img>
                  </a>
                </div>
                {/* <!-- End Logo container--> */}

<<<<<<< HEAD
                <div class="menu-extras topbar-custom">
                  <ul class="list-inline float-right mb-0">
                    {/* <!-- notification--> */}
                    <li class="list-inline-item dropdown notification-list">
                      <a
                        class="nav-link dropdown-toggle arrow-none waves-effect"
=======
                <div className="menu-extras topbar-custom">
                  <ul className="list-inline float-right mb-0">
                    {/* <!-- notification--> */}
                    <li className="list-inline-item dropdown notification-list">
                      <a
                        className="nav-link dropdown-toggle arrow-none waves-effect"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                        data-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-haspopup="false"
                        aria-expanded="false"
                      >
<<<<<<< HEAD
                        <i class="ti-bell noti-icon"></i>
                        <span class="badge badge-info badge-pill noti-icon-badge">
                          3
                        </span>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                        {/* <!-- item--> */}
                        <div class="dropdown-item noti-title">
=======
                        <i className="ti-bell noti-icon"></i>
                        <span className="badge badge-info badge-pill noti-icon-badge">
                          3
                        </span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                        {/* <!-- item--> */}
                        <div className="dropdown-item noti-title">
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                          <h5>Notification (3)</h5>
                        </div>

                        {/* <!-- item--> */}
                        <a
                          href="javascript:void(0);"
<<<<<<< HEAD
                          class="dropdown-item notify-item active"
                        >
                          <div class="notify-icon bg-success">
                            <i class="mdi mdi-cart-outline"></i>
                          </div>
                          <p class="notify-details">
                            <b>Your order is placed</b>
                            <small class="text-muted">
=======
                          className="dropdown-item notify-item active"
                        >
                          <div className="notify-icon bg-success">
                            <i className="mdi mdi-cart-outline"></i>
                          </div>
                          <p className="notify-details">
                            <b>Your order is placed</b>
                            <small className="text-muted">
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              Dummy text of the printing and typesetting
                              industry.
                            </small>
                          </p>
                        </a>

                        {/* <!-- item--> */}
                        <a
                          href="javascript:void(0);"
<<<<<<< HEAD
                          class="dropdown-item notify-item"
                        >
                          <div class="notify-icon bg-warning">
                            <i class="mdi mdi-message"></i>
                          </div>
                          <p class="notify-details">
                            <b>New Message received</b>
                            <small class="text-muted">
=======
                          className="dropdown-item notify-item"
                        >
                          <div className="notify-icon bg-warning">
                            <i className="mdi mdi-message"></i>
                          </div>
                          <p className="notify-details">
                            <b>New Message received</b>
                            <small className="text-muted">
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              You have 87 unread messages
                            </small>
                          </p>
                        </a>

                        {/* <!-- item--> */}
                        <a
                          href="javascript:void(0);"
<<<<<<< HEAD
                          class="dropdown-item notify-item"
                        >
                          <div class="notify-icon bg-info">
                            <i class="mdi mdi-martini"></i>
                          </div>
                          <p class="notify-details">
                            <b>Your item is shipped</b>
                            <small class="text-muted">
=======
                          className="dropdown-item notify-item"
                        >
                          <div className="notify-icon bg-info">
                            <i className="mdi mdi-martini"></i>
                          </div>
                          <p className="notify-details">
                            <b>Your item is shipped</b>
                            <small className="text-muted">
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              It is a long established fact that a reader will
                            </small>
                          </p>
                        </a>

                        {/* <!-- All--> */}
                        <a
                          href="javascript:void(0);"
<<<<<<< HEAD
                          class="dropdown-item notify-item"
=======
                          className="dropdown-item notify-item"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                        >
                          View All
                        </a>
                      </div>
                    </li>
                    {/* <!-- User--> */}
<<<<<<< HEAD
                    <li class="list-inline-item dropdown notification-list">
                      <a
                        class="nav-link dropdown-toggle arrow-none waves-effect nav-user"
=======
                    <li className="list-inline-item dropdown notification-list">
                      <a
                        className="nav-link dropdown-toggle arrow-none waves-effect nav-user"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                        data-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-haspopup="false"
                        aria-expanded="false"
                      >
                        <img
                          src={avatar}
                          alt="user"
<<<<<<< HEAD
                          class="rounded-circle"
                        ></img>
                        <span class="ml-1">
                          Frank ONeil <i class="mdi mdi-chevron-down"></i>{" "}
                        </span>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                        <a class="dropdown-item" href="#">
                          <i class="dripicons-user text-muted"></i> Profile
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">
                          <i class="dripicons-exit text-muted"></i> Logout
                        </a>
                      </div>
                    </li>
                    <li class="menu-item list-inline-item">
                      {/* <!-- Mobile menu toggle--> */}
                      <a class="navbar-toggle nav-link">
                        <div class="lines">
=======
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
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
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

<<<<<<< HEAD
                <div class="clearfix"></div>
=======
                <div className="clearfix"></div>
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
              </div>
              {/*<!-- end container --> */}
            </div>
            {/* <!-- end topbar-main --> */}
            {/* <!-- MENU Start --> */}
<<<<<<< HEAD
            <div class="navbar-custom">
              <div class="container-fluid">
                <div id="navigation">
                  {/* <!-- Navigation Menu--> */}
                  <ul class="navigation-menu">
                    <li class="has-submenu">
=======
            <div className="navbar-custom">
              <div className="container-fluid">
                <div id="navigation">
                  {/* <!-- Navigation Menu--> */}
                  <ul className="navigation-menu">
                    <li className="has-submenu">
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                      <Link to="/dashboard/admin/bot">
                        <a>
                          <i className="dripicons-device-desktop"></i>Chatbots
                        </a>
                      </Link>
                    </li>

<<<<<<< HEAD
                    <li class="has-submenu">
=======
                    <li className="has-submenu">
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                      {" "}
                      <Link to="/dashboard/admin">
                        <a>
                          <i className="dripicons-suitcase"></i>Users
                        </a>
                      </Link>
                    </li>

<<<<<<< HEAD
                    <li class="has-submenu">
                      <a href="#">
                        <i class="dripicons-to-do"></i>Integrations
                      </a>
                    </li>
                    <li class="has-submenu">
                      <a href="#">
                        <i class="dripicons-to-do"></i>Archives
                      </a>
                    </li>

                    <li class="has-submenu">
                      <a href="#">
                        <i class="dripicons-trophy"></i>FAQ{" "}
                      </a>
                    </li>

                    <li class="has-submenu">
                      <a href="#">
                        <i class="dripicons-copy"></i>DOCS
=======
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
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
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

<<<<<<< HEAD
          <div class="container-fluid">
            {/* <!-- Page-Title --> */}
            <div class="row">
              <div class="col-sm-12">
                <div class="page-title-box">
                  <form class="float-right app-search">
                    <input
                      type="text"
                      placeholder="Search..."
                      class="form-control"
                    ></input>
                    <button type="submit">
                      <i class="fa fa-search"></i>
                    </button>
                  </form>
                  <button
                    type="button"
                    class="btn btn-outline-light ml-1 waves-effect waves-light"
                  >
                    {" "}
                    Create Bot +
                  </button>
=======
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
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                </div>
              </div>
            </div>
            {/* <!-- end page title end breadcrumb --> */}
          </div>
        </div>

<<<<<<< HEAD
        <div class="wrapper">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-8">
                <div class="card m-b-30">
                  <div class="card-body">
                    <h4 class="mt-0 m-b-30 header-title">CHAT BOTS</h4>

                    <div class="table-responsive">
                      <table class="table m-t-20 mb-0 table-vertical">
=======
        <div className="wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-8">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 m-b-30 header-title">CHAT BOTS</h4>

                    <div className="table-responsive">
                      <table className="table m-t-20 mb-0 table-vertical">
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                        <tbody>
                          <tr>
                            <td>
                              <img
                                src="assets/images/users/avatar-2.jpg"
                                alt="bot-image"
<<<<<<< HEAD
                                class="thumb-sm rounded-circle mr-2"
=======
                                className="thumb-sm rounded-circle mr-2"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              />
                              Herbert C. Patton
                            </td>
                            <td>
<<<<<<< HEAD
                              <i class="mdi mdi-checkbox-blank-circle text-success"></i>{" "}
=======
                              <i className="mdi mdi-checkbox-blank-circle text-success"></i>{" "}
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              Confirm
                            </td>
                            <td>
                              $14,584
<<<<<<< HEAD
                              <p class="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              5/12/2016
                              <p class="m-0 text-muted font-14">Date</p>
                            </td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-secondary btn-sm waves-effect"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>

=======
                              <p className="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              5/12/2016
                              <p className="m-0 text-muted font-14">Date</p>
                            </td>
                            <td>
                              <ButtonToolbar>
                                <Button
                                  className="btn btn-secondary btn-sm waves-effect"
                                  variant="primary"
                                  onClick={() => setModalShow(true)}
                                >
                                  Manage
                                </Button>
                                <SettingsModal
                                  show={modalShow}
                                  onHide={() => setModalShow(false)}
                                />
                              </ButtonToolbar>
                            </td>
                          </tr>
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                          <tr>
                            <td>
                              <img
                                src="assets/images/users/avatar-3.jpg"
                                alt="bot-image"
<<<<<<< HEAD
                                class="thumb-sm rounded-circle mr-2"
=======
                                className="thumb-sm rounded-circle mr-2"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              />
                              Mathias N. Klausen
                            </td>
                            <td>
<<<<<<< HEAD
                              <i class="mdi mdi-checkbox-blank-circle text-warning"></i>{" "}
=======
                              <i className="mdi mdi-checkbox-blank-circle text-warning"></i>{" "}
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              Waiting payment
                            </td>
                            <td>
                              $8,541
<<<<<<< HEAD
                              <p class="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              10/11/2016
                              <p class="m-0 text-muted font-14">Date</p>
                            </td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-secondary btn-sm waves-effect"
                              >
                                Manage
                              </button>
=======
                              <p className="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              10/11/2016
                              <p className="m-0 text-muted font-14">Date</p>
                            </td>
                            <td>
                              <ButtonToolbar>
                                <Button
                                  className="btn btn-secondary btn-sm waves-effect"
                                  variant="primary"
                                  onClick={() => setModalShow(true)}
                                >
                                  Manage
                                </Button>
                                <SettingsModal
                                  show={modalShow}
                                  onHide={() => setModalShow(false)}
                                />
                              </ButtonToolbar>
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <img
                                src="assets/images/users/avatar-4.jpg"
                                alt="bot-image"
<<<<<<< HEAD
                                class="thumb-sm rounded-circle mr-2"
=======
                                className="thumb-sm rounded-circle mr-2"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              />
                              Nikolaj S. Henriksen
                            </td>
                            <td>
<<<<<<< HEAD
                              <i class="mdi mdi-checkbox-blank-circle text-success"></i>{" "}
=======
                              <i className="mdi mdi-checkbox-blank-circle text-success"></i>{" "}
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              Confirm
                            </td>
                            <td>
                              $954
<<<<<<< HEAD
                              <p class="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              8/11/2016
                              <p class="m-0 text-muted font-14">Date</p>
=======
                              <p className="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              8/11/2016
                              <p className="m-0 text-muted font-14">Date</p>
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                            </td>
                            <td>
                              <button
                                type="button"
<<<<<<< HEAD
                                class="btn btn-secondary btn-sm waves-effect"
=======
                                className="btn btn-secondary btn-sm waves-effect"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              >
                                Manage
                              </button>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <img
                                src="assets/images/users/avatar-5.jpg"
                                alt="bot-image"
<<<<<<< HEAD
                                class="thumb-sm rounded-circle mr-2"
=======
                                className="thumb-sm rounded-circle mr-2"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              />
                              Lasse C. Overgaard
                            </td>
                            <td>
<<<<<<< HEAD
                              <i class="mdi mdi-checkbox-blank-circle text-danger"></i>{" "}
=======
                              <i className="mdi mdi-checkbox-blank-circle text-danger"></i>{" "}
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              Payment expired
                            </td>
                            <td>
                              $44,584
<<<<<<< HEAD
                              <p class="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              7/11/2016
                              <p class="m-0 text-muted font-14">Date</p>
=======
                              <p className="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              7/11/2016
                              <p className="m-0 text-muted font-14">Date</p>
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                            </td>
                            <td>
                              <button
                                type="button"
<<<<<<< HEAD
                                class="btn btn-secondary btn-sm waves-effect"
=======
                                className="btn btn-secondary btn-sm waves-effect"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              >
                                Manage
                              </button>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <img
                                src="assets/images/users/avatar-6.jpg"
                                alt="bot-image"
<<<<<<< HEAD
                                class="thumb-sm rounded-circle mr-2"
=======
                                className="thumb-sm rounded-circle mr-2"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              />
                              Kasper S. Jessen
                            </td>
                            <td>
<<<<<<< HEAD
                              <i class="mdi mdi-checkbox-blank-circle text-success"></i>{" "}
=======
                              <i className="mdi mdi-checkbox-blank-circle text-success"></i>{" "}
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              Confirm
                            </td>
                            <td>
                              $8,844
<<<<<<< HEAD
                              <p class="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              1/11/2016
                              <p class="m-0 text-muted font-14">Date</p>
=======
                              <p className="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              1/11/2016
                              <p className="m-0 text-muted font-14">Date</p>
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                            </td>
                            <td>
                              <button
                                type="button"
<<<<<<< HEAD
                                class="btn btn-secondary btn-sm waves-effect"
=======
                                className="btn btn-secondary btn-sm waves-effect"
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
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
<<<<<<< HEAD
        <footer class="footer">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                © 2019 Chatta - Crafted with{" "}
                <i class="mdi mdi-heart text-danger"></i> by IT Horizons
=======
        <footer className="footer" id="check_jq">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                © 2019 Chatta - Crafted with{" "}
                <i className="mdi mdi-heart text-danger"></i> by IT Horizons
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
                Limited.
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- End Footer --> */}
      </div>
    );
  }
<<<<<<< HEAD
=======

  render() {
    return <this.Apps />;
  }
>>>>>>> fadc463b1c836939be06c9124fcc5bf552580cae
}
