import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import CompanyForm from '../Bot/createCompanyForm'
class ModalPage extends Component {
    state = {
        modal14: false
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    render() {
        return (
            <div>
                <button className="btn btn-outline-light ml-1 waves-effect waves-light"
                    onClick={this.toggle(14)}>CREATE COMPANY +</button>
                <MDBContainer>

                    <MDBModal size="lg" isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                        <MDBModalHeader style={{ backgroundColor: "#3C2B61" }} toggle={this.toggle(14)}>Create Company</MDBModalHeader>
                        <MDBModalBody
                            style={{ color: "black" }}>
                            <CompanyForm />

                        </MDBModalBody>

                    </MDBModal>
                </MDBContainer>
            </div>
        );
    }
}

export default ModalPage;