import React from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";

class FormsPage extends React.Component {
    state = {
        fname: "Microsoft",
        lname: "Gbagada Phase 2, 9B Akin-Ogunmade Davies Street, Bariga, Lagos",
        email: "",
        city: "",
        state: "",
        zip: ""
    };

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div>
                <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
                    noValidate
                    style={{ margin: "5%" }}
                >
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterNameEx"
                                className="grey-text"
                            >
                                Company Name
              </label>
                            <input
                                value={this.state.fname}
                                name="fname"
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterNameEx"
                                className="form-control"
                                placeholder="First name"
                                required
                            />
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterEmailEx2"
                                className="grey-text"
                            >
                                Company Address
              </label>
                            <input
                                value={this.state.lname}
                                name="lname"
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterEmailEx2"
                                className="form-control"
                                placeholder="Last name"
                                required
                            />
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterConfirmEx3"
                                className="grey-text"
                            >
                                Domain name
              </label>
                            <input
                                value={this.state.email}
                                onChange={this.changeHandler}
                                type="email"
                                id="defaultFormRegisterConfirmEx3"
                                className="form-control"
                                name="email"
                                placeholder="Your Domain name"
                            />
                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else.
              </small>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                Phone Number
              </label>
                            <input
                                value={this.state.city}
                                onChange={this.changeHandler}
                                type="number"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="city"
                                placeholder="City"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid city.
              </div>
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                State
              </label>
                            <input
                                value={this.state.state}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="state"
                                placeholder="State"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid state.
              </div>
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>

                    </MDBRow>
                    {"   "}
                    <MDBBtn style={{ color: "white", marginLeft: "83%", backgroundColor: "#3C2B61" }} type="submit" color="variant">
                        Create
          </MDBBtn>
                </form>
            </div>
        );
    }
}

export default FormsPage;