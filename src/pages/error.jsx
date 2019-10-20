import React, { Component } from "react";
import { Link } from "react-router-dom";

// import "../js/jquery.min.js";
// import"../js/popper.min.js";
// import "../js/bootstrap.min.js";
// // import "../js/modernizr.min.js";
// import "../js/waves.js";
// import "../js/jquery.slimscroll.js";
// import "../js/jquery.nicescroll.js";
// import "../js/jquery.scrollTo.min.js";

// // import "../plugins/datatables/jquery.dataTables.min.js";
// import "../plugins/datatables/dataTables.bootstrap4.min.js";

// import "../plugins/datatables/dataTables.buttons.min.js";
// import "../plugins/datatables/buttons.bootstrap4.min.js";
// // import "../plugins/datatables/jszip.min.js";
// // import "../plugins/datatables/pdfmake.min.js";
// // import "../plugins/datatables/vfs_fonts.js";
// // import "../plugins/datatables/buttons.html5.min.js";
// // import "../plugins/datatables/buttons.print.min.js";
// // import "../plugins/datatables/buttons.colVis.min.js";
// // // {/* <!-- Responsive examples --> */}
// import "../plugins/datatables/dataTables.responsive.min.js";
// import "../plugins/datatables/responsive.bootstrap4.min.js";

// // import "../pages/datatables.init.js";

// import "../js/app";

import "../components/admin/admin_template/fonik/purple/assets/plugins/datatables/dataTables.bootstrap4.min.css";
// import '../plugins/datatables/buttons.bootstrap4.min.css'
import "../components/admin/admin_template/fonik/purple/assets/plugins/datatables/responsive.bootstrap4.min.css";

import "../components/admin/admin_template/fonik/purple/assets/css/style.css";
import "../components/admin/admin_template/fonik/purple/assets/css/icons.css";
import "../components/admin/admin_template/fonik/purple/assets/css/bootstrap.min.css";
// import '../plugins/nestable/jquery.nestable.css';

import "../components/admin/admin_template/fonik/purple/assets/images/favicon.ico";

// <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
// <link href="assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
// <!-- Responsive datatable examples -->
// <link href="assets/plugins/datatables/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css" />

export default class Error extends Component {
  render() {
    return (
      <div>
        {/* //     <div id="preloader">
    //       <div id="status">
    //         <div className="spinner"></div>
    //       </div>
    //     </div> */}

        {/* <!-- Begin page --> */}
        <div className="accountbg"></div>
        <div className="wrapper-page">
          <div className="card">
            <div className="card-block">
              <div className="ex-page-content text-center">
                <h1 className="">404!</h1>
                <h4 className="">Sorry, page not found</h4>
                <br></br>

                <a className="btn btn-info mb-5 waves-effect waves-light">
                  <i className="mdi mdi-home"></i> Back to Dashboard
                </a>
              </div>
            </div>
          </div>

          <div className="m-t-40 text-center">
            <p>
              © 2019 Chatta. Crafted with{" "}
              <i className="mdi mdi-heart text-danger"></i> by IT Horizons
              Limited
            </p>
          </div>
        </div>

        {/* <!-- jQuery  -->
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/popper.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/modernizr.min.js"></script>
        <script src="assets/js/waves.js"></script>
        <script src="assets/js/jquery.slimscroll.js"></script>
        <script src="assets/js/jquery.nicescroll.js"></script>
        <script src="assets/js/jquery.scrollTo.min.js"></script>

        <!-- App js -->
        <script src="assets/js/app.js"></script> */}
      </div>
    );
  }
}
