import React from 'react';
import { Link } from 'react-router-dom';
import '../landing-page/css/bootstrap.css';
import "../landing-page/css/landingPage.css";
import "../landing-page/css/responsive.css";
import '../landing-page/css/style.scss';
import "../landing-page/vendors/animate-css/animate.css";
import '../landing-page/vendors/fontawesome/css/all.min.css';
import "../landing-page/vendors/owl-carousel/owl.carousel.min.css";
import background from './img/banner/home-banner.jpg';
import aboutImage from './img/banner/about3.png'



const FrontPage = () => {

    return (
        <body style={{ height: "50rem", }}>
            {/* <ChatComponent /> */}
            {/* <!--================Header Menu Area =================--> */}
            <header className="header_area">
                <div className="main_menu">
                    <nav  className="navbar navbar-expand-lg" >
                        <div className="container">
                            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                            <a className="navbar-brand logo_h" href="index.html"><h3 style={{ marginTop: "1rem", textTransform: "capitalize"}}><b> Chatta</b></h3></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                            <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                                <ul className="nav navbar-nav menu_nav ml-auto">
                                    <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#">Features</a></li>
                                   
                                    <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
                                    <Link to={'/ithadmin'}> <li className="nav-item"><a className="nav-link" href="#">Admin</a></li></Link>
                                </ul>
                            </div>
                            <div className="right-button">
                                <ul className="ul">
                                    <Link to={'/auth/login'}><li><a className="sign_up" > Sign In</a></li> </Link>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            {/* <!--================Header Menu Area =================--> */}

            {/* <!--================Home Banner Area =================--> */}
            <section className="home_banner_area" style={{ maxWidth: '100%', overflowX: "hidden"}}>
                <div className="banner_inner d-flex align-items-center" style={{
                    backgroundImage: `url(${background})`, position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: "100%",
                    bottom: 0,
                    zIndex: 999999,
                    marginLeft: "-12rem",
                    width: "120%",
                    overflowX: "hidden",
                }}>
                    <div className="overlay"></div>
                    <div className="containerFront">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-6 col-xl-5 offset-xl-7" >
                                <div className="banner_content">
                                    <h3>Build a better<br />business & faster with Chatta</h3>
                                    <p>Subdue creature does face signs evening good sixth foreign gaered one. Fruit. Third every fruitful multiply subdue creature doesn't face signs evening good sixth tyou're.</p>
                                    <Link to={'/auth/register'}><button className="banner_btn">Begin Free Trial<i className="ti-arrow-right"></i></button > </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--================End Home Banner Are button=================--> */}

            {/* <!--================Service  Area =================--> */}
            <section className="service-area area-padding">
                <div className="containerFront">
                    <div className="row">
                        {/* <!-- Single service --> */}
                        <div className="col-md-6 col-lg-4">
                            <div className="single-service">
                                <div className="service-icon">
                                    <i className="ti-pencil-alt"></i>
                                </div>
                                <div className="service-content">
                                    <h5>Unique Design</h5>
                                    <p>Third don't lights wherein was. bring to build them, seas. Thing gathering answ gaered beast third that heaven after all that living one bank limit</p>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Single service --> */}
                        <div className="col-md-6 col-lg-4">
                            <div className="single-service">
                                <div className="service-icon">
                                    <i className="ti-image"></i>
                                </div>
                                <div className="service-content">
                                    <h5>Business Solution</h5>
                                    <p>Third don't lights wherein was. bring to build them, seas. Thing gathering answ gaered beast third that heaven after all that living one bank limit</p>
                                </div>
                            </div>
                        </div>


                        {/* <!-- Single service --> */}
                        <div className="col-md-6 col-lg-4">
                            <div className="single-service">
                                <div className="service-icon">
                                    <i className="ti-headphone-alt"></i>
                                </div>
                                <div className="service-content">
                                    <h5>Real time analytics</h5>
                                    <p>Third don't lights wherein was. bring to build them, seas. Thing gathering answ gaered beast third that heaven after all that living one bank limit</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* <!--================Service Area end =================--> */}


            {/* <!--================About  Area =================--> */}
            <section className="about-area area-padding-bottom">
                <div className="containerFront">
                    <div className="row align-items-center">

                        <div className="col-lg-6">
                            <div className="area-heading">
                                <h4>Create and customize<br></br>your bot yourself. </h4>
                                <h6>NO coding skill required...</h6>

                                <p>There earth face earth behold. She'd stars made void two given do and also. Our own grass days.  Greater male Shall There faced earth behold She star</p>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-6">
                                    <div className="single-about">
                                        <div className="about-icon">
                                            <i className="ti-thought"></i>
                                        </div>
                                        <div className="single-about-content">
                                            <h5>Generate leads</h5>
                                            <p>There earth face earth behold. She stars made void two given and also our own grass days. Greater </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    <div className="single-about">
                                        <div className="about-icon">
                                            <i className="ti-truck"></i>
                                        </div>
                                        <div className="single-about-content">
                                            <h5>Make faster payment</h5>
                                            <p>There earth face earth behold. She stars made void two given and also our own grass days. Greater </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--================About Area End =================--> */}

            {/* <!--================Feature  Area =================--> */}
            <section className="feature-area area-padding bg_one">
                <div className="containerFront">
                    <div className="row align-items-center">

                        <div className="offset-lg-6 col-lg-6">
                            <div className="area-heading light">
                                <h4>Easy to Use <br></br>Web Application</h4>
                                <p>There earth face earth behold. She'd stars made void two given do and also. Our own grass days.  Greater male Shall There faced earth behold She star</p>
                            </div>
                            <div className="row">
                                <div className="col-">
                                    <div className="single-feature d-flex">
                                        <div className="feature-icon">
                                            <i className="ti-layers"></i>
                                        </div>
                                        <div className="single-feature-content">
                                            <h5>Add New Project</h5>
                                            <p>There earth face earth behold. She stars made void two given and also our own grass days. Greater </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-">
                                    <div className="single-feature d-flex">
                                        <div className="feature-icon">
                                            <i className="ti-layers"></i>
                                        </div>
                                        <div className="single-feature-content">
                                            <h5>Generating Leads</h5>
                                            <p>There earth face earth behold. She stars made void two given and also our own grass days. Greater </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--================Feature Area End =================--> */}

            {/* <!--================About  Area =================--> */}
            <section className="statics-area area-padding">
                <div className="containerFront">
                    <div className="row">

                        <div className="col-lg-5">
                            <div className="image-box">
                                <img src={aboutImage} alt="" className="image"></img>
                            </div>
                        </div>

                        <div className="offset-lg-1 col-lg-6">
                            <div className="area-heading">
                                <h4>Have unlimited<br></br>and personalised conversation </h4>
                                <h6>...at scale </h6>

                                <p>There earth face earth behold. She'd stars made void two given do and also. Our own grass days.  Greater male Shall There faced earth behold She star</p>
                            </div>
                            <div className="single-data">
                                <i className="ti-paint-bucket"></i>
                                <p>Set dry signs spirit a kind First shall them.</p>
                            </div>
                            <div className="single-data">
                                <i className="ti-check-box"></i>
                                <p>He two face one moved dominion man you're likeness</p>
                            </div>
                            <div className="single-data">
                                <i className="ti-ruler-pencil"></i>
                                <p>Sea forth fill have divide be dominion from life</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            {/* <!--================About Area End =================--> */}

            {/* <!--================ Start Portfolio Area =================--> */}
            <section className="pricing_area area-padding-top">
                <div className="containerFront">
                    <div className="row">
                        <div className="col-12">
                            <div className="area-heading">
                                <h4>Our Pricing Plan</h4>
                                <p>Life firmament under them evening make after called dont saying likeness<br></br>isn't wherein also forth she'd air two without</p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="single-pricing">
                                <div className="pricing-icon">
                                    <i className="ti-home"></i>
                                </div>
                                <div className="single-pricing-content">
                                    <h5>Free Trial</h5>
                                    <h4>₦ 0.00</h4>
                                    <ul className="ul">
                                        <li>2GB Bandwidth</li>
                                        <li>Two Account</li>
                                        <li>15GB Storage</li>
                                        <li>Sale After Service</li>
                                        <li>3 Host Domain</li>
                                        <li>24/7 Support</li>
                                    </ul>
                                    <Link to={{ pathname: "/payment", state: { price: 0, plan: "Free Trial" } }}><a>Purchase Now</a></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="single-pricing">
                                <div className="pricing-icon">
                                    <i className="ti-bag"></i>
                                </div>
                                <div className="single-pricing-content">
                                    <h5>Standard</h5>
                                    <h4>₦ 35,000.00<span className="currency_line">/</span><span>month</span></h4>
                                    <ul className="ul">
                                        <li>2GB Bandwidth</li>
                                        <li>Two Account</li>
                                        <li>15GB Storage</li>
                                        <li>Sale After Service</li>
                                        <li>3 Host Domain</li>
                                        <li>24/7 Support</li>
                                    </ul>
                                    <Link to={{ pathname: "/payment", state: { price: "35000", plan: "Standard" } }}><a>Purchase Now</a></Link>                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="single-pricing">
                                <div className="pricing-icon">
                                    <i className="ti-car"></i>
                                </div>
                                <div className="single-pricing-content">
                                    <h5>Business</h5>
                                    <h4>₦ 25,000.00<span className="currency_line">/</span><span>month</span></h4>
                                    <ul className="ul">
                                        <li>2GB Bandwidth</li>
                                        <li>Two Account</li>
                                        <li>15GB Storage</li>
                                        <li>Sale After Service</li>
                                        <li>3 Host Domain</li>
                                        <li>24/7 Support</li>
                                    </ul>
                                    <Link to={{ pathname: "/payment", state: { price: "25000", plan: "Business" } }}><a>Purchase Now</a></Link>                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="single-pricing">
                                <div className="pricing-icon">
                                    <i className="ti-gift"></i>
                                </div>
                                <div className="single-pricing-content">
                                    <h5>Premium</h5>
                                    <h4>₦ 20,000.00<span className="currency_line">/</span><span>month</span></h4>
                                    <ul className="ul">
                                        <li>2GB Bandwidth</li>
                                        <li>Two Account</li>
                                        <li>15GB Storage</li>
                                        <li>Sale After Service</li>
                                        <li>3 Host Domain</li>
                                        <li>24/7 Support</li>
                                    </ul>
                                    <Link to={{ pathname: "/payment", state: { price: "20000", plan: "Premium" } }}><a>Purchase Now</a></Link>                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--================ End Pricing Area =================--> */}


            {/* <!--================ Start Brands Area =================--> */}
            <section className="brands-area area-padding-bottom">
                <div className="containerFront">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="owl-carousel brand-carousel">
                                {/* <!-- single-brand --> */}
                                <div className="single-brand-item d-table">
                                    <div className="d-table-cell">
                                        <img src="img/logo/1.png" alt="" className="image" ></img>
                                    </div>
                                </div>
                                {/* <!-- single-brand --> */}
                                <div className="single-brand-item d-table">
                                    <div className="d-table-cell">
                                        <img src="img/logo/2.png" alt="" className="image" ></img>
                                    </div>
                                </div>
                                {/* <!-- single-brand --> */}
                                <div className="single-brand-item d-table">
                                    <div className="d-table-cell">
                                        <img src="img/logo/3.png" alt="" className="image"></img>
                                    </div>
                                </div>
                                {/* <!-- single-brand --> */}
                                <div className="single-brand-item d-table">
                                    <div className="d-table-cell">
                                        <img src="img/logo/4.png" alt="" className="image"></img>
                                    </div>
                                </div>
                                {/* <!-- single-brand --> */}
                                <div className="single-brand-item d-table">
                                    <div className="d-table-cell">
                                        <img src="img/logo/5.png" alt="" className="image"></img>
                                    </div>
                                </div>
                                {/* <!-- single-brand --> */}
                                <div className="single-brand-item d-table">
                                    <div className="d-table-cell">
                                        <img src="img/logo/3.png" alt="" className="image"></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--================ End Brands Area =================--> */}



            {/* <!-- ================ start footer Area ================= --> */}
            <footer className="footer-area">
                <div className="containerFront">
                    <div className="row">

                        <div className="col-lg-3 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
                            <h4>About Us</h4>
                            <p> IT Horizons Ltd is a company with diverse talents and skills on existing, recent and upcoming technologies worldwide. </p>
                            <div className="footer-logo">
                                <img src="img/logo.png" alt="" className="image"></img>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
                            <h4>Contact Info</h4>
                            <div className="footer-address">
                                <p>9B Akin-Ogunmade Davies Street,
Gbagada Phase 2, Lagos State.</p>
                                <span>Phone : +2348189039359</span>
                                <span>Email : info@ith.com</span>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
                            <h4>Important Link</h4>
                            <ul className="ul">
                                <li><a href="#">WHMCS-bridge</a></li>
                                <li><a href="#">Search Domain</a></li>
                                <li><a href="#">My Account</a></li>
                                <li><a href="#">Shopping Cart</a></li>
                                <li><a href="#">Our Shop</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-8 mb-4 mb-xl-0 single-footer-widget">
                            <h4>Newsletter</h4>
                            <p>Heaven fruitful doesn't over lesser in days. Appear creeping seasons deve behold bearing days open</p>

                            <div className="form-wrap" id="mc_embed_signup">
                                <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                                    method="get">
                                    <div className="input-group">
                                        <input type="email" className="form-control" name="EMAIL" placeholder="Your Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Your Email Address '"></input>
                                        <div className="input-group-append">
                                            <button className="btn click-btn" type="submit">
                                                <i className="fab fa-telegram-plane"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ position: 'absolute', left: '-5000px' }}>
                                        <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabindex="-1" value="" type="text"></input>
                                    </div>

                                    <div className="info"></div>
                                </form>
                            </div>

                        </div>
                    </div>
                    <div className="footer-bottom row align-items-center text-center text-lg-left no-gutters">

                        {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p> */}
                        <div className="col-lg-4 col-md-12 text-center text-lg-right footer-social">
                            <a href="#"><i className="ti-facebook"></i></a>
                            <a href="#"><i className="ti-twitter-alt"></i></a>
                            <a href="#"><i className="ti-dribbble"></i></a>
                            <a href="#"><i className="ti-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- ================ End footer Area ================= --> */}

        </body>
    )
}


export default FrontPage;
