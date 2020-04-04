import React, { Component } from 'react';
import Axios from 'axios';
import { APP_ENVIRONMENT } from "../../../../environments/environment";

const BASE_URL = APP_ENVIRONMENT.base_url;





class BotSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uniqueBots: [],
        }
    }
    componentDidMount = async () => {
        const clientId = JSON.parse(localStorage.getItem("userdetails")).id;

        const response = await Axios.get(`${BASE_URL}/tree/all/${clientId}`);
        console.log("botresponse:", response);
        this.setState({ uniqueBots: response.data })

    }

    render() {
        return (
            <div style={{ width: "20rem" }}>
                <select className="browser-default custom-select">
                    <option>select a chatbot</option>
                    {this.state.uniqueBots.map((bot, index) => {
                    

                        return <option value="1">{"no name"}</option>
                    })}
                </select>
            </div>
        );
    }
}

export default BotSelect;