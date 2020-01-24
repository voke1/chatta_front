import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Switch from "react-toggle-switch";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AppService } from "../../../../services/app.service";
import LayoutHeader from "../../layouts/layouts.header";
import LayoutFooter from "../../layouts/layouts.footer";
import AppLoader from "../../../../utilities/loader";
import Companies from '../Bot/dataTables'
import { APP_ENVIRONMENT } from "../../../../environments/environment";
import "../../../admin/plugins/datatables/dataTables.bootstrap4.min.css";
import "../../../admin/plugins/datatables/responsive.bootstrap4.min.css";
import "../../../admin/css/style.css";
import "../../../admin/css/icons.css";
import "../../../admin/css/bootstrap.min.css";
import "../../../admin/images/favicon.ico";
import "../../../admin/css/switch.css";
import CreateCompanyModal from '../Bot/createCompany';
import CompanyDataTable from './companyDatatable';
import Swal from 'sweetalert2';


const BASE_URL = APP_ENVIRONMENT.base_url;

export default class CompaniesComponent extends Component {
  appService;
  pageTitle = "Companies";
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      switched: false,
      loading: true,
      notification: { msg: null, type: null },
    };

    this.appService = new AppService();
  }

  componentDidMount() {
    this.getAllCompanies();
  }

  getAllCompanies = async () => {
    this.appService
      .getAllCompanies()
      .then(companiesResponse => {
        const notification = {
          msg: "Sucessfully listed companies",
          type: "success"
        };
        this.setState({
          companies: companiesResponse,
          notification: notification,
          loading: false
        });
      })
      .catch(error => {
        const notification = { msg: `${error.message}`, type: "error" };
        this.setState({
          companies: [],
          notification: notification,
          loading: false
        });
      });
  };

  loader = () => {
    if (this.state.loading) {
      return (

        <tr>
          <td colSpan="7" className="text-center">
            fetching records...
            <div className="preloader">
              <div id="status">
                <div className="spinner mt-2"></div>
              </div>
            </div>
          </td>
        </tr>
      );
    }
    return !this.state.loading && this.state.companies.length === 0 ? (
      <tr>
        <td colSpan="7" className="text-center">
          No records returned
        </td>
      </tr>
    ) : null;
  };

  deletecompany = companyId => {
      fetch(`${BASE_URL}/company/` + companyId, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            companies: [
              ...this.state.companies.filter(
                company => company._id !== companyId
              )
            ]
          });
        });
    
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
        this.deletecompany(identity)
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


  toggleSwitch = async id => {
    const company = this.state.companies.filter(company => {
      return company._id === id;
    })[0];
    const toggleMsg = company.isEnabled ? "disable" : "enable";
    await this.appService
      .toggleCompany(id, { isEnabled: !company.isEnabled })
      .then(companyResponse => {
        const notification = {
          type: "success",
          msg: `${companyResponse.company_name ||
            "Company"} successfully ${toggleMsg}d`
        };
        this.updateRowInList(id, companyResponse, notification);
      }).then(this.setState({
        companies: this.state.companies.map(company => {
          if (company._id === id) {
            company.switched = !company.switched;
          }
          return company;
        })
      }))
      .catch(error => {
        const notification = {
          type: "error",
          msg: `An Error Occured. Could not ${toggleMsg}!`
        };
        this.setState({
          notification: notification
        });
      });
  };

  updateRowInList = (id, companyResponse, notification = null) => {
    this.setState({
      companies: this.state.companies.map(company => {
        return company._id === id ? companyResponse : company;
      }),
      notification: notification
    });
  };

  App = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
      <div>
        {/* <!-- Loader --> */}
        {/* <Button className=" btn floatBtn">What is this??</Button> */}
        <div className='header-bg'>
          <LayoutHeader
            pageTitle={this.pageTitle}
            notification={this.state.notification}
          />

          <div className="container-fluid">
            {/* <!-- Page-Title --> */}
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">

                  <CreateCompanyModal />
                  {/* <CreateUser
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    updateList={this.updateList}
                  /> */}
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
                  
                    <CompanyDataTable companies={this.state.companies} toggleSwitch={this.toggleSwitch} confirmDelete={this.deleteDialog} switched={this.state.switched}/>
                    {/* <h4 className="mt-0 header-title">Companies</h4>
                                        <p className="text-muted m-b-30 font-14">
                                            DataTables has most features enabled by default, so all
                                            you need to do to use it with your own tables is to call
                      the construction function: <code>$().DataTable();</code>.
                    </p> */}

                    {/* <table id="datatable" className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Company Name</th>
                          <th>Domain Name</th>
                          <th>Phone</th>
                          <th>Status</th>
                          <th>Date Created</th>
                          <th>Date Updated</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        <AppLoader
                          tds={7}
                          itemsLength={this.state.companies.length}
                          loading={this.state.loading}
                        />

                        {this.state.companies.map((company, index) => (
                          <tr>
                            <td>{company.company_name}</td>
                            <td>{company.domain_name}</td>
                            <td>{company.phone}</td>
                            <td>
                              <Switch
                                key={company._id}
                                onClick={this.toggleSwitch.bind(
                                  this,
                                  company._id
                                )}
                                on={this.state.companies[index].isEnabled}
                              />
                            </td>
                            <td>{company.created_at}</td>
                            <td>{company.updated_at}</td>
                            <td>
                              <div className="button-items">
                                <Link to="/dashboard/admin/user/profile">
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm waves-effect"
                                  >
                                    <i className="dripicons-pencil"></i>
                                  </button>
                                </Link>

                                <button
                                  type="button"
                                  className="btn btn-red btn-sm waves-effect"
                                  onClick={() => {
                                    this.deletecompany(company._id);
                                  }}
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table> */}
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
        <LayoutFooter />
        {/* <!-- End Footer --> */}
      </div>
    );
  };

  render() {
    return <div>{<this.App />}</div>;
  }
}
