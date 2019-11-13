import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, Row, Col, Form, Button } from "react-bootstrap";
import "../plugins/datatables/dataTables.bootstrap4.min.css";
import "../plugins/datatables/responsive.bootstrap4.min.css";
import "../css/style.css";
import "../css/icons.css";
import "../css/bootstrap.min.css";
import "../images/favicon.ico";
import "../css/overlay.css";
import "../css/overlay.css";
import closeImage from "../images/close.jpg";
import axios from "axios";
import avatar from "../images/users/avatar-1.jpg";

export class ManageBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  overlayShow() {
    this.setState({ show: true });
  }

  overlayClose() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        {this.state.show ? (
          <section id="overlay" show={this.state.show}>
            <div>
              <body>
                <div className="wrapper">
                  <div className="main-panel">
                    {/* <!-- Navbar --> */}
                    <div className="header-bg">
                      {/* <!-- Navigation Bar--> */}
                      <header id="topnav">
                        <div className="topbar-main">
                          <div className="container-fluid">
                            {/* <!-- Logo container--> */}
                            <div className="logo">
                              {/* <!-- Text Logo --> */}
                              <a href="index.html" className="logo">
                                <i className="dripicons-broadcast"></i>&nbsp;
                                CHATTA
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
                                    href="#"
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
                                          Dummy text of the printing and
                                          typesetting industry.
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
                                          It is a long established fact that a
                                          reader will
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
                                      Frank ONeil{" "}
                                      <i className="mdi mdi-chevron-down"></i>{" "}
                                    </span>
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                    <a className="dropdown-item" href="#">
                                      <i className="dripicons-user text-muted"></i>{" "}
                                      Profile
                                    </a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">
                                      <i className="dripicons-exit text-muted"></i>{" "}
                                      Logout
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
                                  <Link to="/dashboard/admin/bot">
                                    <a>
                                      <i className="dripicons-device-desktop"></i>
                                      Chatbots
                                    </a>
                                  </Link>
                                </li>

                                <li className="has-submenu">
                                  {" "}
                                  <Link to="/dashboard/admin/user">
                                    <a>
                                      <i className="dripicons-suitcase"></i>
                                      Users
                                    </a>
                                  </Link>
                                </li>

                                <li className="has-submenu">
                                  <a href="#">
                                    <i className="dripicons-to-do"></i>
                                    Integrations
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
                                      <i className="dripicons-device-desktop"></i>
                                      Analytics
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
                            </div>
                          </div>
                        </div>
                        {/* <!-- end page title end breadcrumb --> */}
                      </div>
                    </div>

                    {/* <!-- End Navigation Bar--> */}

                    {/* <!-- End Navbar --> */}
                    <div className="content">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-8">
                            <div className="card">
                              <div className="card-header">
                                <h4 className="card-title">Edit Settings</h4>
                              </div>
                              <div className="card-body">
                                <form>
                                  <div className="row">
                                    <div className="col-md-5 pr-1">
                                      <div className="form-group">
                                        <label>Company (disabled)</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          disabled=""
                                          placeholder="Company"
                                          value="Creative Code Inc."
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="col-md-3 px-1">
                                      <div className="form-group">
                                        <label>Username</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Username"
                                          value="michael23"
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="col-md-4 pl-1">
                                      <div className="form-group">
                                        <label for="exampleInputEmail1">
                                          Email address
                                        </label>
                                        <input
                                          type="email"
                                          className="form-control"
                                          placeholder="Email"
                                        ></input>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 pr-1">
                                      <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Company"
                                          value="Mike"
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="col-md-6 pl-1">
                                      <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Last Name"
                                          value="Andrew"
                                        ></input>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label>Address</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Home Address"
                                          value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                        ></input>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-4 pr-1">
                                      <div className="form-group">
                                        <label>City</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="City"
                                          value="Mike"
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="col-md-4 px-1">
                                      <div className="form-group">
                                        <label>Country</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Country"
                                          value="Andrew"
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="col-md-4 pl-1">
                                      <div className="form-group">
                                        <label>Postal Code</label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          placeholder="ZIP Code"
                                        ></input>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn btn-secondary btn-fill waves-effect pull-right"
                                  >
                                    Update Settings
                                  </button>
                                  <div className="clearfix"></div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="card card-user">
                              <div className="card-image">
                                <img
                                  src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                                  alt="..."
                                ></img>
                              </div>
                              <div className="card-body">
                                <div className="author">
                                  <a href="#">
                                    <img
                                      className="avatar border-gray"
                                      src="../assets/img/faces/face-3.jpg"
                                      alt="..."
                                    ></img>
                                    <h5 className="title">Frank ONeil</h5>
                                  </a>
                                  <p className="description">michael24</p>
                                </div>
                                <p className="description text-center">
                                  "Lamborghini Mercy
                                </p>
                              </div>
                              <hr></hr>
                              <div className="button-container mr-auto ml-auto">
                                <button
                                  href="#"
                                  className="btn btn-simple btn-link btn-icon"
                                >
                                  <i className="fa fa-facebook-square"></i>
                                </button>
                                <button
                                  href="#"
                                  className="btn btn-simple btn-link btn-icon"
                                >
                                  <i className="fa fa-twitter"></i>
                                </button>
                                <button
                                  href="#"
                                  className="btn btn-simple btn-link btn-icon"
                                >
                                  <i className="fa fa-google-plus-square"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Footer --> */}
                    <footer className="footer">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-12">
                            © 2019 - Crafted with{" "}
                            <i className="mdi mdi-heart text-danger"></i> by IT
                            Horizons Limited.
                          </div>
                        </div>
                      </div>
                    </footer>
                  </div>
                </div>
              </body>
            </div>
          </section>
        ) : null}
      </div>
    );
  }
}
