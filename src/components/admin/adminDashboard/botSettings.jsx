import React, { Component } from "react";
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

export class ModalComponent extends Component {
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
  fileSelectedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  fileUploadHandler = () => {
    const formData = new FormData();
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    axios.post("").then(res => {
      console.log(res);
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
        <Button
          variant="primary"
          className="btn btn-outline-light ml-1 waves-effect waves-light"
          onClick={() => this.overlayShow()}
        >
          Create Bot +
        </Button>

        {this.state.show ? (
          <section id="overlay" show={this.state.show}>
            <div className="container-holder">
              <body>
                &nbsp;&nbsp;
                <div class="header-bg1">
                  {/* <!-- Navigation Bar--> */}

                  <div class="container-fluid1">
                    {/* <!-- Page-Title --> */}
                  </div>
                </div>
                <div className="wraper">
                  <a href="#" id="close">
                    <img
                      src={closeImage}
                      width="40"
                      height="40"
                      onClick={() => this.overlayClose()}
                    ></img>
                  </a>

                  <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    &nbsp;
                    <Tab eventKey="home" title="Create Bot">
                      <Form>
                        &nbsp;
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label column sm={2}>
                            Bot Name
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="Name of Bot"
                              placeholder="Name of Bot"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label column sm={2}>
                            Welcome Message
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="Welcome Message"
                              placeholder="Welcome Message"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label column sm={2}>
                            Fallback Message
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="Welcome Message"
                              placeholder="Fallback"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label column sm={2}>
                            Delay Prompt
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="Delay Prompt"
                              placeholder="Delay Prompt"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalPassword">
                          <Form.Label column sm={2}>
                            Bot Image
                          </Form.Label>
                          <Col sm={10}>
                            <input
                              type="file"
                              class="filestyle"
                              data-buttonname="btn-secondary"
                              onChange={this.fileSelectedHandler}
                            ></input>
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalCheck">
                          <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check label="Remember me" />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Col sm={{ span: 10, offset: 2 }}>
                            <Button
                              type="submit"
                              onClick={this.fileUploadHandler}
                            >
                              NEXT STEP
                            </Button>
                          </Col>
                        </Form.Group>
                      </Form>{" "}
                    </Tab>
                    <Tab
                      eventKey="profile"
                      title="Add Intent"
                      dialogClassName="close"
                    ></Tab>
                  </Tabs>
                </div>
                {/* <!-- Footer --> */}
                <footer class="footer">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-12">
                        © 2019 - Crafted with{" "}
                        <i class="mdi mdi-heart text-danger"></i> by IT Horizons
                        Limited.
                      </div>
                    </div>
                  </div>
                </footer>
              </body>
            </div>
          </section>
        ) : null}
      </div>
    );
  }
}
