import React from 'react';
import { MDBRow } from 'mdbreact';
import AdminCardSection1 from './sections/AdminCardSection1';
import AdminCardSection2 from './sections/AdminCardSection2';
import TableSection from './sections/TableSection';
import BreadcrumSection from './sections/BreadcrumSection';
import ChartSection1 from './sections/ChartSection1';
import ChartSection2 from './sections/ChartSection2';
// import MapSection from './sections/MapSection';
import ModalSection from './sections/ModalSection';
import "./sections/paymentDashboardPage.css";
import Header from "../../layouts/layouts.header";
import Footer from "../../layouts/layouts.footer";

const PaymentDashboardPage =  () => {
  return (
  
      

    <React.Fragment>
      <BreadcrumSection />
      <AdminCardSection1 />
      <ChartSection1 />
    </React.Fragment>
    
   
    
  )
}

export default PaymentDashboardPage;