import React, { Component } from "react";
import * as query_string from "query-string";
import { Link } from "react-router-dom";

import { resetPassword } from "./UserFunctions";
import { Validation } from "../../../../utilities/validations";
import ProgressBar from "./progressbar";
import { Redirect } from "react-router-dom";

class VerifyNewPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password2: "",
      fullName: "",
      disabled: true,
      password1Validated: false,
      borderColor: "1px solid #edabaf",
      color: "#c74a51",
      isReset: false
    };
    this.onChange = this.onChange.bind(this);
  }

  async onChange(e) {
    if (e.target.name === "password") {
      this.setState({
        password: e.target.value,
        password2: "",
        disabled: true
      });

      const result = await Validation.validatePassword(e.target.value);
      console.log("validated", this.state.password);
      this.setState({
        isChanged: true,
        message: result.message,
        password1Validated: result.disabled,
        [result.color.name]: result.color.value
      });
    } else {
      this.setState({ password2: e.target.value });
      if (
        this.state.password1Validated &&
        e.target.value === this.state.password
      ) {
        this.setState({ disabled: false, message: "" });
      } else {
        this.setState({
          isChanged: true,
          message: "Passwords do not match",
          password2Color: "#edcad",
          disabled: true
        });
      }
    }
  }
  onSubmit = async e => {
    e.preventDefault();
    this.setState({
      showProgress: true,
      disabled: true
    });
    const params = query_string.parse(this.props.location.search);
    try {
      const result = await resetPassword(params.token, [
        this.state.password,
        this.state.password2
      ]);

      if (result.success) {
        console.log("result", result);

        this.setState({
          isReset: true,
          progressBar: false
        });
      }
    } catch (error) {
      console.log("error response", error);
    }
  };
  render() {
    const message = !this.state.isReset ? (
      <p
        className={this.state.message ? "animated shake" : ""}
        style={{ color: this.state.color }}
      >
        {this.state.message}
      </p>
    ) : (
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
          <span>
            Your password has been successfully reset. You can proceed to{" "}
            <Link to="login">
              <span
                style={{
                  fontSize: "25px",
                  color: "blue"
                }}
              >
                Login
              </span>
            </Link>
          </span>
        </div>
      </div>
    );
    const progressBar = <ProgressBar />;

    return (
      <div className="background">
        <div className="wrapper-page">
          <div className="card">
            {this.state.showProgress && !this.state.isReset
              ? progressBar
              : null}
            {!this.state.isReset ? (
              <div className="card-body">
                <div className="p-3">
                  <span
                    style={{ fontSize: "30px" }}
                    className="text-muted text-center"
                  >
                    Enter New Password
                  </span>

                  <div className="alert2" style={{}}>
                    {this.state.isChanged ? message : ""}
                  </div>
                  <form className="text-center m-t-30" onSubmit={this.onSubmit}>
                    <div className="md-form">
                      <input
                        disabled={this.state.success}
                        style={{ backgroundColor: this.state.passwordColor }}
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        placeholder="New password"
                      />
                    </div>
                    <div className="md-form">
                      <input
                        disabled={this.state.success2}
                        style={{ backgroundColor: this.state.passwordColor2 }}
                        type="password"
                        className="form-control"
                        id="password2"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                        placeholder="Verify password"
                      />
                    </div>
                    <div className="form-group row m-t-20">
                      <div className="col-12 text-right">
                        <button
                          disabled={this.state.disabled}
                          className="btn"
                          style={{
                            width: "100%",
                            margin: "auto",
                            color: "white",
                            background: "#5CB85C",
                            borderRadius: "8px"
                          }}
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              message
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyNewPassword;
