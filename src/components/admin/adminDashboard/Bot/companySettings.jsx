import Axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2";
import "../../../../components/admin/css/bootstrap.min.css";
import "../../../../components/admin/css/icons.css";
import "../../../../components/admin/css/style.css";
import "../../../../components/admin/css/switch.css";
import "../../../../components/admin/images/favicon.ico";
import Footer from "../../../../components/admin/layouts/layouts.footer";
import Header from "../../../../components/admin/layouts/layouts.header";
import "../../../../components/admin/plugins/datatables/dataTables.bootstrap4.min.css";
import "../../../../components/admin/plugins/datatables/responsive.bootstrap4.min.css";
import { APP_ENVIRONMENT } from "../../../../environments/environment";
const BASE_URL = APP_ENVIRONMENT.base_url
export class CompanySettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "",
            companyId: props.match.params.id,
            updateCompany: false,
        };
    }
    async componentDidMount() {
        const response = await Axios.get(`${BASE_URL}/companies/${this.state.companyId}`)
        const result = response.data;
        this.setState({ company: result });
        console.log("COMPANY DETAILS:", this.state.company)
    }

    handleChange = event => {
        const newCompany = { ...this.state.company }
        newCompany[event.target.name] = event.target.value;
        this.setState({
            [event.target.name]: event.target.value,
            company: newCompany
        });
    };

    closeDialog = () => {
        this.setState({ updateCompany: false });
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        Swal.fire(
            'Update Profile?',
            'User profile will be updated',
            'question'
        );
        const company = {
            company_name: this.state.company.company_name,
            domain_name: this.state.company.domanin_name,
            company_address: this.state.company.company_address,
            phone: this.state.company.phone,
        };
        try {

            const response = await Axios.put(`${BASE_URL}/companies/${this.state.companyId}`, company)
            const result = response.data
        } catch (error) {
            console.log(error)
        }

    };

    render() {
        // const [modalShow, setModalShow] = useState(false);

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
                                        <h4 className="card-title">Edit Company</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-5 pr-1">
                                                    <div className="form-group">
                                                        <label>Domain Name (disabled)</label>
                                                        <input
                                                            type="text"
                                                            name="company_name"
                                                            className="form-control"
                                                            disabled=""
                                                            value={this.state.company.company_name}
                                                            onChange={this.handleChange}
                                                        ></input>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 px-1">
                                                    <div className="form-group">
                                                        <label>Company</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="domain_name"
                                                            onChange={this.handleChange}
                                                            value={this.state.company.domain_name}
                                                        ></input>
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-4 pl-1">
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
                                                </div> */}
                                            </div>
                                            {/* <div className="row">
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
                                            </div> */}
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
                                            {/* <div className="row">
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
                                            </div> */}

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
