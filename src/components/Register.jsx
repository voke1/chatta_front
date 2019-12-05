import React, { Component } from "react";
import { register } from "./UserFunctions";
import { Validation } from "../utilities/validations";
import ProgressBar from "./progressbar";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      fullName: "",
      disabled: true,
      borderColor: "1px solid #edabaf",
      color: "#c74a51"
    };
    this.onChange = this.onChange.bind(this);
  }
  async onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    const result = await Validation.validateAll(e);
    this.setState({
      isChanged: true,
      message: result.message,
      disabled: result.disabled,
      [result.color.name]: result.color.value
    });
  }
  onSubmit = e => {
    e.preventDefault();
    this.setState({
      showProgress: true,
      disabled: true
    });
    const user = {
      email: this.state.email,
      password: this.state.password,
      fullName: this.state.fullName
    };
    register(user).then(res => {
      console.log("this is res.data", res.data)
      if (res) {
        if (!res.data.success) {
          console.log(res);
          this.setState({
            isChanged: true,
            message: res.data.message,
            disabled: true,
            password: "",
            borderColor: "1px solid #edabaf",
            color: "#c74a51",
            showProgress: false
          });
        }
      }

      if (res.data.success) {
        this.setState({
          fullName: "",
          email: "",
          password: "",
          success: true,
          message: res.data.message,
          disabled: true,
          color: "green",
          borderColor: "green",
          showProgress: false
        });
      }
    });
  };
  render() {
    const message = (
      <p
        className={this.state.message ? "animated shake" : ""}
        style={{ color: this.state.color }}
      >
        {this.state.message}
      </p>
    );
    const progressBar = <ProgressBar />;

    return (
      <div className="background">
        <div className="wrapper-page">
          <div className="card">
            {this.state.showProgress ? progressBar : ""}
            <div className="card-body">
              <h3 className="text-center m-0">
                <a href="index.html" className="logo logo-admin">
                  <img
                    src="https://www.logogenie.net/download/preview/medium/3589659"
                    height="30"
                    alt="logo"
                  />
                </a>
              </h3>

              <div className="p-3">
                <h4 className="text-muted font-18 m-b-5 text-center">
                  Free Register
                </h4>
                <p className="text-muted text-center">
                  Get your free Chatta account now.
                </p>

                <div
                  className="alert2"
                  style={{
                  }}
                >
                  {this.state.isChanged ? message : ""}
                </div>
                <form
                  className="form-horizontal m-t-30"
                  onSubmit={this.onSubmit}
                >
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      disabled={this.state.success}
                      style={{ backgroundColor: this.state.nameColor }}
                      type="text"
                      className="form-control"
                      id="fullname"
                      name="fullName"
                      value={this.state.fullName}
                      onChange={this.onChange}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      disabled={this.state.success}
                      style={{ backgroundColor: this.state.emailColor }}
                      type="email"
                      className="form-control"
                      id="useremail"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      placeholder="Enter email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      disabled={this.state.success}
                      style={{ backgroundColor: this.state.passwordColor }}
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      placeholder="Enter password"
                    />
                  </div>

                  <div className="form-group row m-t-20">
                    <div className="col-12 text-right">
                      <button
                        disabled={this.state.disabled}
                        className="btn btn-primary w-md waves-effect waves-light"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </div>

                  <div className="form-group m-t-10 mb-0 row">
                    <div className="col-12 m-t-20">
                      <p className="font-14 text-muted mb-0">
                        {"By registering you agree to the Chatta's "}
                        <a href="pp.com">Terms of Use</a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="m-t-40 text-center">
            <p>
              {"Already have an account ? "}
              <a
                href="login"
                className="font-500 font-14 text-primary font-secondary"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
