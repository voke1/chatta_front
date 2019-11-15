import React, { Component } from 'react';


export default class LayoutFooter extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (<footer className="footer" >
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        © 2019 Chatta - Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by IT Horizons
                        Limited.
            </div>
                </div>
            </div>
        </footer>)
    }



}