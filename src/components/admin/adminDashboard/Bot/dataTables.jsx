import React, { useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import Switch from "react-toggle-switch";
import { Link } from 'react-router-dom'



let btn = <div className="button-items">
    <Link
        to={`/dashboard/admin/company/us`}>

        <button
            type="button"
            className="btn btn-secondary btn-sm waves-effect"
            onClick={() => { console.log('Edit button clicked:') }}
        // clientID={client._id}
        >
            Edit &nbsp;
  </button>
    </Link>

    <button
        type="button"
        className="btn btn-secondary btn-sm waves-effect"
        onClick={() => {
            console.log('delete button clicked')
        }}
    >
        Delete
</button>
</div>

const DatatablePage = () => {
    const toggleSwitch = <Switch
        key
        onClick={() => { console.log("toggleswitch is clicked") }}
    />
    const [switchShow, setSwitchShow] = useState(false)

    const data = {
        columns: [
            {
                label: 'Company',
                field: 'company',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Domain Name',
                field: 'domain',
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
                label: 'Date Updated',
                field: 'dateUpdated',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Option',
                field: 'option',

                width: 100
            }
        ],
        rows: [
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn,
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: toggleSwitch,
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },

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