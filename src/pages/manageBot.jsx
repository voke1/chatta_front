import React, { Component } from "reactn";
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
import { Card } from "react-bootstrap";
import Header from "../components/admin/layouts/layouts.header";

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
      updateSettings: false,
      chatTree: [],
      treeId: ""
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    Axios.get(`${BASE_URL}/setting/${this.state.settingId}`)
      .then(res => {
        const result = res.data;
        console.log("hey", result)
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
          botImage: settings.botImage
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
          <Header/>
            {/* <!-- end navbar-custom --> */}
          {/* <!-- End Navigation Bar--> */}

        
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
            <div className="container-fluid" style={{ marginTop: "25px", marginBottom: "2%" }}>
              <div className="row">
                <div className="col-md-8 mt-20">
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
                                      <label>Bot icon colour</label>
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
                <div className="col-md-4">
                  <div className="card card-user">
                    <Card style={{ width: "30rem%", height: "100%" }}>
                      <Card.Img
                        variant="top"
                        src={this.state.botImage}
                        style={{ height: "20rem" }}
                        onClick={this.getImage}
                      />
                      <Card.Body>
                        <Card.Title> {this.state.chatbotName}</Card.Title>
                      </Card.Body>
                    </Card>

                    <div>
                      <input
                        type="file"
                        onChange={this.handleImageChange}
                        ref={this.inputRef}
                        style={{ display: "none" }}
                      />
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
