import React from 'react'
import ITHAdminForm from './ithAdminForm';
// import image from '../front/landing-page/img/banner/home-banner.jpg'

function ithAdmin() {
    return (

        <div>
            {/* <!-- Main navigation --> */}
            <header style={{ height: '100%' }}>
                <div className="view" style={{ backgroundImage: "url(" + 'http://mdbootstrap.com/img/Photos/Others/images/91.jpg' + ")", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center', height: '200%' }}>

                    {/* <!-- Mask & flexbox options--> */}
                    <div className="mask1 rgba-gradient d-flex justify-content-center align-items-center" style={{ marginTop: '10%', marginBottom: '15rem' }}>
                        {/* <!-- Content --> */}
                        <div className="container">
                            {/* <!--Grid row--> */}
                            <div className="row mt-5">
                                {/* <!--Grid column--> */}
                                <div className="col-md-6 mb-5 mt-md-0 mt-5 white-text text-center text-md-left">
                                    <h1 className="h1-responsive font-weight-bold wow fadeInLeft" data-wow-delay="0.3s">Welcome to Chatta! </h1>
                                    <hr className="hr-light wow fadeInLeft" data-wow-delay="0.3s"></hr>
                                    <h6 className="mb-3 wow fadeInLeft" data-wow-delay="0.3s">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem repellendus quasi fuga
                                    nesciunt dolorum nulla magnam veniam sapiente, fugiat! Commodi sequi non animi ea
            dolor molestiae, quisquam iste, maiores. Nulla.</h6>
                                    <a className="btn btn-outline-white btn-rounded wow fadeInLeft" data-wow-delay="0.3s">Learn more</a>

                                </div>
                                {/* <!--Grid column--> */}
                                {/* <!--Grid column--> */}
                                <div className="col-md-6 col-xl-5 mb-4">
                                    {/* <!--Form--> */}
                                    <div className="card wow fadeInRight" data-wow-delay="0.3s">

                                       <ITHAdminForm/>

                                    </div>
                                    {/* <!--/.Form--> */}
                                </div>
                                {/* <!--Grid column--> */}
                            </div>
                            {/* <!--Grid row--> */}

                        </div>
                        {/* <!-- Content --> */}
                    </div>
                    {/* <!-- Mask & flexbox options--> */}
                </div>
                {/* <!-- Full Page Intro --> */}
            </header>
            {/* <!-- Main navigation --></div> */}


        </div>
    )
}

export default ithAdmin
