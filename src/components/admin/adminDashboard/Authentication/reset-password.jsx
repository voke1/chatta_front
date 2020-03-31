import React, { Component } from "react";
import axios from "axios";

import ProgressBar from "./progressbar";
import { Redirect, Link } from "react-router-dom";
import { Validation } from "../../../../utilities/validations";
import { APP_ENVIRONMENT } from "../../../../environments/environment";
const BASE_URL = APP_ENVIRONMENT.base_url;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isChanged: false,
      message: "",
      animation: "",
      redirect: localStorage.getItem("userdetails") ? "/dashboard/admin" : "",
      disabled: true
    };
    this.onChange = this.onChange.bind(this);
  }

  async onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    const validated = await Validation.validateEmail(e.target.value);
    this.setState({ disabled: !validated.success });
    console.log(validated);
  }
  onSubmit = async e => {
    e.preventDefault();
    this.setState({ message: "", showProgress: true, disabled: true });

    try {
      const isEmailSent = await axios.post(
        `${BASE_URL}/client/reset-password`,
        {
          email: this.state.email
        }
      );
      console.log("email sent", isEmailSent);

      if (isEmailSent.data.success) {
        console.log("email sent", isEmailSent);
        this.setState({
          showProgress: false,
          message: isEmailSent.data.message
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  renderRedirect = target => {
    return (
      <Redirect
        to={{
          pathname: target,
          state: { userDetails: this.state.userDetails }
        }}
      />
    );
  };
  render() {
    const message = this.state.message ? (
      <div
        style={{ marginTop: "60px", marginBottom: "60px" }}
        className="animated fadeIn"
      >
        <div style={{ width: "fit-content", margin: "auto" }}>
          <i
            style={{ width: "50%" }}
            className="fas fa-check"
            style={{ color: "#47632d", fontSize: "60px" }}
          ></i>
        </div>
        <div
          style={{
            width: "90%",
            margin: "auto",
            textAlign: "center",
            fontSize: "25px",
            color: "grey"
          }}
        >
          <span>{this.state.message}</span>
        </div>
      </div>
    ) : null;
    const progressBar = <ProgressBar />;
    return (
      <div className="wrapper-page">
        <div className="card">
          {this.state.showProgress ? progressBar : message}
          {!this.state.message ? (
            <div className="card-body">
              <div className="p-3">
                <form
                  onSubmit={this.onSubmit}
                  className="m-t-20"
                  action="https://themesbrand.com/fonik/purple/index.html"
                >
                  <span style={{ fontSize: "35px", display: "block" }}>
                    Forgot Password
                  </span>
                  <p style={{ marginTop: "25px", color: "grey" }}>
                    Forgot your password ? No problem, we will fix it. Just type
                    your email below and we will send you password recovery
                    instruction to your email. Follow easy steps to get back to
                    your account
                  </p>
                  <div className="md-form">
                    <input
                      name="email"
                      onChange={this.onChange}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                    ></input>
                  </div>

                  <button
                    className="btn"
                    style={{
                      width: "100%",
                      margin: "auto",
                      color: "white",
                      background: "#5CB85C",
                      borderRadius: "8px"
                    }}
                    type="submit"
                    disabled={this.state.disabled}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  
}
export default Login;
