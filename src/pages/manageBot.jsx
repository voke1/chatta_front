import React, { Component } from "reactn";
import { Link } from "react-router-dom";
import { FacebookProgress } from "../components/admin/adminDashboard/Authentication/progressbar";
import uuid from "uuid/v1";

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
import { Card } from "react-bootstrap";

const BASE_URL = APP_ENVIRONMENT.base_url;
export class ManageBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
      switchClassName:"switch",
      showProgress: false,
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
      updateSettings: false,
      chatTree: [],
      treeId: "",
      trainingMode: false,
      trainingCode: null
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    Axios.get(`${BASE_URL}/setting/${this.state.settingId}`)
      .then(res => {
        const result = res.data;
        console.log("hey", result);
        const settings = result.findTree.setting_id;
        this.setState({
          settings,
          chatTree: result.findTree.chat_body,
          treeId: result.findTree._id,
          chatbotName: settings.chatbotName,
          welcomeMessage: settings.welcomeMessage,
          fallbackMessage: settings.fallbackMessage,
          delayPrompt: settings.delayPrompt,
          delayTime: settings.delayTime,
          primaryColor: settings.primaryColor,
          secondaryColor: settings.secondaryColor,
          botImage: settings.botImage,
          trainingCode: settings.trainingCode,
          trainingMode: settings.trainingMode
        });
      })
      .catch(err => {});
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
      const fileInput = e.target.files[0];
      this.setState({
        file: fileInput.name
      });
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
  handleCheck = () => {
    const mode = !this.state.trainingMode;
    const code = uuid();
    const bot = {
      welcomeMessage: this.state.welcomeMessage,
      fallbackMessage: this.state.fallbackMessage,
      delayPrompt: this.state.delayPrompt,
      chatbotName: this.state.chatbotName,
      primaryColor: this.state.primaryColor,
      secondaryColor: this.state.secondaryColor,
      delayTime: this.state.delayTime,
      botImage: this.state.botImage,
      trainingCode: code,
      trainingMode: mode
    };
    this.setState({
      trainingMode: mode,
      trainingCode: "",
      showProgress: true,switchClassName:"switch disabled"
    });

    Axios.put(`${BASE_URL}/setting/${this.state.settingId}`, bot)
      .then(res => {
        console.log("update", res);
        this.setState({ showProgress: false,switchClassName:"switch", trainingCode:code });
      })
      .catch(err => {
        console.log(err);
        this.setState({ showProgress: false, switchClassName:"switch" });
      });
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
      botImage: this.state.botImage,
      trainingCode: this.state.trainingCode,
      trainingMode: this.state.trainingMode
    };

    Axios.put(`${BASE_URL}/setting/${this.state.settingId}`, bot)
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

        {!this.state.settings.fallbackMessage ? (
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
            <div className="container-fluid" style={{ marginTop: "25px" }}>
              <div className="row">
                <div className="col-md-12 mt-20">
                  <div className="card ">
                    {this.state.updateSettings ? (
                      <BotUpdateAlertDialog closeDialog={this.closeDialog} />
                    ) : null}
                    <Tabs
                      defaultActiveKey={this.state.tab}
                      id="controlled-tab-example"
                      onSelect={tab => {
                        tab === "intent"
                          ? this.setState({ tab, fetchedTree: true })
                          : this.setState({ tab });
                        if (tab === "settings") {
                          this.componentDidMount();
                        }
                      }}
                    >
                      &nbsp;
                      <Tab eventKey="settings" title="Edit Bot" className>
                        <div className="" style={{ background: "none" }}>
                          <div className="card">
                            <div className="card-body px-lg-5">
                              <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                  <div className="col-md-12">
                                    <label>Bot Name</label>
                                    <div className="md-form mt-3">
                                      <input
                                        type="text"
                                        id="materialSubscriptionFormPasswords"
                                        className="form-control"
                                        value={this.state.chatbotName}
                                        name="chatbotName"
                                        onChange={this.handleChange}
                                        style={{ marginTop: "-2%" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>Delay Time</label>
                                      <div className="md-form mt-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={this.state.delayTime}
                                          name="delayTime"
                                          onChange={this.handleChange}
                                          style={{ marginTop: "-2%" }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>Fallback Message</label>
                                      <div className="md-form mt-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={this.state.fallbackMessage}
                                          name="fallbackMessage"
                                          onChange={this.handleChange}
                                          style={{ marginTop: "-2%" }}
                                        ></input>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>Delay Prompt</label>
                                      <div className="md-form mt-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={this.state.delayPrompt}
                                          name="delayPrompt"
                                          onChange={this.handleChange}
                                          style={{ marginTop: "-2%" }}
                                        ></input>
                                      </div>
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
                                <div
                                  className="card"
                                  style={{ width: "fit-content", margin: 10 }}
                                >
                                  <img
                                    style={{ width: 70, height: 70 }}
                                    src={this.state.botImage}
                                    alt=""
                                  />
                                </div>
                                <div class="custom-file">
                                  <input
                                    type="file"
                                    class="custom-file-input"
                                    id="customFileLang"
                                    lang="en"
                                    onChange={this.handleImageChange}
                                  />
                                  <label
                                    class="custom-file-label"
                                    for="customFileLang"
                                  >
                                    {this.state.file}
                                  </label>
                                </div>

                                <input
                                  type="file"
                                  onChange={this.handleImageChange}
                                  ref={this.inputRef}
                                  style={{ display: "none" }}
                                />
                                <div style={{ marginTop: 20 }}>
                                  <span style={{ marginRight: "10px" }}>
                                    Training mode
                                  </span>

                                  <label class={this.state.switchClassName}>
                                    <input
                                      className=""
                                      type="checkbox"
                                      checked={this.state.trainingMode}
                                      onChange={this.handleCheck}
                                      check
                                    ></input>
                                    <span class="slider round "></span>
                                  </label>

                                  {this.state.trainingMode ? (
                                    <span style={{ marginLeft: "15px" }}>
                                      {this.state.trainingCode}
                                    </span>
                                  ) : null}
                                  <div style={{ display: "in-line" }}>
                                    {this.state.showProgress ? (
                                      <FacebookProgress size={20} />
                                    ) : null}
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
                            {this.state.tab === "intent" ? (
                              <FetchTree
                                chatTree={this.state.chatTree}
                                treeId={this.state.treeId}
                                settings={{
                                  fallbackMessage: this.state.fallbackMessage,
                                  delayPrompt: this.state.delayPrompt
                                }}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
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
