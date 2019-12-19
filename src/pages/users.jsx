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
import Switch from "react-toggle-switch";
import "../../node_modules/react-toggle-switch/dist/css/switch.min.css";
import { Button, ButtonToolbar } from "react-bootstrap";
import { CreateUser } from "../components/admin/adminDashboard/createUser";
import AppNotification from "../utilities/notification/app-notification";
import HeadLayout from "../components/admin/layouts/layouts.header";
import Users from '../components/admin/adminDashboard/Bot/userDatables'
import { MDBDataTable } from 'mdbreact';
import UserDialog from "../components/admin/adminDashboard/Bot/userDeleteDialgo";
import { APP_ENVIRONMENT } from "../environments/environment";

const BASE_URL = APP_ENVIRONMENT.base_url;
export class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      switched: false,
      loading: true,
      userDelete: false,
      userId: null,
      result: "",
      notification: { msg: null, type: null }
    };
  }

  closeDialog = () => {
    this.setState({ userDelete: false });
  };

  dialogConfirmDelete = () => {
    this.setState({ delete: true, userDelete: false });
    // if (this.state.delete) {
    this.deleteClient(this.state.userId);
    // }
  };

  confirmDelete = identity => {
    this.setState({ userDelete: true, userId: identity });
  };

  componentDidMount() {
    fetch(`${BASE_URL}/client`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          const result = data.map(item => ({
            ...item,
            switched: item.isEnabled
          }));
          this.setState({
            clients: result,
            loading: false
          });
        }
        return null;
      })
      .catch(console.error());
  }

  deleteClient = clientId => {
    fetch(`${BASE_URL}/client/` + clientId, {
      method: "DELETE",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          clients: [
            ...this.state.clients.filter(client => client._id !== clientId)
          ]
        });
      })
      .catch(console.error());
  };
  toggleSwitch = id => {
    fetch(`${BASE_URL}/client/` + id, {
      method: "PATCH",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    this.setState({
      clients: this.state.clients.map(client => {
        if (client._id === id) {
          client.switched = !client.switched;
        }
        return client;
      })
    });
  };

  updateList = () => {
    this.componentDidMount();
    this.setState({ notification: true });
  };

  App = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
      <div>

        {/* <!-- Loader --> */}
        {this.state.loading ? (
          <div className="preloader">
            <div id="status">
              <div className="spinner"></div>
            </div>
          </div>
        ) : null}
        {/* {this.state.notification ? (
          <div
            className="alert alert-success alert-dismissible fade show animated slideInRight faster"
            role="alert"
          >
            <strong>User created successfully!</strong>

            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : null} */}
        <div className="header-bg">
          {/* <!-- Navigation Bar--> */}
          <HeadLayout />
          {/* <!-- End Navigation Bar--> */}

          <div className="container-fluid">
            {/* <!-- Page-Title --> */}
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">
                  <form className="float-right app-search">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control"
                    ></input>
                    <button type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>

                  <ButtonToolbar>
                    <Button
                      className="btn btn-outline-light ml-1 waves-effect waves-light"
                      variant="primary"
                      onClick={() => setModalShow(true)}
                    >
                      Create User +
                    </Button>
                    <CreateUser
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      updateList={this.updateList}
                    />
                  </ButtonToolbar>
                </div>
              </div>
            </div>
            {/* <!-- end page title end breadcrumb --> */}
          </div>
        </div>

        <div className="wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card m-b-20">
                  <div className="card-body">

                    <Users users={this.state.clients} confirmDelete={this.confirmDelete} switched={this.state.switched} toggleSwitch={this.toggleSwitch} />

                    <h4 className="mt-0 header-title">Active Users</h4>
                    <p className="text-muted m-b-30 font-14">
                      DataTables has most features enabled by default, so all
                      you need to do to use it with your own tables is to call
                      the construction function: <code>$().DataTable();</code>.
                    </p>

                    <table id="datatable" className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Status</th>
                          <th>Date created</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      {this.state.userDelete ? (
                        <UserDialog
                          dialogDelete={this.dialogConfirmDelete}
                          closeDialog={this.closeDialog}
                        />
                      ) : null}
                      <tbody>
                        {this.state.clients.map((client, index) => (
                          <tr>
                            <td>{client.fullName}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>
                              <Switch
                                key={client._id}
                                onClick={this.toggleSwitch.bind(
                                  this,
                                  client._id
                                )}
                                on={this.state.clients[index].switched}
                              />
                            </td>
                            <td>2008/12/19</td>
                            <td>
                              <div className="button-items">
                                <Link
                                  to={`/dashboard/admin/user/${client._id}`}
                                >
                                  <button
                                    type="button"
                                    className="btn btn-secondary btn-sm waves-effect"
                                    clientID={client._id}
                                  >
                                    Edit &nbsp;
                                  </button>
                                </Link>

                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm waves-effect"
                                  onClick={() => {
                                    this.confirmDelete(client._id);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>{" "}
              {/* <!-- end col --> */}
            </div>{" "}
            {/*  <!-- end row --> */}
          </div>{" "}
          {/*<!-- end container --> */}
        </div>
        {/* <!-- end wrapper --> */}

        {/* <!-- Footer --> */}
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                © 2019 Chatta - Crafted with{" "}
                <i className="mdi mdi-heart text-danger"></i> by IT Horizons
                Limited.
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- End Footer --> */}
      </div>
    );
  };

  render() {
    return <div>{<this.App />}</div>;
  }
}
