import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';
import BotSelect from '../bot-select';

const BreadcrumSection = () => {
  return (
    <MDBCard className="mb-5">
      <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
        <BotSelect />
      </MDBCardBody>
    </MDBCard>
  )
}

export default BreadcrumSection;

