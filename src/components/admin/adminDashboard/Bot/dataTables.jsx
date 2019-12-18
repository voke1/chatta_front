import React from 'react';
import { MDBDataTable } from 'mdbreact';

const btn = <button
    type="button"
    className="btn btn-secondary btn-sm waves-effect"


>
    Delete
</button >

const DatatablePage = () => {
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
                width: 270
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
                status: 'Edinburgh',
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: 'Edinburgh',
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: 'Edinburgh',
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: 'Edinburgh',
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: 'Edinburgh',
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: 'Edinburgh',
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: 'Edinburgh',
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: 'Edinburgh',
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: 'Edinburgh',
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: 'Edinburgh',
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: 'Edinburgh',
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: 'Edinburgh',
                phone: '+234822222222',
                date: '2011/04/25',
                dateUpdated: '2011/04/25',
                option: btn
            },
            {
                company: 'IT Horizon',
                domain: 'ITH.com',
                status: 'Edinburgh',
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