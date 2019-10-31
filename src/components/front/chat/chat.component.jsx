import React, { Component } from 'react';
import './chat.component.css';
import '../../../utilities/slimscroll/slimscroll.css';
import $ from 'jquery';
// import '../../../utilities/slimscroll/slimscroll';
import { AppService } from '../../../services/app.service';
import Convo from '../conversation/convo.component';
import botpic from '../../../bot1.jpg';




export default class Chat extends Component {

    appService;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: [],
            isOpen: false,
            category_name: '',
            measuring_unit: '',
            showChatArea: false,
            textValue: '',
            userInput: ''
        }
        this.appService = new AppService();


    }

    render() {

        return (this.state.showChatArea) ? (
            <div className="slideInUp">
                <div className="container clearfix">

                    <div className="chat">
                        <div className="chat-header clearfix">
                            <img src={botpic} alt="avatar" height="50" width="50" className="img img-rounded" />
                            <div className="chat-about">
                                <div className="chat-with">Chatta</div>
                                <div className="chat-num-messages">
                                    {/* typing... */}
                                </div>
                            </div>
                            <span id="close-chat" onClick={this.toggleChatDisplay}>
                                <i className="fa fa-times fa-2x"></i>
                            </span>

                        </div>

                        <Convo userInput={this.state.userInput} />

                        <div id="input-container" className="chat-message clearfix">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">

                                        <input type="text" className="form-control" value={this.state.textValue} id="message-to-send" placeholder="Type your message" rows="2" onChange={this.handleChange} />
                                        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
<i className="fa fa-file-image-o"></i>

                                    </div>
                                    {/* <div className="col-md-1">
                                        <button id="play-btn" className="" type="submit">
                                            <i className="fa fa-play fa-2x"></i>
                                        </button>
                                    </div> */}

                                </div>
                                <div className="text-right">
                                    <span id="powered_by">Powered by: </span> <b>IT Horizons</b>

                                </div>

                            </form>




                        </div>
                    </div>

                </div>

            </div>
        ) :
            (<button id="chat-opener" data-toggle="tooltip" title="Chat with us" onClick={this.toggleChatDisplay}>
                <i className="far fa-comment-alt fa-2x">

                </i>
            </button>)
    }



    componentDidMount() {


        // // $('#chat-opener').tooltip();
        // $(document).ready(function () {
        //     $('[data-toggle="tooltip"]').tooltip();
        // });
    }

    toggleChatDisplay = () => {

        this.setState({
            showChatArea: !this.state.showChatArea
        });



    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            userInput: this.state.textValue
        })
        setTimeout(() => {
            this.setState({
                textValue: ''
            })
        }, 10)
    }



    handleChange = (event) => {
        this.setState({
            textValue: event.target.value
        })
    }


}