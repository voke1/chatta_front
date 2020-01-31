import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { MDBIcon } from 'mdbreact';
import { Card, Transaction } from 'paystack-js';
import React, { useEffect, useState } from 'react';
import { register } from "../../components/admin/adminDashboard/Authentication/UserFunctions";
import { APP_ENVIRONMENT } from "../../environments/environment";
import { Validation } from "../../utilities/validations";
import Cardx from '../cardForm/card';
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from '../cardForm/cardUtils';
import Styles from '../cardForm/style';
import './css/main.min.css';
import './dist/font-awesome/css/font-awesome.min.css';
// import mastercardImage'./img/MasterCard_Logo.svg.png';

const BASE_URL = APP_ENVIRONMENT.base_url;



export default function VerticalLinearStepper(props) {
 
    const [price, setPrice] = useState("")
    const [plan, setPlan] = useState("")
    
    useEffect(() => {
        // code to run on component mount
        setPrice(props.location.state.price === 0 ? "Free" : `₦ ${props.location.state.price}`);
        setPlan(props.location.state.plan)
    }, [])
    
    
    const [cardDetails, setCardDetails] = useState({ number: '', cvc: "", expiry: "", name: ""})
    const handleChange = (e) => {
        const { name, value } = e.target
        setCardDetails({ ...cardDetails, [name]: value })

    }
    const cardForm = <Styles>

                    <form style={{ marginLeft: "8%" }}>
                        <Cardx
                            number={cardDetails.number || ''}
                            name={cardDetails.name || ''}
                            expiry={cardDetails.expiry || ''}
                            cvc={cardDetails.cvc || ''}
                            // focused={active}
                        />
                        <div>
                            <input
                                name="number"
                                component="input"
                                type="text"
                                pattern="[\d| ]{16,22}"
                                placeholder="Card Number"
                                format={formatCreditCardNumber}
                                value={cardDetails.number}
                            onChange={handleChange}

                            />
                        </div>
                        <div>
                            <input
                                name="name"
                                component="input"
                                type="text"
                                placeholder="Name"
                            value={cardDetails.name}
                            onChange={handleChange}

                            />
                        </div>
                        <div>
                            <input
                                name="expiry"
                                component="input"
                                type="text"
                                pattern="\d\d/\d\d"
                                placeholder="Valid Thru"
                                format={formatExpirationDate}
                                value={cardDetails.expiry}
                            onChange={handleChange}

                            />
                            <input
                                name="cvc"
                                component="input"
                                type="text"
                                pattern="\d{3,4}"
                                placeholder="CVC"
                                format={formatCVC}
                                value={cardDetails.cvc}
                            onChange={handleChange}

                            />
                        </div>
                    </form>
     
    </Styles>

    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
    }));
    const [userDetails, setUserDetails] = useState({ fullName: '', email: "", password: "", phone: "", lastName: "" })
    const [ isChanged, setIsChanged] = useState(false)
    const [message, setMessage] = useState("")


    const handleInputChange = async e => {
        const { name, value } = e.target
        setUserDetails({ ...userDetails, [name]: value })

        const result = await Validation.validateAll(e);
        setIsChanged(true);
        setMessage(result.message)
     
    }

    const user = {
        fullName: userDetails.fullName,
        password: userDetails.password,
        email: userDetails.email,
        phone: userDetails.phone,
        isVerified: true,
        isCreated: true,
        role: "admin"
    };

    async function submitFunction() {
        // event.preventDefault();
     
        console.log('CARDDETIALS:', cardDetails)

        var transactionData = {
            email: userDetails.email,
            amount: props.location.state.price,
            key: "pk_test_e9e1741852d609662a93b68341e8f7012b43a63a"
        };

            var transaction = await Transaction.request(transactionData);
        
        const newDetails = cardDetails.expiry.split("/")
        var card = {
            number: cardDetails.number || "4084084084084081",
            cvv: cardDetails.cvc || "408",
            month: newDetails[0] || "12",
            year: newDetails[1] || "20"
        };

        var validation = Card.validate(card);
        console.log('validation:', validation)

        // validate card
        if (validation.isValid) {
            await transaction.setCard(card);

            

                var chargeResponse = await transaction.chargeCard();
         
                console.log('CHARGERESPONSE: ', chargeResponse)

            // Handle the charge responses
            if (chargeResponse.status === "success") {
                setSuccessMessage("Congratulations! Payment is successful. An email has been sent to your email address, please check your email to complete registration");
                // alert("payment successful!")
            };

            // Another charge response example
            if (chargeResponse.status === "auth") {
                const token = 123456;
                const authenticationResponse = await transaction.authenticateCard(token);
                if (authenticationResponse.status === "success") {
                    setSuccessMessage("Congratulations! Payment is successful. An email has been sent to your email address, please check your email to login") 

                }
            }
        }
         else {
             setIsChanged(true)
            setSuccessMessage("Sorry, there was an error processing payment, please try again!");
            // alert("PAYMENT NOT SUCCESFUL")
            console.log("error response:")
        }

    };


    function getSteps() {
        return ['Account details', 'Payment'];
    }
    const form = <form className="needs-validation" novalidate>
        <p style={{color: "red"}}>{isChanged ? message : ""}</p> 
                   
                        <div className=" mb-3">
                            <label for="firstName">Full name</label>
                            <input type="text" className="form-control" id="fullName" placeholder="Voke Olomu" name="fullName"value={userDetails.fullName} required onChange={handleInputChange} />
                            <div className="invalid-feedback">
                                Valid first name is required.
                                    </div>
                        </div>
                       
                    
                    <div className="mb-3">
                        <label for="email">Email
    
                    </label>
            <input type="email" className="form-control" id="email" name="email" value={userDetails.email}placeholder="you@example.com" onChange={handleInputChange}/>
                        <div className="invalid-feedback">
                            Please enter a valid email phone for shipping updates.
                                </div>
                    </div>

                    <div className="mb-3">
                        <label for="phone">Phone</label>
            <input type="text" className="form-control" id="phone" name="phone" value={userDetails.phone} placeholder="08033333333" required onChange={handleInputChange}/>
                        <div className="invalid-feedback">
                            Please enter your shipping phone.
                                </div>
                    </div>
                    <div className="mb-3">
                        <label for="username">Password</label>
                        <div className="input-group">
                <input type="password" className="form-control" id="username" value={userDetails.password} name="password" placeholder="Password" required onChange={handleInputChange} />
                            <div className="invalid-feedback" style={{ width: "100%;" }}>
                                Your username is required.
                                    </div>
                        </div>
                    </div>
                </form>

    function getStepContent(step) {
        switch (step) {
            case 0:
                return form;
            case 1:
                return cardForm;

            default:
                return 'Unknown step';
        }
    }
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [successMessage, setSuccessMessage] = useState("")
    const steps = getSteps();

    const handleNext = (index) => {
        try{

            if (index === 0) {
                register(userDetails).then(res => {
                    if (res) {
                        if (!res.data.success) {
                            console.log(res);
    
                            setIsChanged(true)
                            setMessage(res.data.message)
                        }
                    }
    
                    if (res.data.success) {
    
                    //    setSuccessMessage(res.data.message) 
                        setActiveStep(prevActiveStep => prevActiveStep + 1);
                    }
                });
            }
            if(index === 1){
                submitFunction()
                setActiveStep(prevActiveStep => prevActiveStep + 1);
            }
        }catch(e){
            console.log(e);
        }
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

  
    return (
        <div style={{ height: "50rem"}}>
            <body>
                {/* <div className="loader"></div> */}

                <main id="main" role="main">
                    <section style={{ backgroundColor: "#27296F" }}>
                        <div className="containerpayment py-5 text-center">
                            <i className="fa fa-credit-card fa-3x text-light"></i>
                            <h2 className="my-3" style={{ color: "white" }}>Checkout form</h2>
                            <p className="lead" style={{ color: "white" }}>Get started with Chatta. Please proceed to checkout</p>
                        </div>
                    </section>
                    <section id="checkout-container">
                        <div className="containerpayment">
                            <div className="row py-5">
                                <div className="col-md-4 order-md-2 mb-4">
                                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="text-muted">Your Order summary</span>
                                        <span className="badge badge-secondary badge-pill">1</span>
                                    </h4>
                                    <ul className="list-group mb-3">
                                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 className="my-0">Subscription Plan</h6>
                                                <small className="text-muted">{plan}</small>
                                            </div>
                                            <div> <span className="">Price</span><br />
                                                <small className="text-muted">{price}</small></div>

                                        </li>
                                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <small className="my-0"> Duration</small>
                                                <small className="text-muted"></small>
                                            </div>
                                            
                                            <small className="text-muted">12 months</small>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Total (₦)</span>
                                            <strong>₦ {parseInt(props.location.state.price)*12 + ".00" }</strong>
                                        </li>
                                    </ul>

                                    <div className="payment-methods">
                                        <p className="pt-4 mb-2">Payment Options</p>
                                        <hr />
                                        <ul className="list-inline d-flex">
                                            <li className="mx-1 text-info">
                                                <MDBIcon fab icon="cc-visa" size="3x" className="indigo-text pr-3" />

                                            </li>
                                            <li className="mx-1 text-info">
                                                <MDBIcon fab icon="cc-mastercard" size="3x" className="amber-text pr-3" />
                                            </li>
                                            <li className="mx-1 text-info">
                                                <MDBIcon fab icon="cc-discover" size="3x" />
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-8 order-md-1">
                                    <h4 className="mb-3">Billing details</h4>


                                    <div className={classes.root} >

                                        <div>
                                            <Stepper activeStep={activeStep} orientation="vertical"  >

                                                {steps.map((label, index) => (
                                                    <Step key={label}>
                                                        <StepLabel>{label}</StepLabel>
                                                        <StepContent>
                                                            <Typography>{getStepContent(index)}</Typography>
                                                            <div className={classes.actionsContainer}>
                                                                <div>
                                                                    <Button
                                                                        disabled={activeStep === 0}
                                                                        onClick={handleBack}
                                                                        className={classes.button}
                                                                    >
                                                                        Previous
                  </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        onClick={()=> handleNext(index)}
                                                                        className={classes.button}
                                                                    >
                                                                        {index === 1 ? 'Submit' : 'Next'}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </StepContent>
                                                    </Step>
                                                ))}
                                            </Stepper>
                                            {activeStep === steps.length && (
                                                <Paper square elevation={0} className={classes.resetContainer}>
                                                    <Typography>  <div className="alert2" style={{color: "green"}}>
                                                        {isChanged ? successMessage : ""}
                                                    </div></Typography>
                                                </Paper>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>


                </main>
                {/* <!-- Footer --> */}
                <footer id="footerpayment">
                    <p className="copyright">Made with{" "}
                        <i className="fa fa-heart"></i> By{" "}
                        <a className="astyle" target="_blank" title="Orbit Themes" href="">ZOJATECH</a> &copy;
            <span id="currentYear"></span> All Rights Reserved.
        </p>
                </footer>

            </body>
        </div>
    );
}











