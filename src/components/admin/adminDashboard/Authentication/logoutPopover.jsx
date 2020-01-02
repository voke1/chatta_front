import React from "react";
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, MDBContainer } from "mdbreact";

const PopoverPage = () => {
    return (

        <div>

            <MDBPopover
                placement="bottom"
                popover
                clickable
                id="popper3"
            >
                <span className="ml-1">
                    {"FullName"} <i className="mdi mdi-chevron-down"></i>{" "}
                </span>
                <div>
                    <MDBPopoverBody>
                        <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                            <a className="dropdown-item" href="#">
                                <i className="dripicons-user text-muted"></i> Profile
                      </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                <i className="dripicons-exit text-muted"></i> Logout
                      </a>
                        </div>e ornare sem lacinia quam venenatis vestibulum.
            </MDBPopoverBody>
                </div>

            </MDBPopover>
        </div>

    );
}

export default PopoverPage;