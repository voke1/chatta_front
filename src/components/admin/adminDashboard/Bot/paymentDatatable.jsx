import React, { useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import "../../../../../node_modules/react-toggle-switch/dist/css/switch.min.css";
import moment from "moment";
import { MDBIcon } from "mdbreact";




/***
 * @class my class
 */


const DatatablePage = (props) => {

    const data = {

        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Email',
                field: 'email',
                sort: 'asc',
                width: 271
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Amount',
                field: 'amount',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Reference',
                field: 'reference',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Date created',
                field: 'date',
                sort: 'asc',
                width: 150
            },

           
        ],

        rows: [
            ...props.payments.map((payment, index) => {

                let paymentList = {}
                paymentList.name = payment.name
                paymentList.email = payment.email
                paymentList.status = payment.status
                paymentList.amount = payment.amount || 'Amount'
                paymentList.reference = payment.reference || 'Reference'
                paymentList.date = moment(payment.date).format('Do-MMMM-YYYY, LT') || 'Date'
                return paymentList;


            }),


        ]
    };

    return (
        <MDBDataTable
            striped
            bordered
            large
            data={data}
        />
    );
}

export default DatatablePage;