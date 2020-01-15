import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { logout } from '../adminDashboard/Authentication/UserFunctions';
import avatar from "../images/users/avatar-1.jpg";
import "./layouts.style.css";
import {Redirect} from "react-router-dom"

export default class LayoutHeader extends Component {
  constructor(props) {
    super(props);
    this.state={
      loggedStatus: false
    }
  }

  logout = () => {
    console.log("logout is called")
    localStorage.clear()
    this.setState({loggedStatus: true})

  }
  

  render() {

      const userDetails = JSON.parse(localStorage.getItem('userdetails'))
      console.log("userDetails:", userDetails)

    return (

      <div>
        {/* <!-- Navigation Bar--> */}
        
        {this.state.loggedStatus?<Redirect to={"/auth/login"}/>:<header id="topnav">
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
                            Dummy text of the printing and typesetting industry.
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
                      <span className="ml-1 dropdown">
                        {userDetails.fullName} <i className="mdi mdi-chevron-down"></i>{" "}
                      
                      </span>
                    </a>
                    <div className="dropdown-content dropdown-menu dropdown-menu-right profile-dropdown ">
        <Link to={`/dashboard/admin/user/${userDetails.id}`}>
                    <a className="dropdown-item">
                        <i className="dripicons-user text-muted"></i> Profile
                      </a></Link>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" onClick={() => this.logout()} >
                        <i className="dripicons-exit text-muted" ></i> Logout
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
                  {userDetails.role === 'superadmin' ? <li className="has-submenu">
                    <Link to="/dashboard/admin/company">
                      <a>
                        <i className="dripicons-home"></i>Companies
                      </a>
                    </Link>
                  </li> : " "}

                  {userDetails.role === `admin`||`superadmin` ? <li className="has-submenu">
                    {" "}
                    <Link to="/dashboard/admin/user">
                      <a>
                        <i className="dripicons-suitcase"></i>Users
                      </a>
                    </Link>
                  </li> : ""}

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
        </header>}
        {/* <!-- End Navigation Bar--> */}

        {/* <div className="container-fluid"> */}
        {/* <!-- Page-Title --> */}
        {/* <div>
                        <AppNotification msg={this.props.notification.msg}
                            type={this.props.notification.type} />
                    </div> */}

        {/* <div className="row"> */}
        {/* <div className="col-sm-12"> */}
        {/* <div className="page-title-box"> */}

        {/* <h3 className="float-left">{this.props.pageTitle || "Current Page"}</h3> */}

        {/* <form className="float-right app-search">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="form-control"
                                    ></input>
                                    <button type="submit">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </form> */}

        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* <!-- end page title end breadcrumb --> */}
        {/* </div> */}
      </div>
    );
  }
}





