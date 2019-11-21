import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatar from "../components/admin/images/users/avatar-1.jpg";
import "../components/admin/plugins/datatables/dataTables.bootstrap4.min.css";
import "../components/admin/plugins/datatables/responsive.bootstrap4.min.css";
import "../components/admin/css/style.css";
import "../components/admin/css/icons.css";
import "../components/admin/css/bootstrap.min.css";
import "../components/admin/images/favicon.ico";
import "../components/admin/css/switch.css";
import Axios from "axios";

export class ManageBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
      settingId: props.match.params.id,
      welcomeMessage: null,
      fallbackMessage: null,
      delayPrompt: null,
      chatbotName: null
    };
  }

  componentDidMount() {
    Axios.get(`http://localhost:9000/setting/${this.state.settingId}`)
      .then(res => {
        const result = res.data;
        setTimeout(() => {
          this.setState({ settings: result });
        }, 1000);

        console.log("Result:", result);
      })
      .catch(err => {});
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();

    const bot = {
      welcomeMessage: this.state.welcomeMessage,
      fallbackMessage: this.state.fallbackMessage,
      delayPrompt: this.state.delayPrompt,
      chatbotName: this.state.chatbotName
    };

    Axios.put(`http://localhost:9000/setting/${this.state.settingId}`, {
      ...bot
    })
      .then(res => {
        console.log("patchedData:", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  App = () => {
    return (
      <div>
        {/* <!-- Loader --> */}
        <div className="preloader">
          <div id="status">
            <div className="spinner"></div>
          </div>
        </div>

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
                  {/* <a href="index.html" className="logo">
                                <img src="assets/images/logo-sm.png" alt="" height="22" className="logo-small"></img>
                                <img src="assets/images/logo.png" alt="" height="24" className="logo-large"></img>
                            </a>  */}
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
            {/* <!-- end page title end breadcrumb --> */}
          </div>
        </div>

        <div className="wrapper">
          <div className="container-fluid">{/*  <!-- end row --> */}</div>{" "}
          {/*<!-- end container --> */}
        </div>
        {/* <!-- end wrapper --> */}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Edit Bot</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Bot Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={this.state.settings.chatbotName}
                              name="chatbotName"
                              onChange={this.handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Delay Time</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={this.state.settings.delayTime}
                              name="delayTime"
                              onChange={this.handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Fallback Message</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={this.state.settings.fallbackMessage}
                              name="fallbackMessage"
                              onChange={this.handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Delay Prompt</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={this.state.settings.delayPrompt}
                              name="delayPrompt"
                              onChange={this.handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Primary Colour</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={this.state.settings.primaryColor}
                              name="primaryColor"
                              onChange={this.handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Secondary Colour</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={this.state.settings.secondaryColor}
                              name="secondaryColor"
                              onChange={this.handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-secondary btn-fill waves-effect pull-right"
                        onClick={this.handleSubmit}
                      >
                        Update BOT Setings
                      </button>
                      <div className="clearfix"></div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-user">
                  <div className="card-image">
                    <img src={this.state.settings.botImage} alt="..."></img>
                  </div>
                  <div className="card-body">
                    <div className="author">
                      <a href="#">
                        <h5 className="title">
                          {this.state.settings.chatbotName}
                        </h5>
                      </a>
                    </div>
                  </div>
                  <hr></hr>
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
  };

  render() {
    return <div>{<this.App />}</div>;
  }
}
