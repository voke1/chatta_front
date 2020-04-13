import React, { Component } from "reactn";
import Response from "./response";
import "./css/card.css";
import Accordion from "./accordion";
import uuid from "uuid/v1";
import ConvoTree from "../../../front/conversation/convo.json";
import {MDBIcon} from 'mdbreact'
const identity = uuid();

class PaymentForm extends Component {

    state = {
        price: "",
        paystackkey: "",
       
    };
    componentDidMount() {

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });

    };

    
    render() {
        return (
            <div >
                <div className="option-box ">

                    <div
                        style={{
                            marginLeft: "40px",
                            marginRight: "100px",
                            marginTop: "-5px",
                        }}
                        className="form-group"
                    >
                        <p style={{ color: "green", textAlign: "left", marginLeft: "10px", marginTop: "7px", marginBottom: "1px" }}><MDBIcon icon="info-circle" />{" "} add payment details to intent</p>
                        <input
                            className="form-control border-top-0 border-right-0 border-left-0"
                            placeholder="paystackkey"
                            name="paystackkey"
                            value={this.state.paystackkey}
                            onChange={this.onChange}
                            style={{ width: "300px", marginTop: "0px" }}
                        ></input>
                        <div>

                        </div>
                        <div className="form-inline">

                        <input
                            className="form-control border-top-0 border-right-0 border-left-0"
                            placeholder="add amount eg 1000"
                            name="price"
                            value={this.state.price}
                            onChange={this.onChange}
                            style={{ width: "300px" }}
                            disabled={this.state.noOption}
                        ></input>
                        <div style={{ width: "10%" }}>
                            <button
                                type="button"
                                className="btn btn-sm"
                                onClick={() =>
                                    this.props.getData(this.state.paystackkey, this.state.price)
                                }
                                style={{ backgroundColor: "#ededed", color: "#5b616b", width: "8rem"}}
 
                            >
                                Add payment
                </button>
                        </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
    
}
export default PaymentForm;
