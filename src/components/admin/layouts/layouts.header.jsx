import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { logout } from '../adminDashboard/Authentication/UserFunctions';
import avatar from "../images/users/avatar-1.jpg";
import CompanyModal from "../adminDashboard/Bot/createCompany"
import "./layouts.style.css";
import { MDBIcon } from "mdbreact";
import { Redirect } from "react-router-dom";

const userDetails = JSON.parse(localStorage.getItem("userdetails"));
export default class LayoutHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedStatus: false
    };
  }

  logout = () => {
    localStorage.clear();
    this.setState({ loggedStatus: true });
  };

  getResultBasedOnRole = (feature) => {

    if (feature === 'dashboard') {
      return <Link to="/dashboard/admin">
        &nbsp;&nbsp;&nbsp;&nbsp;{" "} <a>
          <i className="dripicons-device-desktop"></i>Dashboard
                        </a>
      </Link>
    } else if (feature === 'chatbot') {
      return <Link to="/dashboard/admin/bot">
        <a>
          <i className="dripicons-device-desktop"></i>Chatbots
                        </a>
      </Link>

    } else if (feature === 'payment') {

      return <Link to="/dashboard/payment">
        <a>
          <i className="dripicons-suitcase"></i>Payments
                        </a>
      </Link>

    } else if (feature === 'company') {
      if (userDetails.role === 'admin' || userDetails.role === 'superadmin') {

        return <Link to="/dashboard/admin/company">
          <a>
            <i className="dripicons-home"></i>Companies
                          </a>
        </Link>
      }
    }
    else if (feature === 'user') {
      if (userDetails.role === 'admin' || userDetails.role === 'superadmin') {
        return <Link to="/dashboard/admin/user">
          <a>
            <i className="dripicons-suitcase"></i>Users
                          </a>
        </Link>

      }

    } else {
      return ""
    }
  }

  render() {
    const avatar1 = <MDBIcon far icon="user-circle" size="2x" />;
    let feature;

    return (
      <div>
        {/* <!-- Navigation Bar--> */}
        {console.log("myuserDetails: ", userDetails.role)}
        {this.state.loggedStatus ? (
          <Redirect to={"/auth/login"} />
        ) : (
            <header id="topnav">
              <div className="topbar-main">
                <div className="container-fluid">
                  {/* <!-- Logo container--> */}
                  <div className="logo">
                    {/* <!-- Text Logo --> */}
                    <a href="index.html" className="logo">
                      &nbsp; CHATTA
                  </a>
                  </div>
                  {/* <!-- End Logo container--> */}

                  <div className="menu-extras topbar-custom">
                    <ul className="list-inline float-right mb-0">
                      {/* <!-- notification--> */}

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
                          <span
                            src={avatar1}
                            alt="user"
                            className="rounded-circle"
                          >
                            {avatar1}
                          </span>
                          <span className="ml-1 dropdown">
                            {userDetails.fullName}{" "}
                            <i className="mdi mdi-chevron-down"></i>{" "}
                          </span>
                        </a>
                        <div className="dropdown-content dropdown-menu dropdown-menu-right profile-dropdown ">
                          <Link to={`/dashboard/admin/user/${userDetails.id}`}>
                            <a className="dropdown-item">
                              <i className="dripicons-user text-muted"></i>{" "}
                              Profile
                          </a>
                          </Link>
                          <div className="dropdown-divider"></div>
                          <a
                            className="dropdown-item"
                            onClick={() => this.logout()}
                          >
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
                        {this.getResultBasedOnRole(feature = 'dashboard')}
                      </li>

                      <li className="has-submenu">
                        {this.getResultBasedOnRole(feature = 'chatbot')}
                      </li>
                      <li className="has-submenu">

                        {this.getResultBasedOnRole(feature = 'user')}
                      </li>

                      <li className="has-submenu">
                        {this.getResultBasedOnRole(feature = 'company')}
                      </li>

                      <li className="has-submenu">
                        {this.getResultBasedOnRole(feature = 'payment')}
                      </li>
                    </ul>
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </header>
          )}

      </div>
    );
  }
}
