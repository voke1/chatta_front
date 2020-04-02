import React from "react";
import Axios from "axios";
import { MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import Loader from "../../../front/adminLogin/loader"
import { APP_ENVIRONMENT } from "../../../../environments/environment";
import { Validation } from "../../../../utilities/validations";
const BASE_URL = APP_ENVIRONMENT.base_url;


class FormsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company_name: "Microsoft",
            contact_address: "Gbagada Phase 2, 9B Akin-Ogunmade Davies Street, Bariga, Lagos",
            industry: "",
            domain_name: "",
            address: "",
            zip: "",
            message: "",
            companyId: ""
        };
    }

    userDetails = JSON.parse(localStorage.getItem('userdetails'))

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

        // const result = await Validation.validateAll(event, this.state.setValidate);
        this.setState({
            isChanged: true,
            // message: result.message,
            // disabled: result.disabled
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ showProgress: true });

        const companies = {
            company_name: this.state.company_name,
            domain_name: this.state.domain_name,
            contact_address: this.state.contact_address,
            phone: this.state.industry,
            clientId: this.userDetails.id,
        };

        Axios.post(`${BASE_URL}/companies`, {
            ...companies
        })
            .then(res => {
                if (res.data.message) {
                    this.setState({ message: res.data.message, showProgress: false });
                } else {
                    this.setState({ companyId: res.data._id })
                    console.log("companyResult:", res.data._id)

                    Axios.put(`${BASE_URL}/client/${this.userDetails.id}?companyId=${this.state.companyId}`)
                        .then(res => {
                            //   this.setCompany()
                            this.userDetails.companyId = this.state.companyId
                            localStorage.setItem('userdetails', JSON.stringify(this.userDetails));
                            console.log("props:", this.props)
                            console.log("anotheres,", res)

                        }).then(
                            this.props.toggle(14)

                        )
                    this.props.onHide();
                    this.props.updateList();
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({ showProgress: false });
            });
    };


    render() {
        // console.log("props:", this.props)

        return (
            <div>
                <form
                    className="needs-validation"
                    onSubmit={this.handleSubmit}
                    noValidate
                    style={{ margin: "2%" }}
                >
                    <p style={{ color: 'green' }}>You are almost done, please take a momment to complete the form below</p>

                    <p>{this.state.message}</p>
                    <label
                        htmlFor="defaultFormRegisterNameEx"
                        className="grey-text"
                        style={{ color: "green" }}
                    >
                        Business name
              </label>
                    <input
                        value={this.state.company_name}
                        name="company_name"
                        onChange={this.handleChange}
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control"
                        placeholder="First name"
                        required
                    />

                    <label style={{ marginTop: "1rem" }}
                        htmlFor="defaultFormRegisterEmailEx2"
                        className="grey-text"
                    >
                        Business physical address
              </label>
                    <input
                        value={this.state.contact_address}
                        name="contact_address"
                        onChange={this.handleChange}
                        type="text"
                        id="defaultFormRegisterEmailEx2"
                        className="form-control"
                        placeholder="Last name"
                        required
                    />
                    <label
                        htmlFor="defaultFormRegisterConfirmEx3"
                        className="grey-text"
                        style={{ marginTop: "1rem" }}
                    >
                        Domain name
              </label>
                    <input
                        value={this.state.domain_name}
                        onChange={this.handleChange}
                        type="email"
                        id="defaultFormRegisterConfirmEx3"
                        className="form-control"
                        name="domain_name"
                        placeholder="Your Domain name"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                    </small>

                    <label style={{ marginTop: "1rem" }}
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="grey-text"
                    >
                        Industry
              </label>
                    <input
                        value={this.state.industry}
                        onChange={this.handleChange}
                        type="text"
                        id="defaultFormRegisterPasswordEx4"
                        className="form-control"
                        name="industry"
                        placeholder="Information communication technology"
                        required
                    />


                    <br></br>
                    <MDBBtn style={{ marginLeft: "83%" }} type="submit" color="purple" outline onClick={this.handleSubmit}>
                        {this.state.showProgress ? <Loader /> : "Create"}
                    </MDBBtn>
                </form>
            </div>
        );
    }
}

export default FormsPage;