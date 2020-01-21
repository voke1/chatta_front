import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../components/admin/images/users/avatar-1.jpg";
import "../components/admin/plugins/datatables/dataTables.bootstrap4.min.css";
import "../components/admin/plugins/datatables/responsive.bootstrap4.min.css";
import "../components/admin/css/style.css";
import "../components/admin/css/icons.css";
import "../components/admin/css/bootstrap.min.css";
import "../components/admin/images/favicon.ico";
import "../components/admin/css/switch.css";
import "../../node_modules/react-toggle-switch/dist/css/switch.min.css";
import Axios from "axios";
import Header from "../components/admin/layouts/layouts.header"
import Footer from "../components/admin/layouts/layouts.footer"
import { APP_ENVIRONMENT } from "../environments/environment";
import UserUpdateDialog from "../components/admin/adminDashboard/Bot/userUpdateDialog";
import Swal from "sweetalert2"
const BASE_URL = APP_ENVIRONMENT.base_url;
export class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
      clientId: props.match.params.id,
      updateUser: false,
    };
  }
  async componentDidMount() {
    const response = await Axios.get(`${BASE_URL}/client/${this.state.clientId}`)
    const result = response.data;
    this.setState({ client: result });
    console.log("MY CLIENT:", this.state.client)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log("my client again:", this.state.client)
  };

  closeDialog = () => {
    this.setState({ updateUser: false });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    Swal.fire(
      'Update Profile?',
      'User profile will be updated',
      'question'
    );
    const user = {
      fullName: this.state.client.fullName,
      password: this.state.client.password,
      email: this.state.client.email,
      phone: this.state.client.phone,
      role: this.state.client.role,
    };
    try {

      const response = await Axios.put(`${BASE_URL}/client/${this.state.clientId}`, user)
      const result = response.data
    } catch (error) {
      console.log(error)
    }

  };

  render() {
    // const [modalShow, setModalShow] = useState(false);
    console.log("renderClient:", this.state.client);

    return (
      <div>
        {/* <!-- Loader --> */}
        <div className="preloader">
          <div id="status">
            <div className="spinner"></div>
          </div>
        </div>

        <div className="header-bg">
          {/* <!-- Navigation Bar--> */}
          <Header />

          <div className="container-fluid">
            {/* <!-- Page-Title --> */}
            {/* <!-- Page-Title --> */}
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">

                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="wrapper">
          <div className="container-fluid">{/*  <!-- end row --> */}</div>{" "}
          {/*<!-- end container --> */}
        </div>
        {/* <!-- end wrapper --> */}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Edit Profile</h4>
                  </div>
                  <div className="card-body">
                    {console.log("CLIENTELETS:")}
                    {this.state.updateUser ? (
                      <UserUpdateDialog closeDialog={this.closeDialog} />
                    ) : null}

                    <form onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="col-md-5 pr-1">
                          <div className="form-group">
                            <label>Company (disabled)</label>
                            <input
                              type="text"
                              name="Company"
                              className="form-control"
                              disabled=""
                              value="Creative Code Inc."
                              onChange={this.handleChange}
                            ></input>
                          </div>
                        </div>
                        <div className="col-md-3 px-1">
                          <div className="form-group">
                            <label>Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="fullName"
                              onChange={this.handleChange}
                              value={this.state.client.fullName}
                            ></input>
                          </div>
                        </div>
                        <div className="col-md-4 pl-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">
                              Email address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              onChange={this.handleChange}
                              name="email"
                              value={this.state.client.email}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 pr-1">
                          <div className="form-group">
                            <label>First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Company"
                              onChange={this.handleChange}
                              name="firstName"
                            ></input>
                          </div>
                        </div>
                        <div className="col-md-6 pl-1">
                          <div className="form-group">
                            <label>Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Andrew"
                              onChange={this.handleChange}
                              name="lastName"
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label> Company Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Company Address"
                              onChange={this.handleChange}
                              name="company"
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 pr-1">
                          <div className="form-group">
                            <label>Phone</label>
                            <input
                              type="phone"
                              className="form-control"
                              onChange={this.handleChange}
                              name="phone"
                              value={this.state.client.phone}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 pr-1">
                          <div className="form-group">
                            <label>Role</label>
                            <input
                              type="role"
                              className="form-control"
                              onChange={this.handleChange}
                              name="role"
                              value={this.state.client.role}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        // className="btn btn-info btn-fill pull-right"
                        className="btn btn-secondary btn-fill waves-effect pull-right"
                        onClick={this.handleSubmit}
                      >
                        Update Profile
                      </button>
                      <div className="clearfix"></div>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <Footer />
        {/* <!-- End Footer --> */}
      </div>
    );
  }
}
