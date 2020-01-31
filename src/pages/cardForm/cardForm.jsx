import Styles from './style'
import { Form, Field } from 'react-final-form'
import Cardx from './card'
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from './cardUtils'

import React, { Component } from 'react'


 class CardForm extends Component {
     constructor(props){
         super(props);
         this.state = {
             number: "",
             expiry: "",
             cvc: "",
             name: "",
     }

     }

    // handleChange = (event)=> {
    //      this.setState({
    //          [event.target.name]: event.target.value
    //      });

        
    //  }
    sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    onSubmit = async values => {
        await this.sleep(300)
        
        window.alert(JSON.stringify(values, 0, 2))
    }
     
    render() {
        return (
            <div>
                <Styles>
                    <Form
                        onSubmit={this.onSubmit}

                        render={({
                            handleSubmit,
                            form,
                            submitting,
                            pristine,
                            values,
                            active
                        }) => {
                            return (
                                <form  style={{ marginLeft: "8%" }}>
                                    <Cardx
                                        number={values.number || ''}
                                        name={values.name || ''}
                                        expiry={values.expiry || ''}
                                        cvc={values.cvc || ''}
                                        focused={active}
                                    />
                                    <div>
                                        <Field
                                            name="number"
                                            component="input"
                                            type="text"
                                            pattern="[\d| ]{16,22}"
                                            placeholder="Card Number"
                                            format={formatCreditCardNumber}
                                            value={values.number}
                                            // onChange={this.handleChange}

                                        />{console.log('cardNumber:', this.state.number)}
                                    </div>
                                    <div>
                                        <Field
                                            name="name"
                                            component="input"
                                            type="text"
                                            placeholder="Name"
                                            value={values.name}
                                            // onChange={this.handleChange}

                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name="expiry"
                                            component="input"
                                            type="text"
                                            pattern="\d\d/\d\d"
                                            placeholder="Valid Thru"
                                            format={formatExpirationDate}
                                            value={values.expiry}
                                            // onChange={this.handleChange}

                                        />
                                        <Field
                                            name="cvc"
                                            component="input"
                                            type="text"
                                            pattern="\d{3,4}"
                                            placeholder="CVC"
                                            format={formatCVC}
                                            value={values.cvc}
                                            // onChange={this.handleChange}

                                        />
                                    </div>
                                  
                                    <button type="submit" onClick={()=>{this.onSubmit(values)}}>RESET</button>
                                </form>
                            )
                        }}
                    />
                </Styles>
                
            </div>
        )
    }
}

export default CardForm;

