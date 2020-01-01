import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { MDBRow, MDBBtn } from "mdbreact";
import { Validation } from "../../../utilities/validations";
import Axios from "axios";
import { APP_ENVIRONMENT } from "../../../environments/environment";

const BASE_URL = APP_ENVIRONMENT.base_url;

export class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      password: null,
      email: null,
      phone: null,
      disabled: true,
      setValidate: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

    const result = await Validation.validateAll(event, this.state.setValidate);
    this.setState({
      isChanged: true,
      message: result.message,
      disabled: result.disabled
    });
  }

  /***
   * function to handle submit request of onclick of create user button
   */
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
    Axios.post(`${BASE_URL}/client/new`, {
      ...user
    })
      .then(res => {
        console.log("RES.DATA", res);
        if (res.data.message) {
          this.setState({ message: res.data.message });
        } else {
          this.props.onHide();
          this.props.updateList();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  /***
   * Display modal on create user button click
   */
  render() {
    const displayMessage = (
      <p
        className={this.state.message ? "animated shake" : ""}
        style={{ color: "red" }}
      >
        {this.state.message}
      </p>
    );
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton style={{ backgroundColor: "#37295C" }}>
          <Modal.Title style={{ color: "white" }}>Create a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.isChanged ? displayMessage : ""}

          <form
            className="needs-validation"
            onSubmit={this.handleSubmit}
            noValidate
          >
            <label
              htmlFor="defaultFormRegisterNameEx"
              style={{ marginTop: "3%" }}
            >
              Full Name
            </label>
            <input
              value={this.state.fname}
              name="fullName"
              onChange={this.handleChange}
              type="text"
              id="defaultFormRegisterNameEx"
              className="form-control"
              placeholder="Full Name"
              required
            />
            <label
              htmlFor="defaultFormRegisterConfirmEx1"
              style={{ marginTop: "3%" }}
            >
              Email
            </label>
            <input
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              id="defaultFormRegisterConfirmEx1"
              className="form-control"
              name="email"
              placeholder="Your Email address"
              required
            />
            <label
              htmlFor="defaultFormRegisterConfirmEx2"
              style={{ marginTop: "3%" }}
            >
              Phone
            </label>
                         
            <input
              className="form-control"
              name="phone"
              id="defaultFormRegisterConfirmEx2"
              onChange={this.handleChange}
              value={this.state.phone}
              type="number"
              placeholder="Enter a phone number"
              required
            />
            <label
              htmlFor="defaultFormRegisterConfirmEx2"
              style={{ marginTop: "3%" }}
            >
              Password
            </label>
                         
            <input
              className="form-control"
              name="password"
              id="defaultFormRegisterConfirmEx2"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
              placeholder="Enter a password"
              required
            />
                                                      
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn"
            type="submit"
            onClick={this.handleSubmit}
            disabled={this.state.disabled}
            style={{ backgroundColor: "#36295C", color: "white" }}
          >
            CREATE USER
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
