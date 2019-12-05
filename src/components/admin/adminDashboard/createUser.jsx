import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "../plugins/datatables/dataTables.bootstrap4.min.css";
import "../plugins/datatables/responsive.bootstrap4.min.css";
import "../css/style.css";
import "../css/icons.css";
import "../css/bootstrap.min.css";
import "../images/favicon.ico";
import { Tabs, Tab, Row, Col, Form } from "react-bootstrap";
import "../css/customise.css";
import Axios from "axios";

export class CreateUser extends Component {
  state = {
    fullName: null,
    password: null,
    email: null,
    phone: null
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();

    const user = {
      fullName: this.state.fullName,
      password: this.state.password,
      email: this.state.email,
      phone: this.state.phone,
      isVerified: true
    };

    console.log(user);
    Axios.post("http://localhost:9000/client/newclient", {
      ...user
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <Modal {...this.props} dialogClassName="bigModal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="USER">
              <Form onSubmit={this.handleSubmit}>
                &nbsp;
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Full Name
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="fullName"
                      name="fullName"
                      placeholder="Full name"
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Phone
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="phone"
                      name="phone"
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={2}>
                    Password
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="btn btn-primary waves-effect waves-light"
            onClick={this.handleSubmit}
          >
            CREATE
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
