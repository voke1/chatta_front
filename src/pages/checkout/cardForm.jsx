import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { MDBIcon } from "mdbreact";
import React, { useEffect, useState } from "react";
import PaystackButton from "react-paystack";
import Loader from "../.././components/front/adminLogin/loader";
import { register } from "../../components/admin/adminDashboard/Authentication/UserFunctions";
import { APP_ENVIRONMENT } from "../../environments/environment";
import { Validation } from "../../utilities/validations";
import "./css/main.min.css";
import "./dist/font-awesome/css/font-awesome.min.css";
import { Redirect } from "react-router-dom";

const BASE_URL = APP_ENVIRONMENT.base_url;

export default function VerticalLinearStepper(props) {
  const [price, setPrice] = useState(0);
  const [plan, setPlan] = useState("");
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: ""
  });
  const [isChanged, setIsChanged] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [key, setKey] = useState(
    "pk_test_5c136d07ea8e83e04f30445b866dbe50723c3975"
  );
  const [newPrice, setNewPrice] = useState("");

  // const updatedPrice = price * 12;
  // console.log("THIS IS NEWPRICE", price)
  const updatedPrice =
    (price * 12).toString().slice(0, 3) +
    "," +
    (price * 12).toString().slice(3, 6) +
    ".00";

    const registerUser = (index) => {
        try {
          setLoading(true);
          if (index === 0) {
            if (confirmPassword !== userDetails.password) {
              setIsChanged(true);
              setMessage("Passwords do not match");
              return setLoading(false);
            }

            register(userDetails).then(res => {
              if (res) {
                setRegistrationSuccess(true);
                if (!res.data.success) {
                  setIsChanged(true);
                  setMessage(res.data.message);
                  setLoading(false);
                }
              }
              try {
                if (res.status === 200) {
                  // setSuccessMessage(res.data.message)
                  if (price === 0) {
                    setActiveStep(prevActiveStep => prevActiveStep + 2);
                    setIsChange(true);
                    setLoading(false);
                    setSuccessMessage(
                      "Congratulations! An email has been sent to your email address, please check your email to complete registration"
                    );
                  } else {
                    setActiveStep(prevActiveStep => prevActiveStep + 1);
                    setLoading(false);
                  }
                  // payWithPaystack()
                }
              } catch (error) {
                setMessage(error);
              }
            });
            // setActiveStep(prevActiveStep => prevActiveStep + 1);
          }
          if (index === 1) {
            // submitFunction()
            setActiveStep(prevActiveStep => prevActiveStep + 1);
          }
        } catch (e) {
          console.log(e);
        }
    }
  const callback = async response => {
    if (response.status === "success" && registrationSuccess) {
        console.log("paid")
      await setSuccessMessage(
        "Congratulations! An email has been sent to your email address, please check your email to complete registration"
      );
    } else {
      setIsChange(true);
      setSuccessMessage(
        "Sorry, there was an error processing payment, please try again!"
      );
    }
  };

  const close = () => {
    setIsChange(true);
    setSuccessMessage(
      "Sorry, there was an error processing payment, please try again!"
    );
  };

  const getReference = () => {
    //you can put any unique reference implementation code here
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  useEffect(() => {
    // code to run on component mount
    if (!props.location.state) {
      return <Redirect to="/" />;
    }
    setPrice(props.location.state.price);
    setPlan(props.location.state.plan);
  }, []);

  console.log("another price,", price);
  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%"
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    actionsContainer: {
      marginBottom: theme.spacing(2)
    },
    resetContainer: {
      padding: theme.spacing(3)
    }
  }));

  const handleInputChange = async e => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });

    const result = await Validation.validateAll(e);
    setIsChanged(true);
    setMessage(result.message);
  };

  const handleConfirmPasswordChange = async e => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (userDetails.password !== value) {
      setIsChanged(true);
      setMessage("Passwords do not match");
    }
    if (userDetails.password === value) {
      setIsChanged(false);
    }
  };

  function getSteps() {
    return ["Account details", price === 0 ? "" : "Payment"];
  }
  const form = (
    <form className="needs-validation" novalidate>
      <p style={{ color: "red" }}>{isChanged ? message : ""}</p>

      <div className=" mb-3">
        <label for="firstName">Full name</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          placeholder="Voke Olomu"
          name="fullName"
          value={userDetails.fullName}
          required
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label for="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={userDetails.email}
          placeholder="you@example.com"
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label for="phone">Phone</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={userDetails.phone}
          placeholder="08033333333"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label for="username">Password</label>
        <div className="input-group">
          <input
            type="password"
            className="form-control"
            id="password"
            value={userDetails.password}
            name="password"
            placeholder="Password"
            required
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <label for="username">Confirm password</label>
        <div className="input-group">
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            name="confirmPassword"
            placeholder="Password"
            required
            onChange={handleConfirmPasswordChange}
          />
        </div>
      </div>
    </form>
  );

  function getStepContent(step) {
    switch (step) {
      case 0:
        return form;
      case 1:
        return (
          <p style={{ color: "green" }}>
            An amount of NGN {price * 12} will be made upon successful
            transaction. Kindly proceed to make payment.
          </p>
        );

      default:
        return "Unknown step";
    }
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const steps = getSteps();

  const handleNext = index => {
    try {
      setLoading(true);
      if (index === 0) {
        if (confirmPassword !== userDetails.password) {
          setIsChanged(true);
          setMessage("Passwords do not match");
          return setLoading(false);
        }

        register(userDetails, price === 0 ? false : true).then(res => {
          if (res) {
            setRegistrationSuccess(true);
            if (!res.data.success) {
              setIsChanged(true);
              setMessage(res.data.message);
              setLoading(false);
            }
          }
          try {
            if (res.status === 200) {
              // setSuccessMessage(res.data.message)
              if (price === 0) {
                setActiveStep(prevActiveStep => prevActiveStep + 2);
                setIsChange(true);
                setLoading(false);
                setSuccessMessage(
                  "Congratulations! An email has been sent to your email address, please check your email to complete registration"
                );
              } else {
                setActiveStep(prevActiveStep => prevActiveStep + 1);
                setLoading(false);
              }
              // payWithPaystack()
            }
          } catch (error) {
            setMessage(error);
          }
        });
        // setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
      if (index === 1) {
        // submitFunction()
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const { email, password, fullName, phone } = userDetails;

  return (
    <div style={{ height: "50rem" }}>
      <body>
        {/* <div className="loader"></div> */}

        <main id="main" role="main">
          <section style={{ backgroundColor: "#27296F" }}>
            <div className="containerpayment py-5 text-center">
              <i className="fa fa-credit-card fa-3x text-light"></i>
              <h2 className="my-3" style={{ color: "white" }}>
                Checkout form
              </h2>
              <p className="lead" style={{ color: "white" }}>
                Get started with Chatta. Please proceed to checkout
              </p>
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
                      <div>
                        {" "}
                        <span className="">Price</span>
                        <br />
                        <small className="text-muted">
                          {price === 0 ? "Free" : `₦ ${price}`}
                        </small>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <small className="my-0"> Duration</small>
                        <small className="text-muted"></small>
                      </div>

                      <small className="text-muted">
                        {price === 0 ? "1 month" : "12 months"}
                      </small>
                    </li>

                    <li className="list-group-item d-flex justify-content-between">
                      <span>Total (₦)</span>

                      <strong>
                        {price === 0 ? "Free" : `₦` + " " + updatedPrice}
                      </strong>
                    </li>
                  </ul>

                  <div className="payment-methods">
                    <p className="pt-4 mb-2">Payment Options</p>
                    <hr />
                    <ul className="list-inline d-flex">
                      <li className="mx-1 text-info">
                        <MDBIcon
                          fab
                          icon="cc-visa"
                          size="3x"
                          className="indigo-text pr-3"
                        />
                      </li>
                      <li className="mx-1 text-info">
                        <MDBIcon
                          fab
                          icon="cc-mastercard"
                          size="3x"
                          className="amber-text pr-3"
                        />
                      </li>
                      <li className="mx-1 text-info">
                        <MDBIcon fab icon="cc-discover" size="3x" />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-8 order-md-1">
                  <h4 className="mb-3">Billing details</h4>

                  <div className={classes.root}>
                    <div>
                      <Stepper activeStep={activeStep} orientation="vertical">
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
                                    Back
                                  </Button>

                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => registerUser(index)}
                                    className={classes.button}
                                    disabled={
                                      !email ||
                                      !password ||
                                      !confirmPassword ||
                                      !phone ||
                                      !fullName
                                    }
                                  >
                                    {/* {console.log('PCIRERICE:', price)} */}
                                    {index === 0 ? (
                                      loading ? (
                                        <Loader />
                                      ) : (
                                        "Submit"
                                      )
                                    ) : (
                                      <PaystackButton
                                        text="Make Payment"
                                        class="payButton"
                                        callback={callback}
                                        close={close}
                                        email={userDetails.email}
                                        amount={price * 100 * 12}
                                        paystackkey={key}
                                        tag="button"
                                        // embed={true}
                                      />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </StepContent>
                          </Step>
                        ))}
                      </Stepper>
                      {activeStep === steps.length && (
                        <Paper
                          square
                          elevation={0}
                          className={classes.resetContainer}
                        >
                          <Typography>
                            {" "}
                            <div className="alert2" style={{ color: "green" }}>
                              {registrationSuccess ? successMessage : ""}
                            </div>
                          </Typography>
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
          <p className="copyright">
            Made with <i className="fa fa-heart"></i> By{" "}
            <a className="astyle" target="_blank" title="Orbit Themes" href="">
              ZOJATECH
            </a>{" "}
            &copy;
            <span id="currentYear"></span> All Rights Reserved.
          </p>
        </footer>
      </body>
    </div>
  );
}
