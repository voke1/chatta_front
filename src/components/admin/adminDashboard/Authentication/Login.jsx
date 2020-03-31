import React, { Component } from "react";
import { login } from "./UserFunctions";
import ProgressBar from "./progressbar";
import { Redirect ,Link} from "react-router-dom";

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
      userDetails: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  async onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = async e => {
    e.preventDefault();
    this.setState({ message: "", showProgress: true });
    const user = {
      email: this.state.email,
      password: this.state.password,
      disabled: true
    };
    try {
      const response = await login(user);
      console.log("this is the response:", response);
      if (response.data) {
        if (!response.data.success) {
          this.setState({
            isChanged: true,
            message: response.data.message,
            disabled: false,
            showProgress: false
          });
        }
        // if (response.data === 'usertoken') {
        //   this.setState({ redirect: '/dashboard/admin' })
        // }
        if (response.data.success) {
          if (!response.data.userDetails.isAdmin) {
            this.setState({
              redirect: "/dashboard/admin",
              userDetails: response.data.userDetails
            });
          } else {
            this.setState({
              redirect: "/dashboard/admin",
              userDetails: response.data.userDetails
            });
          }
        }
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
        {console.log("userdETAILS:")}
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

              <div className="alert2" style={{}}>
                <div
                  className="row align-items-center justify-content-center"
                  style={{ margin: 1 }}
                ></div>
                {this.state.isChanged ? message : ""}
              </div>
              <form
                onSubmit={this.onSubmit}
                className="text-center m-t-30"
                action="https://themesbrand.com/fonik/purple/index.html"
              >
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

                <div className="md-form">
                  <input
                    name="password"
                    onChange={this.onChange}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
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
                    <Link to="recover-password">
                      <a href="auth/recover-password" className="text-muted">
                        <i className="mdi mdi-lock"></i> Forgot your password?
                      </a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="m-t-40 text-center">
          <Link to="register">
            <p>
              Don't have an account ?{" "}
              <a
                href="register"
                className="font-500 font-14 text-primary font-secondary"
              >
                Signup Now
              </a>
            </p>
          </Link>
        </div>
      </div>
    );
  }
}
export default Login;
