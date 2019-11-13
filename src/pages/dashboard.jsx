import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../components/admin/images/users/avatar-1.jpg";
<<<<<<< HEAD
import "../components/admin/plugins/datatables/dataTables.bootstrap4.min.css";
import "../components/admin/plugins/datatables/responsive.bootstrap4.min.css";
import "../components/admin/css/style.css";
import "../components/admin/css/icons.css";
import "../components/admin/css/bootstrap.min.css";
import "../components/admin/images/favicon.ico";
// import { Form } from "react-bootstrap";
// import { Switch } from "../components/admin/adminDashboard/toggleSwitch";
=======
// import avatar2 from "../components/admin/images/users/avatar-1.jpg";
// import avatar3 from "../components/admin/images/users/avatar-1.jpg";
import "../components/admin/css/bootstrap.min.css";
import "../components/admin/images/favicon.ico";
>>>>>>> 9aa9ee5805c6c64c2bbad2335f5864f587793122
import "../components/admin/css/switch.css";
import Switch from "react-toggle-switch";
import "../../node_modules/react-toggle-switch/dist/css/switch.min.css";
import { Button, ButtonToolbar } from "react-bootstrap";
<<<<<<< HEAD
import { SettingsModal } from "../components/admin/adminDashboard/settingsModal";
=======
import { CreateUser } from "../components/admin/adminDashboard/createUser";
import { ModalComponents } from "../components/admin/adminDashboard/userProfile";
import "../components/admin/plugins/morris/morris.css";
import "../components/admin/plugins/datatables/dataTables.bootstrap4.min.css";
import "../components/admin/plugins/datatables/responsive.bootstrap4.min.css";
import "../components/admin/admin_template (1)/fonik/purple/assets/plugins/datatables/dataTables.bootstrap4.min.css"
import "../components/admin/admin_template (1)/fonik/purple/assets/plugins/datatables/responsive.bootstrap4.min.css";
// import "../components/admin/css/style.css";
// import "../components/admin/css/icons.css";
import "../components/admin/admin_template (1)/fonik/purple/assets/css/bootstrap.min.css";
import "../components/admin/admin_template (1)/fonik/purple/assets/css/icons.css";
import "../components/admin/admin_template (1)/fonik/purple/assets/css/styles.css";

// assets/images/users/avatar-1.jpg
// "assets/images/users/avatar-2.jpg"
>>>>>>> 9aa9ee5805c6c64c2bbad2335f5864f587793122

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    };
  }

 

<<<<<<< HEAD
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
  toggleSwitchf = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };

  App = () => {
    const [modalShow, setModalShow] = useState(false);
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
=======
  App = () => {
   
    return <div>

<body>

        {/* <!-- Loader --> */}
        {/* <div id="preloader"><div id="status"><div className="spinner"></div></div></div> */}

        <div className="header-bg">
            {/* <!-- Navigation Bar--> */}
            <header id="topnav">
                <div className="topbar-main">
                    <div className="container-fluid-edited">

                        {/* <!-- Logo container--> */}
                        <div className="logo">
                            {/* <!-- Text Logo --> */}
                            <a href="index.html" className="logo">
                                CHATTA
                            </a>
                            {/* <!-- Image Logo --> */}
                            {/* <!-- <a href="index.html" className="logo">
                                <img src="assets/images/logo-sm.png" alt="" height="22" className="logo-small"></img>
                                <img src="assets/images/logo.png" alt="" height="24" className="logo-large"></img>
                            </a> --> */}

>>>>>>> 9aa9ee5805c6c64c2bbad2335f5864f587793122
                        </div>
                        {/* <!-- End Logo container--> */}

<<<<<<< HEAD
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
=======

                        <div className="menu-extras topbar-custom">

                            <ul className="list-inline float-right mb-0">
                                
                                {/* <!-- notification--> */}
                                <li className="list-inline-item dropdown notification-list">
                                    <a className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                        <i className="ti-bell noti-icon"></i>
                                        <span className="badge badge-info badge-pill noti-icon-badge">3</span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                                        {/* <!-- item--> */}
                                        <div className="dropdown-item noti-title">
                                            <h5>Notification (3)</h5>
                                        </div>

                                        {/* <!-- item--> */}
                                        <a href="javascript:void(0);" className="dropdown-item notify-item active">
                                            <div className="notify-icon bg-success"><i className="mdi mdi-cart-outline"></i></div>
                                            <p className="notify-details"><b>Your order is placed</b><small className="text-muted"><div className="container-fluid">
                                                {/* <!-- Page-Title --> */}
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="page-title-box">
                                                            <form className="float-right app-search">
                                                                <input type="text" placeholder="Search..." className="form-control"></input>
                                                                <button type="submit"><i className="fa fa-search"></i></button>
                                                            </form>
                                                            <h4 className="page-title"> <i className="dripicons-meter"></i> Dashboard</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- end page title end breadcrumb --> */}
                                
                                                <div className="row">
                                                    <div className="col-12 mb-4">
                                                        <div id="morris-bar-example" className="dash-chart"></div>
                                
                                                        <div className="mt-4 text-center">
                                                            <button type="button" className="btn btn-outline-light ml-1 waves-effect waves-light">Year 2017</button>
                                                            <button type="button" className="btn btn-outline-info ml-1 waves-effect waves-light">Year 2018</button>
                                                            <button type="button" className="btn btn-outline-light ml-1 waves-effect waves-light">Year 2019</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>Dummy text of the printing and typesetting industry.</small></p>
                                        </a>

                                        {/* <!-- item--> */}
                                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                                            <div className="notify-icon bg-warning"><i className="mdi mdi-message"></i></div>
                                            <p className="notify-details"><b>New Message received</b><small className="text-muted">You have 87 unread messages</small></p>
                                        </a>

                                        {/* <!-- item--> */}
                                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                                            <div className="notify-icon bg-info"><i className="mdi mdi-martini"></i></div>
                                            <p className="notify-details"><b>Your item is shipped</b><small className="text-muted">It is a long established fact that a reader will</small></p>
                                        </a>

                                        {/* <!-- All--> */}
                                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                                            View All
                                        </a>

                                    </div>
                                </li>
                                {/* <!-- User--> */}
                                <li className="list-inline-item dropdown notification-list">
                                    <a className="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                        <img src="assets/images/users/avatar-1.jpg" alt="user" className="rounded-circle"></img>
                                        <span className="ml-1">Frank ONeil<i className="mdi mdi-chevron-down"></i> </span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                        <a className="dropdown-item" href="#"><i className="dripicons-user text-muted"></i> Profile</a>
                                        <a className="dropdown-item" href="#"><i className="dripicons-wallet text-muted"></i> My Wallet</a>
                                        <a className="dropdown-item" href="#"><span className="badge badge-success pull-right m-t-5">5</span><i className="dripicons-gear text-muted"></i> Settings</a>
                                        <a className="dropdown-item" href="#"><i className="dripicons-lock text-muted"></i> Lock screen</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#"><i className="dripicons-exit text-muted"></i> Logout</a>
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
>>>>>>> 9aa9ee5805c6c64c2bbad2335f5864f587793122
                        </div>
                        {/* <!-- end menu-extras --> */}

                        <div className="clearfix"></div>

                    </div> 
                    {/* <!-- end container --> */}
                </div>
                {/* <!-- end topbar-main --> */}

<<<<<<< HEAD
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
=======
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

>>>>>>> 9aa9ee5805c6c64c2bbad2335f5864f587793122
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
<<<<<<< HEAD
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

                  <ButtonToolbar>
                    <Button
                      className="btn btn-outline-light ml-1 waves-effect waves-light"
                      variant="primary"
                      onClick={() => setModalShow(true)}
                    >
                      Create User +
                    </Button>
                    <SettingsModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </ButtonToolbar>
=======
                                            {/* <!-- End navigation menu --> */}
                        </div> 
                        {/* <!-- end #navigation --> */}
                    </div> 
                    {/* <!-- end container --> */}
                </div> 
                {/* <!-- end navbar-custom --> */}
            </header>
            {/* <!-- End Navigation Bar--> */}

            <div className="container-fluid">
                {/* <!-- Page-Title --> */}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <form className="float-right app-search">
                                <input type="text" placeholder="Search..." className="form-control"></input>
                                <button type="submit"><i className="fa fa-search"></i></button>
                            </form>
                            <h4 className="page-title"> <i className="dripicons-meter"></i> Dashboard</h4>
                        </div>
                    </div>
                </div>
                {/* <!-- end page title end breadcrumb --> */}

                <div className="row">
                    <div className="col-12 mb-4">
                        <div id="morris-bar-example" className="dash-chart"></div>

                        <div className="mt-4 text-center">
                            <button type="button" className="btn btn-outline-light ml-1 waves-effect waves-light">Year 2017</button>
                            <button type="button" className="btn btn-outline-info ml-1 waves-effect waves-light">Year 2018</button>
                            <button type="button" className="btn btn-outline-light ml-1 waves-effect waves-light">Year 2019</button>
                        </div>
                    </div>
>>>>>>> 9aa9ee5805c6c64c2bbad2335f5864f587793122
                </div>
            </div>
        </div>

<<<<<<< HEAD
        <div className="wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">Active Users</h4>
                    <p className="text-muted m-b-30 font-14">
                      DataTables has most features enabled by default, so all
                      you need to do to use it with your own tables is to call
                      the construction function: <code>$().DataTable();</code>.
                    </p>

                    <table id="datatable" className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Active</th>
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
                            <td>
                              <Switch
                                onClick={this.toggleSwitchf}
                                on={this.state.switched}
                              />
                            </td>
                            <td>2008/12/19</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm waves-effect"
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
=======

        <div className="wrapper">
            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-6 col-xl-3">
                        <div className="card text-center m-b-30">
                            <div className="mb-2 card-body text-muted">
                                <h3 className="text-info">15,852</h3>
                                Monthly Statistics
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card text-center m-b-30">
                            <div className="mb-2 card-body text-muted">
                                <h3 className="text-purple">9,514</h3>
                                New Orders
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card text-center m-b-30">
                            <div className="mb-2 card-body text-muted">
                                <h3 className="text-primary">289</h3>
                                New Users
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card text-center m-b-30">
                            <div className="mb-2 card-body text-muted">
                                <h3 className="text-danger">5,220</h3>
                                Unique Visitors
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end row --> */}

                <div className="row">

                    <div className="col-xl-4">
                        <div className="card m-b-30">
                            <div className="card-body">
                                <h4 className="mt-0 header-title">Monthly Earnings</h4>

                                <div className="row text-center m-t-20">
                                    <div className="col-6">
                                        <h5 className="">56241</h5>
                                        <p className="text-muted font-14">Marketplace</p>
                                    </div>
                                    <div className="col-6">
                                        <h5 className="">23651</h5>
                                        <p className="text-muted font-14">Total Income</p>
                                    </div>
                                </div>

                                <div id="morris-donut-example" className="dash-chart"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-8">
                        <div className="card m-b-30">
                            <div className="card-body">
                                <h4 className="mt-0 header-title">Email Sent</h4>

                                <div className="row text-center m-t-20">
                                    <div className="col-4">
                                        <h5 className="">56241</h5>
                                        <p className="text-muted font-14">Marketplace</p>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="">23651</h5>
                                        <p className="text-muted font-14">Total Income</p>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="">23651</h5>
                                        <p className="text-muted font-14">Last Month</p>
                                    </div>
                                </div>

                                <div id="morris-area-example" className="dash-chart"></div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <!-- end row --> */}

                <div className="row">
                    <div className="col-xl-8">
                        <div className="card m-b-30">
                            <div className="card-body">
                                <h4 className="mt-0 m-b-30 header-title">Latest Transactions</h4>

                                <div className="table-responsive">
                                    <table className="table m-t-20 mb-0 table-vertical">

                                        <tbody>
                                        <tr>
                                            <td>
                                                <img src="assets/images/users/avatar-2.jpg" alt="user-image" className="thumb-sm rounded-circle mr-2"/>
                                                Herbert C. Patton
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-success"></i> Confirm</td>
                                            <td>
                                                $14,584
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                5/12/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <img src="assets/images/users/avatar-3.jpg" alt="user-image" className="thumb-sm rounded-circle mr-2"/>
                                                Mathias N. Klausen
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-warning"></i> Waiting payment</td>
                                            <td>
                                                $8,541
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                10/11/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <img src="assets/images/users/avatar-4.jpg" alt="user-image" className="thumb-sm rounded-circle mr-2"/>
                                                Nikolaj S. Henriksen
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-success"></i> Confirm</td>
                                            <td>
                                                $954
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                8/11/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <img src="assets/images/users/avatar-5.jpg" alt="user-image" className="thumb-sm rounded-circle mr-2"/>
                                                Lasse C. Overgaard
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-danger"></i> Payment expired</td>
                                            <td>
                                                $44,584
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                7/11/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <img src="assets/images/users/avatar-6.jpg" alt="user-image" className="thumb-sm rounded-circle mr-2"/>
                                                Kasper S. Jessen
                                            </td>
                                            <td><i className="mdi mdi-checkbox-blank-circle text-success"></i> Confirm</td>
                                            <td>
                                                $8,844
                                                <p className="m-0 text-muted font-14">Amount</p>
                                            </td>
                                            <td>
                                                1/11/2016
                                                <p className="m-0 text-muted font-14">Date</p>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4">
                        <div className="card m-b-30">
                            <div className="card-body">
                                <h4 className="mt-0 m-b-15 header-title">Recent Activity Feed</h4>

                                <ol className="activity-feed mb-0">
                                    <li className="feed-item">
                                        <span className="date">Sep 25</span>
                                        <span className="activity-text">Responded to need “Volunteer Activities”</span>
                                    </li>

                                    <li className="feed-item">
                                        <span className="date">Sep 24</span>
                                        <span className="activity-text">Added an interest “Volunteer Activities”</span>
                                    </li>
                                    <li className="feed-item">
                                        <span className="date">Sep 23</span>
                                        <span className="activity-text">Joined the group “Boardsmanship Forum”</span>
                                    </li>
                                    <li className="feed-item">
                                        <span className="date">Sep 21</span>
                                        <span className="activity-text">Responded to need “In-Kind Opportunity”</span>
                                    </li>
                                    <li className="feed-item">
                                        <span className="date">Sep 18</span>
                                        <span className="activity-text">Created need “Volunteer Activities”</span>
                                    </li>
                                    <li className="feed-item pb-2">
                                        <span className="date">Sep 17</span>
                                        <span className="activity-text">Attending the event “Some New Event”. Responded to needed</span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>


>>>>>>> 9aa9ee5805c6c64c2bbad2335f5864f587793122
                </div>
                {/* <!-- end row --> */}

            </div> 
            {/* <!-- end container --> */}
        </div>
        {/* <!-- end wrapper --> */}


        {/* <!-- Footer --> */}
        <footer className="footer">
<<<<<<< HEAD
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                © 2019 Chatta - Crafted with{" "}
                <i className="mdi mdi-heart text-danger"></i> by IT Horizons
                Limited.
              </div>
=======
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        © 2018 Fonik - Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand.
                    </div>
                </div>
>>>>>>> 9aa9ee5805c6c64c2bbad2335f5864f587793122
            </div>
        </footer>
        {/* <!-- End Footer --> */}
<<<<<<< HEAD
      </div>
    );
=======


        
    </body>


    </div>;
>>>>>>> 9aa9ee5805c6c64c2bbad2335f5864f587793122
  };

  render() {
    return <div>{<this.App />}</div>;
  }
}
