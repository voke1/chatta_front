import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "./css/main.css"
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css"
import "./fonts/Linearicons-Free-v1.0.0/icon-font.min.css"
import "./vendor/animate/animate.css"
import "./vendor/animsition/css/animsition.min.css"
import "./vendor/bootstrap/css/bootstrap.min.css"
import "./vendor/css-hamburgers/hamburgers.min.css"
import "./vendor/daterangepicker/daterangepicker.css"
import "./vendor/select2/select2.min.css"
import {Validation} from "../../../utilities/validations"
import { login } from "../../../components/admin/adminDashboard/Authentication/UserFunctions";
import { Redirect } from "react-router-dom"
import Loader from "./loader";



export class AdminLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: " ",
			isChanged: false,
			email: "",
			password: "",
			showProgress: "",
			
		};
	}

    onChange = async (e)=> {
		this.setState({ [e.target.name]: e.target.value });
		const result = await Validation.validateAll(e);
		this.setState({
			isChanged: true,
			message: result.message,
			disabled: result.disabled,
			[result.color.name]: result.color.value
		});
	}
	onSubmit = e => {
		e.preventDefault();
		this.setState({ message: "", showProgress: true });
		const user = {
			email: this.state.email,
			password: this.state.password,
			disabled: true
		};
		login(user)
		
		.then(res => {
			try {
				if (res.data) {
					if (!res.data.success) {
						this.setState({
							isChanged: true,
							message: res.data.message,
							disabled: false,
							showProgress: false
						});
					}
					if (res.data.success) {
						if (!res.data.userDetails.isAdmin) {
							this.setState({
								redirect: "/dashboard/admin"
							});
						} else {
							this.setState({
								redirect: "/dashboard/admin"
							});
						}
					}
				}


				
			} catch (error) {
				this.setState({ message: 'Please check your internet connection', showProgress: false})
			}
			console.log("this is res", res);

			
		})
	};
	renderRedirect = target => {
		return <Redirect to={target} />;
	};

	render() {

		const message = (
			<p
				className={this.state.message ? "animated shake" : "msg"}
				style={{ color: "#c74a51" }}
			>
				{this.state.message}
			</p>
		);

		return (
			<div>


				<body style={{ backgroundColor: "#666666", height: "50rem" }}>
					{this.state.redirect ? this.renderRedirect(this.state.redirect) : ""}
					<div className="limiter" >
						<div className="container-login100" >
							<div className="wrap-login100" style={{ backgroundColor: "#6775DF" }} >

								<form className="login100-form validate-form" onSubmit={this.onSubmit}>
									<span className="login100-form-title p-b-43" style={{ marginBottom: "15%", color: "#6775DF" }}>
										Admin Login
					</span >
									{this.state.isChanged ? message : ""}


									<div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
										<input className="input100" type="text" name="email"
											value={this.state.email}
											onChange={this.onChange} placeholder="Email" ></input>
										<span className="focus-input100"></span>
									
									</div>


									<div className="wrap-input100 validate-input" data-validate="Password is required">
										<input className="input100" type="password" name="password"
											value={this.state.password}
											onChange={this.onChange} placeholder="Password"></input>
										<span className="focus-input100"></span>
										
									</div>

									<div className="flex-sb-m w-full p-t-3 p-b-32">
										<div className="contact100-form-checkbox">
											<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"></input>
											<label className="label-checkbox100" for="ckb1">
												Remember me
							</label>
										</div>


									</div>


									<div className="container-login100-form-btn">
										<button className="login100-form-btn" style={{ marginTop: "4%" }} type="submit">
											{this.state.showProgress?<Loader/>:"Login"}
						</button>
										<div style={{ marginLeft: "70%", marginTop: "4%" }}>
											<a href="#" className="txt1"  >
												Forgot Password?
							</a>
										</div>
									</div>



								</form>
								<div className="col-md-6 mb-5 mt-md-0 mt-5 white-text text-center text-md-left" style={{
									marginRight: "10%", fontFamily: "Montserrat-Regular"
								}}>
									<h1 className="h1-responsive font-weight-bold wow fadeInLeft " data-wow-delay="0.3s" style={{ color: "white", marginTop: "30%" }}>Welcome to Chatta! </h1>
									<hr className="hr-light wow fadeInLeft" data-wow-delay="0.3s"></hr>
									<h6 className="mb-3 wow fadeInLeft" data-wow-delay="0.3s" style={{ color: "white", marginTop: "", fontFamily: "Montserrat-Regular" }}>Easily create bots that help you qualify leads, book meetings, provide answers to common customer support questions, and more — so your team has more time to focus on the <br></br>conversations that matter most.</h6>
									<Link to={"/"}> <button className="btn  btn-rounded wow fadeInLeft" data-wow-delay="0.3s" style={{ color: "6775DF", backgroundColor: "white", marginLeft: "0%", fontFamily: "Montserrat-Bold" }}>Learn more</button></Link>
								</div>

							</div>
						</div>
					</div>

				</body>

			</div>
		)
	}
}





