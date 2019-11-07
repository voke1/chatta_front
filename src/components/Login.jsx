import React, { Component } from "react";
import { login } from "./UserFunctions";
import ProgressBar from "./progressbar";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isChanged: false,
      message: "",
      animation: "",
      redirect: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  async onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = e => {
    e.preventDefault();
    this.setState({ message: "", showProgress: true });
    const user = {
      email: this.state.email,
      password: this.state.password,
      disabled: true
    };
    login(user).then(res => {
      if (res) {
        if (!res.data.success) {
          console.log(res);
          this.setState({
            isChanged: true,
            message: res.data.message,
            disabled: false,
            showProgress: false
          });
        }
      }

      if (res.data.success) {
        if (!res.data.userDetails.isAdmin) {
          this.setState({
            redirect: "/dashboard/user"
          });
        } else {
          this.setState({
            redirect: "/dashboard/admin"
          });
        }
      }
    });
  };
  renderRedirect = target => {
    return <Redirect to={target} />;
  };
  render() {
    const message = (
      <p
        className={this.state.message ? "animated shake" : "msg"}
        style={{ color: "#c74a51" }}
      >
        {this.state.message}
      </p>
    );
    const progressBar = <ProgressBar />;
    return (
      <div className="wrapper-page">
        {this.state.redirect ? this.renderRedirect(this.state.redirect) : ""}
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
              <h4 className="text-muted font-18 m-b-5 text-center ">
                Welcome Back !
              </h4>
              <p className="text-muted text-center">
                Sign in to continue to Chatta.
              </p>

              <div
                className="alert"
                style={{
                  border: this.state.message ? "1px solid #edabaf" : null
                }}
              >
                <div
                  className="row align-items-center justify-content-center"
                  style={{ margin: 1 }}
                ></div>
                {this.state.isChanged ? message : ""}
              </div>
              <form
                onSubmit={this.onSubmit}
                className="form-horizontal m-t-30"
                action="https://themesbrand.com/fonik/purple/index.html"
              >
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    name="email"
                    onChange={this.onChange}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Email"
                  ></input>
                </div>

                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    name="password"
                    onChange={this.onChange}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                  ></input>
                </div>

                <div className="form-group row m-t-20">
                  <div className="col-sm-6">
                    <div className="">
                      <input type="checkbox" id="customControlInline"></input>
                      <label for="customControlInline" style={{ margin: 10 }}>
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-6 text-right">
                    <button
                      className="btn btn-primary w-md waves-effect waves-light"
                      type="submit"
                    >
                      Log In
                    </button>
                  </div>
                </div>

                <div className="form-group m-t-10 mb-0 row">
                  <div className="col-12 m-t-20">
                    <a href="pages-recoverpw.html" className="text-muted">
                      <i className="mdi mdi-lock"></i> Forgot your password?
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="m-t-40 text-center">
          <p>
            Don't have an account ?{" "}
            <a
              href="register"
              className="font-500 font-14 text-primary font-secondary"
            >
              Signup Now
            </a>
          </p>
        </div>
      </div>
    );
  }
}
export default Login;
