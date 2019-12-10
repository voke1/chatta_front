import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { MDBRow, MDBBtn } from "mdbreact";
import { Validation } from "../../../utilities/validations";
import Axios from "axios";

export class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      password: null,
      email: null,
      phone: null,
      disabled: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

    const result = await Validation.validateAll(event);
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

    Axios.post("http://localhost:9000/client/newclient", {
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
        <Modal.Header closeButton>
          <Modal.Title>Create a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.isChanged ? displayMessage : ""}

          <form
            className="needs-validation"
            onSubmit={this.handleSubmit}
            noValidate
            style={{ padding: "2%" }}
          >
            <MDBRow md="4" className="mb-3">
              <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
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
              <div className="invalid-feedback">
                Please enter your full name.
              </div>
              <div className="valid-feedback">Looks good!</div>
            </MDBRow>
            <MDBRow md="4" className="mb-3">
              <label
                htmlFor="defaultFormRegisterConfirmEx1"
                className="grey-text"
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
              <div className="valid-feedback">Looks good!</div>

              <div className="invalid-feedback">
                Please provide a valid email.
              </div>
            </MDBRow>
            <MDBRow md="4" className="mb-3">
              <label
                htmlFor="defaultFormRegisterConfirmEx2"
                className="grey-text"
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
                placeholder="Enter Phone Number"
                required
                maxlength="11"
              />
              <div className="valid-feedback">Looks good!</div> 
              <div className="invalid-feedback">
                Please provide a valid Phone number.
              </div>
                         
            </MDBRow>
            <MDBRow md="4" className="mb-3">
                        
              <label
                htmlFor="defaultFormRegisterConfirmEx3"
                className="grey-text"
                style={{ marginLeft: "-6%", marginTop: "-2%" }}
              >
                Password
              </label>
                            
              <input
                type="password"
                className="form-control"
                id="defaultFormRegisterConfirmEx3"
                name="password"
                onChange={this.handleChange}
                placeholder="Enter password"
                value={this.state.password}
                required
              />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">Please enter a Password.</div>
                                 
            </MDBRow>

            <button
              className="btn btn-primary w-md waves-effect waves-light"
              color="primary"
              type="submit"
              onClick={this.handleSubmit}
              style={{ marginLeft: "64%" }}
              disabled={this.state.disabled}
            >
              CREATE USER
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
