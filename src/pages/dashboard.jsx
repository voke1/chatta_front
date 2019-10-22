import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatar from "../components/admin/images/users/avatar-1.jpg";

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

import "../components/admin/plugins/datatables/dataTables.bootstrap4.min.css";
// import '../plugins/datatables/buttons.bootstrap4.min.css'
import "../components/admin/plugins/datatables/responsive.bootstrap4.min.css";

import "../components/admin/css/style.css";
import "../components/admin/css/icons.css";
import "../components/admin/css/bootstrap.min.css";
// import '../plugins/nestable/jquery.nestable.css';

import "../components/admin/images/favicon.ico";

// <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
// <link href="assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
// <!-- Responsive datatable examples -->
// <link href="assets/plugins/datatables/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css" />

export default class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/client")
      .then(res => res.json())
      .then(data => {
        this.setState({ clients: data });
      })
      .catch(console.log);
  }

  deleteClient(clientId) {
    if (window.confirm("Are you sure?")) {
      fetch(`http://localhost:9000/client/` + clientId, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          const array = [...this.state.clients];
          array.splice(array.map(result => result.id).indexOf(data._id), 1);
          this.setState({ clients: array });
        });
    }
  }

  render() {
    return (
      <div>
        {/* <!-- Loader --> */}
        <div className="preloader">
          <div id="status">
            <div class="spinner"></div>
          </div>
        </div>

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
                  {/* <a href="index.html" class="logo">
                                <img src="assets/images/logo-sm.png" alt="" height="22" class="logo-small"></img>
                                <img src="assets/images/logo.png" alt="" height="24" class="logo-large"></img>
                            </a>  */}
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
                      <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                        <a className="dropdown-item" href="#">
                          <i className="dripicons-user text-muted"></i> Profile
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">
                          <i className="dripicons-exit text-muted"></i> Logout
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
              <div class="col-12">
                <div class="card m-b-20">
                  <div class="card-body">
                    <h4 class="mt-0 header-title">Active Users</h4>
                    <p class="text-muted m-b-30 font-14">
                      DataTables has most features enabled by default, so all
                      you need to do to use it with your own tables is to call
                      the construction function: <code>$().DataTable();</code>.
                    </p>

                    <table id="datatable" class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Age</th>
                          <th>Date created</th>
                          <th>Option</th>
                        </tr>
                      </thead>

                      <tbody>
                        {this.state.clients.map(client => (
                          <tr>
                            <td>{client.full_name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>30</td>
                            <td>2008/12/19</td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-secondary btn-sm waves-effect"
                                onClick={() => {
                                  this.deleteClient(client._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>{" "}
              {/* <!-- end col --> */}
            </div>{" "}
            {/*  <!-- end row --> */}
          </div>{" "}
          {/*<!-- end container --> */}
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
