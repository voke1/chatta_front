import React, { Component } from 'react';




export default class AppLoader extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (this.loader())
    }



    loader = () => {
        if (this.props.loading) {

            return (
                <tr>
                    <td colSpan={this.props.tds} className="text-center">

                        fetching records...
                    <div className="preloader">
                            <div id="status">
                                <div className="spinner mt-2"></div>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        }
        return (!this.props.loading && this.props.itemsLength == 0) ? (
            <tr>
                <td colSpan={this.props.tds} className="text-center">
                    No records returned
            </td>
            </tr>
        ) : null
    }
}