import React, { Component, useState } from "react";
import { Modal, Button, ModalDialog } from "react-bootstrap";
import "../plugins/datatables/dataTables.bootstrap4.min.css";
import "../plugins/datatables/responsive.bootstrap4.min.css";
import "../css/style.css";
import "../css/icons.css";
import "../css/bootstrap.min.css";
import "../images/favicon.ico";
import { Tabs, Tab, Row, Col, Form } from "react-bootstrap";
import "../css/customise.css";

export class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal {...this.props} dialogClassName="bigModal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            CREATE USER
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="profile" title="Profile">
              <Form>
                &nbsp;
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="email" placeholder="Email" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={2}>
                    Password
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="password" placeholder="Password" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="email" placeholder="Email" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={2}>
                    Password
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="password" placeholder="Password" />
                  </Col>
                </Form.Group>
              </Form>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            onClick={this.props.onHide}
          >
            Create User
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
