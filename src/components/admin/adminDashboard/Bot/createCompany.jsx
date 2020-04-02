import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import CompanyForm from '../Bot/createCompanyForm';

class ModalPage extends Component {
    
    constructor(props){
        super(props);
    }
    state = {
        modal14: this.props.isRegistered === null ?true:false
    }
    toggle = nr => () => {
        console.log("i am called toggle")
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }
    
   
    render() {
        console.log("isRegistered", typeof(this.props.isRegistered))
        return (
            <div>
             
                <MDBContainer>
                    <MDBModal size="lg" isOpen={this.state.modal14} toggle={this.toggle(14)} backdrop={false} centered>
                        <MDBModalHeader style={{ backgroundColor: "#F1F1F1", color: "purple" }} toggle={this.toggle(14)}>Business information</MDBModalHeader>
                        <MDBModalBody
                            style={{ color: "black" }}>
                            <CompanyForm toggle={this.toggle(14)}/>

                        </MDBModalBody>

                    </MDBModal>
                </MDBContainer>
            </div>
        );
    }
}

export default ModalPage;