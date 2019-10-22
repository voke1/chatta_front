import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatar from "../images/users/avatar-1.jpg";

// import "../js/jquery.min.js";
// import"../js/popper.min.js";
// import "../js/bootstrap.min.js";
// // import "../js/modernizr.min.js";
// import "../js/waves.js";
// import "../js/jquery.slimscroll.js";
// import "../js/jquery.nicescroll.js";
// import "../js/jquery.scrollTo.min.js";

// // import "../plugins/datatables/jquery.dataTables.min.js";
// import "../plugins/datatables/dataTables.bootstrap4.min.js";

// import "../plugins/datatables/dataTables.buttons.min.js";
// import "../plugins/datatables/buttons.bootstrap4.min.js";
// // import "../plugins/datatables/jszip.min.js";
// // import "../plugins/datatables/pdfmake.min.js";
// // import "../plugins/datatables/vfs_fonts.js";
// // import "../plugins/datatables/buttons.html5.min.js";
// // import "../plugins/datatables/buttons.print.min.js";
// // import "../plugins/datatables/buttons.colVis.min.js";
// // // {/* <!-- Responsive examples --> */}
// import "../plugins/datatables/dataTables.responsive.min.js";
// import "../plugins/datatables/responsive.bootstrap4.min.js";

// // import "../pages/datatables.init.js";

// import "../js/app";

import "../plugins/datatables/dataTables.bootstrap4.min.css";
// import '../plugins/datatables/buttons.bootstrap4.min.css'
import "../plugins/datatables/responsive.bootstrap4.min.css";

import "../css/style.css";
import "../css/icons.css";
import "../css/bootstrap.min.css";
// import '../plugins/nestable/jquery.nestable.css';

import "../images/favicon.ico";

// <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
// <link href="assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
// <!-- Responsive datatable examples -->
// <link href="assets/plugins/datatables/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css" />

export default class bot extends Component {
  render() {
    return (
      <div>
        {/* <!-- Loader --> */}
        {/* <div className="preloader">
            <div id="status">
                <div class="spinner">
                    </div>
                    </div>
                    </div> */}

        <div class="header-bg">
          {/* <!-- Navigation Bar--> */}
          <header id="topnav">
            <div class="topbar-main">
              <div class="container-fluid">
                {/* <!-- Logo container--> */}
                <div class="logo">
                  {/* <!-- Text Logo --> */}
                  <a href="index.html" class="logo">
                    <i class="dripicons-broadcast"></i>&nbsp; CHATTA
                  </a>

                  <a href="index.html" class="logo">
                    <img
                      src="assets/images/logo-sm.png"
                      alt=""
                      height="22"
                      class="logo-small"
                    ></img>
                    <img
                      src="assets/images/logo.png"
                      alt=""
                      height="24"
                      class="logo-large"
                    ></img>
                  </a>
                </div>
                {/* <!-- End Logo container--> */}

                <div class="menu-extras topbar-custom">
                  <ul class="list-inline float-right mb-0">
                    {/* <!-- notification--> */}
                    <li class="list-inline-item dropdown notification-list">
                      <a
                        class="nav-link dropdown-toggle arrow-none waves-effect"
                        data-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-haspopup="false"
                        aria-expanded="false"
                      >
                        <i class="ti-bell noti-icon"></i>
                        <span class="badge badge-info badge-pill noti-icon-badge">
                          3
                        </span>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                        {/* <!-- item--> */}
                        <div class="dropdown-item noti-title">
                          <h5>Notification (3)</h5>
                        </div>

                        {/* <!-- item--> */}
                        <a
                          href="javascript:void(0);"
                          class="dropdown-item notify-item active"
                        >
                          <div class="notify-icon bg-success">
                            <i class="mdi mdi-cart-outline"></i>
                          </div>
                          <p class="notify-details">
                            <b>Your order is placed</b>
                            <small class="text-muted">
                              Dummy text of the printing and typesetting
                              industry.
                            </small>
                          </p>
                        </a>

                        {/* <!-- item--> */}
                        <a
                          href="javascript:void(0);"
                          class="dropdown-item notify-item"
                        >
                          <div class="notify-icon bg-warning">
                            <i class="mdi mdi-message"></i>
                          </div>
                          <p class="notify-details">
                            <b>New Message received</b>
                            <small class="text-muted">
                              You have 87 unread messages
                            </small>
                          </p>
                        </a>

                        {/* <!-- item--> */}
                        <a
                          href="javascript:void(0);"
                          class="dropdown-item notify-item"
                        >
                          <div class="notify-icon bg-info">
                            <i class="mdi mdi-martini"></i>
                          </div>
                          <p class="notify-details">
                            <b>Your item is shipped</b>
                            <small class="text-muted">
                              It is a long established fact that a reader will
                            </small>
                          </p>
                        </a>

                        {/* <!-- All--> */}
                        <a
                          href="javascript:void(0);"
                          class="dropdown-item notify-item"
                        >
                          View All
                        </a>
                      </div>
                    </li>
                    {/* <!-- User--> */}
                    <li class="list-inline-item dropdown notification-list">
                      <a
                        class="nav-link dropdown-toggle arrow-none waves-effect nav-user"
                        data-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-haspopup="false"
                        aria-expanded="false"
                      >
                        <img
                          src={avatar}
                          alt="user"
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

                <div class="clearfix"></div>
              </div>
              {/*<!-- end container --> */}
            </div>
            {/* <!-- end topbar-main --> */}
            {/* <!-- MENU Start --> */}
            <div class="navbar-custom">
              <div class="container-fluid">
                <div id="navigation">
                  {/* <!-- Navigation Menu--> */}
                  <ul class="navigation-menu">
                    <li class="has-submenu">
                      <Link to="/dashboard/admin/bot">
                        <a>
                          <i className="dripicons-device-desktop"></i>Chatbots
                        </a>
                      </Link>
                    </li>

                    <li class="has-submenu">
                      {" "}
                      <Link to="/dashboard/admin">
                        <a>
                          <i className="dripicons-suitcase"></i>Users
                        </a>
                      </Link>
                    </li>

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
                </div>
              </div>
            </div>
            {/* <!-- end page title end breadcrumb --> */}
          </div>
        </div>

        <div class="wrapper">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-8">
                <div class="card m-b-30">
                  <div class="card-body">
                    <h4 class="mt-0 m-b-30 header-title">CHAT BOTS</h4>

                    <div class="table-responsive">
                      <table class="table m-t-20 mb-0 table-vertical">
                        <tbody>
                          <tr>
                            <td>
                              <img
                                src="assets/images/users/avatar-2.jpg"
                                alt="bot-image"
                                class="thumb-sm rounded-circle mr-2"
                              />
                              Herbert C. Patton
                            </td>
                            <td>
                              <i class="mdi mdi-checkbox-blank-circle text-success"></i>{" "}
                              Confirm
                            </td>
                            <td>
                              $14,584
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

                          <tr>
                            <td>
                              <img
                                src="assets/images/users/avatar-3.jpg"
                                alt="bot-image"
                                class="thumb-sm rounded-circle mr-2"
                              />
                              Mathias N. Klausen
                            </td>
                            <td>
                              <i class="mdi mdi-checkbox-blank-circle text-warning"></i>{" "}
                              Waiting payment
                            </td>
                            <td>
                              $8,541
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
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <img
                                src="assets/images/users/avatar-4.jpg"
                                alt="bot-image"
                                class="thumb-sm rounded-circle mr-2"
                              />
                              Nikolaj S. Henriksen
                            </td>
                            <td>
                              <i class="mdi mdi-checkbox-blank-circle text-success"></i>{" "}
                              Confirm
                            </td>
                            <td>
                              $954
                              <p class="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              8/11/2016
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

                          <tr>
                            <td>
                              <img
                                src="assets/images/users/avatar-5.jpg"
                                alt="bot-image"
                                class="thumb-sm rounded-circle mr-2"
                              />
                              Lasse C. Overgaard
                            </td>
                            <td>
                              <i class="mdi mdi-checkbox-blank-circle text-danger"></i>{" "}
                              Payment expired
                            </td>
                            <td>
                              $44,584
                              <p class="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              7/11/2016
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

                          <tr>
                            <td>
                              <img
                                src="assets/images/users/avatar-6.jpg"
                                alt="bot-image"
                                class="thumb-sm rounded-circle mr-2"
                              />
                              Kasper S. Jessen
                            </td>
                            <td>
                              <i class="mdi mdi-checkbox-blank-circle text-success"></i>{" "}
                              Confirm
                            </td>
                            <td>
                              $8,844
                              <p class="m-0 text-muted font-14">Amount</p>
                            </td>
                            <td>
                              1/11/2016
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
        <footer class="footer">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                © 2019 Chatta - Crafted with{" "}
                <i class="mdi mdi-heart text-danger"></i> by IT Horizons
                Limited.
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- End Footer --> */}
      </div>
    );
  }
}
