import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as query_string from "query-string";
import { verifyEmail } from "./UserFunctions";

class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isChanged: false,
      message: "",
      animation: "",
      redirect: ""
    };
  }
  async componentDidMount() {
    const params = query_string.parse(this.props.location.search);
    console.log()
    verifyEmail(params.token)
      .then(res => {
        if (res.data.success) {
          window.localStorage.token = params.token;
          this.setState({
            redirect: "/dashboard/admin"
          });
        }
      })
      .catch(error => {
        console.log("error response", error);
        this.setState({
          redirect: "/dashboard/admin"
        });
      });
  }
  renderRedirect = target => {
    return <Redirect to={target} />;
  };
  render() {
    return (
      <div className="wrapper-page">
        {this.state.redirect ? this.renderRedirect(this.state.redirect) : ""}
        <div className="card">
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
                Verifying ...
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EmailVerification;
