import React from 'react';
import { MDBDataTable } from 'mdbreact';
import Switch from "react-toggle-switch";
import { Link } from 'react-router-dom';
import "../../../../../node_modules/react-toggle-switch/dist/css/switch.min.css";
import datatableHeader from '../../../../utilities/userDatatableHeaders'



const DatatablePage = (props) => {

    const getToggleSwitch = (clientId, index) => {
        return <Switch key={clientId}
            onClick={() => {
                props.toggleSwitch(
                    clientId
                )
            }}
            on={props.users[index].switched} />
    }

    const getEditAndDeleteButtons = (clientId) => {
        return <div className="button-items">
            <Link
                to={`/dashboard/admin/user/${clientId}`}
            >
                <button
                    type="button"
                    className="btn btn-secondary btn-sm waves-effect"
                >
                    Edit &nbsp;
                  </button>
            </Link>

            <button
                type="button"
                className="btn btn-secondary btn-sm waves-effect"
                onClick={() => {
                    props.confirmDelete(clientId);
                }}
            >
                Delete
                </button>
        </div>
    }

    const data = {

        columns: datatableHeader,

        rows: [
            ...props.users.map((client, index) => {

                let userList = {}
                userList.name = client.fullName
                userList.email = client.email
                userList.status = getToggleSwitch(client._id, index)
                userList.phone = client.phone || 'Phone Number'
                userList.date = client.date || 'Date'
                userList.option = getEditAndDeleteButtons(client._id)
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