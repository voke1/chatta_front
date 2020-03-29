import React, { Component, useState } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import "../../node_modules/react-toggle-switch/dist/css/switch.min.css";
import Users from '../components/admin/adminDashboard/Bot/userDatables';
import UserDialog from "../components/admin/adminDashboard/Bot/userDeleteDialgo";
import { CreateUser } from "../components/admin/adminDashboard/createUser";
import "../components/admin/css/bootstrap.min.css";
import "../components/admin/css/icons.css";
import "../components/admin/css/style.css";
import "../components/admin/css/switch.css";
import "../components/admin/images/favicon.ico";
import Footer from '../components/admin/layouts/layouts.footer';
import HeadLayout from "../components/admin/layouts/layouts.header";
import "../components/admin/plugins/datatables/dataTables.bootstrap4.min.css";
import "../components/admin/plugins/datatables/responsive.bootstrap4.min.css";
import { APP_ENVIRONMENT } from "../environments/environment";
import Swal from 'sweetalert2';

const BASE_URL = APP_ENVIRONMENT.base_url;

/**
 * @description class for users
 * @component
 * @type {Class}
 * @property {Function} - CloseDialog function
 * 
 */
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

  /**
   * @description Function to close dialog window
   * @type { Function }
   * @returns void
   * 
   */


  /**
  * @description Function to open dialog window to delete user
  * @type { Function }
  * @returns void
  */
  dialogConfirmDelete = () => {
    this.setState({ delete: true, userDelete: false });
    // if (this.state.delete) {
    this.deleteClient(this.state.userId);
    // }
  };

  componentDidMount() {
    const clientId = JSON.parse(localStorage.getItem("userdetails")).id;
    const clientRole = JSON.parse(localStorage.getItem("userdetails")).role;

    if (clientRole === "superadmin") {
      fetch(`${BASE_URL}/client/`)
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
    else {

      fetch(`${BASE_URL}/client/all/${clientId}`)
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

  /**
   * @description Function to toggleSwitch
   * @type { Function }
   * @returns void
   */
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

  deleteDialog = (identity) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.deleteClient(identity)
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Action is cancelled!',
          'error'
        )
      }
    })
  }

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

                    <h4 className="mt-0 header-title">Active Users</h4><br></br>

                    <Users users={this.state.clients} confirmDelete={this.deleteDialog} switched={this.state.switched} toggleSwitch={this.toggleSwitch} />

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
        <Footer />

        {/* <!-- End Footer --> */}
      </div>
    );
  };

  render() {
    return <div>{<this.App />}</div>;
  }
}
