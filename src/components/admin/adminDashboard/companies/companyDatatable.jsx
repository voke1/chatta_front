import React, { useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import Switch from "react-toggle-switch";
import { Link } from 'react-router-dom';
import "../../../../../node_modules/react-toggle-switch/dist/css/switch.min.css";
import { MDBIcon } from "mdbreact";




/***
 * @class my class
 */


const DatatablePage = (props) => {

    const data = {

        columns: [
            {
                label: 'Company',
                field: 'company_name',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Domain Name',
                field: 'domain_name',
                sort: 'asc',
                width: 271
            },
            {
                label: 'Phone',
                field: 'phone',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Date created',
                field: 'date',
                sort: 'asc',
                width: 150
            },

            {
                label: 'Action',
                field: 'action',
                width: 100
            }
        ],
        rows: [
            ...props.companies.map((company, index) => {

            let companyList = {}
                companyList.company_name = company.company_name
                companyList.domain_name = company.domain_name
                companyList.status = "Switch" || <Switch key={company._id}
                    onClick={() => {
                        props.toggleSwitch(
                            company._id
                        )
                    }}
                    on={props.users[index].switched} />
                // companyList.status = getToggleSwitch(company._id, index)
                companyList.phone = company.phone || 'Phone Number'
                companyList.date = company.date || 'Date'

                companyList.action = <div className="button-items">
                    <Link
                        to={`/dashboard/admin/user/${company._id}`}
                    >
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm waves-effect"
                        >
                            <MDBIcon icon="pencil-alt" />&nbsp;
                  </button>
                    </Link>

                    <button
                        type="button"
                        className="btn  btn-red btn-sm waves-effect"
                        onClick={() => {
                            props.confirmDelete(company._id);
                        }}
                    ><MDBIcon icon="trash-alt" />

                    </button>
                </div>
                return companyList;


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