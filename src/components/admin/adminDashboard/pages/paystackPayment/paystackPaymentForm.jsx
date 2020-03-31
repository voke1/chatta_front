import './style.css';
import { Transaction, Card } from 'paystack-js';


import React, { Component } from 'react'

export default class paystackPaymentForm extends Component {

    submitFunction = async (event) => {
        event.preventDefault();
        var transactionData = {
            email: "vokeolomu@yahoo.com",
            amount: 100,
            key: "pk_test_e9e1741852d609662a93b68341e8f7012b43a63a"
        };

        var transaction = await Transaction.request(transactionData);

        var card = {
            number: "4084084084084081",
            cvv: "408",
            month: "12",
            year: "20"
        };

        var validation = Card.validate(card);

        // validate card
        if (validation.isValid) {
            await transaction.setCard(card);
            var chargeResponse = await transaction.chargeCard();

            // Handle the charge responses
            if (chargeResponse.status === "success") {
                alert("Payment completed!");
            }

            // Another charge response example
            if (chargeResponse.status === "auth") {
                const token = 123456;
                const authenticationResponse = await transaction.authenticateCard(token);
                if (authenticationResponse.status === "success") {
                    alert("Payment completed!");
                }
            }
        }

    };    

    render() {
        return (
            <div>
                <section className="hero is-fullheight">
                    {/* <!-- Hero content: will be in the middle --> */}
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns">
                                <div className="column is-4 centerDiv">
                                    <div className="media logo">
                                        <div className="media-left">
                                            <h2>Checkout</h2>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-content">



                                            <form id="paystack-card-form" autocomplete="on" method="post">
                                                <div className="field">
                                                    <label className="label">Card Number</label>
                                                    <p className="control">
                                                        <input className="input cc-num" value="4084084084084081" type="tel" placeholder="0000 0000 0000 0000" required autofocus />
                                                    </p>
                                                </div>

                                                <div className="columns is-mobile">
                                                    <div className="column is-6 ">
                                                        <div className="field">
                                                            <label className="label">Expiry Date</label>
                                                            <p className="control has-icons-left has-icons-right">
                                                                <input className="input cc-exp" type="tel" value="11/22" placeholder="MM/YY" required />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="column is-6">
                                                        <div className="field">
                                                            <label className="label">CVV</label>
                                                            <p className="control has-icons-left has-icons-right">
                                                                <input className="input cc-cvv" type="tel" value="408" placeholder="987" required />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="field">
                                                    <p className="control">
                                                        <button className="button btn-mydefault" type="submit" onClick={this.submitFunction}>Submit Payment</button>
                                                    </p>
                                                </div>
                                            </form>





                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                
            </div>
        )
    }
}







