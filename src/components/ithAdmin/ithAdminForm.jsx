import React, { useState } from 'react'


const ITHAdminForm = (props) => {

    const [password, setPassword] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [selectedChar, setselectedChar] = useState(" ");


    const onChange = (event) => {
        setPassword({ password: event.target.value})
        console.log("password:", password)

    }

    const onEmailChange = (event) => {
        setEmail({ email: event.target.value })
        console.log("email:", email)
    }


    return (
        <div>
            {/* <!-- Default form login --> */}
            <form className="text-center border border-light p-5" action="#!">

                <p className="h4 mb-4">Admin Login</p>

                {/* <!-- Email --> */}
                <input type="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail"  name="email" onChange={onEmailChange}></input>

                {/* <!-- Password --> */}
                <input type="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password"  onChange={onChange}></input>

                <div className="d-flex justify-content-around">
                    <div>
                        {/* <!-- Remember me --> */}
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember"></input>
                            <label className="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                        </div>
                    </div>
                    <div>
                        {/* <!-- Forgot password --> */}
                        <a href="">Forgot password?</a>
                    </div>
                </div>

                {/* <!-- Sign in button --> */}
                <button className="btn btn-block my-4" type="submit" style={{ color: "white", backgroundColor: "#49B5E6", fontStyle: "arial !important" }}>Sign in</button>

                {/* <!-- Register --> */}
                <p>Not a member?
        <a href="">Register</a>
                </p>

                {/* <!-- Social login --> */}
                <p>or sign in with:</p>

                <a href="#" className="mx-2" role="button"><i className="fab fa-facebook-f light-blue-text"></i></a>
                <a href="#" className="mx-2" role="button"><i className="fab fa-twitter light-blue-text"></i></a>
                <a href="#" className="mx-2" role="button"><i className="fab fa-linkedin-in light-blue-text"></i></a>
                <a href="#" className="mx-2" role="button"><i className="fab fa-github light-blue-text"></i></a>

            </form>
            {/* <!-- Default form login --> */}


        </div>
    )
}

export default ITHAdminForm
