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
import { Tab, Tabs, Row, Col, Form, Button } from "react-bootstrap";
import FetchTree from "../components/admin/adminDashboard/Bot/fetch-tree";
import { storage } from "../firebase/index";
import { APP_ENVIRONMENT } from "../environments/environment";
import BotUpdateAlertDialog from "../components/admin/adminDashboard/Bot/botUpdateDialog";

const BASE_URL = APP_ENVIRONMENT.base_url;
export class ManageBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
      settingId: props.match.params.id,
      welcomeMessage: null,
      fallbackMessage: null,
      delayPrompt: null,
      chatbotName: null,
      tab: "settings",
      fetchedTree: false,
      delayTime: " ",
      primaryColor: " ",
      secondaryColor: " ",
      fileUpload: null,
      loading: true,
      updateSettings: false
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    Axios.get(`${BASE_URL}/setting/${this.state.settingId}`)
      .then(res => {
        const result = res.data;
        setTimeout(() => {
          this.setState({ settings: result });
        }, 1000);
      })
      .catch(err => {});
    console.log("Result67:", this.state.settings);

    setTimeout(() => {
      this.setState({
        primaryColor: this.state.settings.primaryColor,
        secondaryColor: this.state.settings.secondaryColor,
        fallbackMessage: this.state.settings.fallbackMessage,
        botImage: this.state.settings.botImage,
        delayPrompt: this.state.settings.delayPrompt,
        chatbotName: this.state.settings.chatbotName,
        delayTime: this.state.settings.delayTime,
        loading: false
      });
    }, 2000);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  getImage = () => {
    this.inputRef.current.click();
  };

  closeDialog = () => {
    this.setState({ updateSettings: false });
  };

  handleImageChange = e => {
    e.preventDefault();

    console.log("uploaded files:", e.target.files[0]);
    if (e.target.files[0]) {
      let reader = new FileReader();
      let image = e.target.files[0];

      reader.onloadend = () => {
        this.setState({
          fileUpload: image,
          botImage: reader.result
        });
      };

      reader.readAsDataURL(image);
    }
  };

  uploadImageToFirebase = () => {
    // this.fileUploadHandler();
    const { fileUpload } = this.state;

    if (fileUpload) {
      const uploadTask = storage
        .ref(`images/${fileUpload.name}`)
        .put(fileUpload);

      uploadTask.on(
        "state_changed",
        snapshot => {
          // progrss function ....
          // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // this.setState({progress});
        },
        error => {
          // error function ....
          console.log(error);
        },
        () => {
          // complete function ....
          storage
            .ref("images")
            .child(fileUpload.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ botImage: url });
              console.log("setstate url:", this.state.botImage);
            });
        }
      );
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ updateSettings: true });
    if (this.state.fileUpload) {
      this.uploadImageToFirebase();
    }

    const bot = {
      welcomeMessage: this.state.welcomeMessage,
      fallbackMessage: this.state.fallbackMessage,
      delayPrompt: this.state.delayPrompt,
      chatbotName: this.state.chatbotName,
      primaryColor: this.state.primaryColor,
      secondaryColor: this.state.secondaryColor,
      delayTime: this.state.delayTime,
      botImage: this.state.botImage
    };

    Axios.put(`${BASE_URL}/setting/${this.state.settingId}`, {
      ...bot
    })
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };

  App = () => {
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

        {this.state.loading ? (
          <div className="wrapper">
            <div className="container-fluid">
              <div className="preloader">
                <div id="status">
                  <div className="spinner"></div>
                </div>
              </div>
            </div>
            {/*<!-- end container --> */}
          </div>
        ) : (
          <div className="content">
            <div className="container-fluid" style={{marginTop: "25px"}}>
              <div className="row">
                <div className="col-md-8 mt-20">
                  <div className="card ">
                    {this.state.updateSettings ? (
                      <BotUpdateAlertDialog closeDialog={this.closeDialog} />
                    ) : null}
                    <Tabs
                      defaultActiveKey={this.state.tab}
                      id="controlled-tab-example"
                      onSelect={tab =>
                        tab === "intent"
                          ? this.setState({ tab, fetchedTree: true })
                          : this.setState({ tab })
                      }
                    >
                      &nbsp;
                      <Tab eventKey="settings" title="Edit Bot" className>
                        <div className="" style={{ background: "none" }}>
                          <div className="card">
                            <div className="card-body px-lg-5">
                              <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>Bot Name</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.chatbotName}
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
                                        value={this.state.delayTime}
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
                                        value={this.state.fallbackMessage}
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
                                        value={this.state.delayPrompt}
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
                                        type="color"
                                        className="form-control"
                                        name="primaryColor"
                                        onChange={this.handleChange}
                                        value={this.state.primaryColor}
                                      ></input>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>Secondary Colour</label>
                                      <input
                                        type="color"
                                        className="form-control"
                                        name="secondaryColor"
                                        onChange={this.handleChange}
                                        value={this.state.secondaryColor}
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
                      </Tab>
                      <Tab eventKey="intent" title="Edit tree">
                        <div className="card w-100">
                          <div className="card-body">
                            {this.state.tab === "intent" ? <FetchTree /> : ""}
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-user">
                    <div className="card-image">
                      <div>
                        <br />
                        <input
                          type="file"
                          onChange={this.handleImageChange}
                          ref={this.inputRef}
                          style={{ display: "none" }}
                        />
                        <br />
                      </div>

                      <img
                        src={this.state.botImage}
                        alt="BOT "
                        className="img-thumbnail"
                        style={{
                          width: "50%",
                          height: "50%",
                          marginLeft: "25%"
                        }}
                        onClick={this.getImage}
                      ></img>
                    </div>
                    <div className="card-body">
                      <h5 className="title" style={{ marginLeft: "35%" }}>
                        {this.state.chatbotName}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
