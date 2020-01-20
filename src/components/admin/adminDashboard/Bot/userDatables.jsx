import React, { useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import Switch from "react-toggle-switch";
import { Link } from 'react-router-dom';
import "../../../../../node_modules/react-toggle-switch/dist/css/switch.min.css";
import {MDBIcon} from "mdbreact";




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
                label: 'Role',
                field: 'role',
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
            ...props.users.map((client, index) => {

                let userList = {}
                userList.name = client.fullName
                userList.email = client.email
                userList.status = <Switch key={client._id}
                    onClick={() => {
                        props.toggleSwitch(
                            client._id
                        )
                    }}
                    on={props.users[index].switched} />
                // userList.status = getToggleSwitch(client._id, index)
                userList.role = client.role || 'Role'
                userList.phone = client.phone || 'Phone Number'
                userList.date = client.date || 'Date'

                userList.action = <div className="button-items">
                    <Link
                        to={`/dashboard/admin/user/${client._id}`}
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
                        className="btn btn-red btn-sm waves-effect"
                        onClick={() => {
                            props.confirmDelete(client._id);
                        }}
                    ><MDBIcon icon="trash-alt" />
                        
                </button>
                </div>
                return userList;


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