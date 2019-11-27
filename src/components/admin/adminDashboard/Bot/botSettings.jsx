import React, { Component } from "react";
import { Tab, Tabs, Row, Col, Form, Button } from "react-bootstrap";
import "../../plugins/datatables/dataTables.bootstrap4.min.css";
import "../../plugins/datatables/responsive.bootstrap4.min.css";
import "../../css/style.css";
import "../../css/icons.css";
import "../../css/bootstrap.min.css";
import "../../images/favicon.ico";
import "../../css/overlay.css";
import "../../css/overlay.css";
import closeImage from "../../images/close.jpg";
import axios from "axios";
import Overlay from "./overlay";

export class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      chatbotName: "",
      welcomeMessage: "",
      fallbackMessage: "",
      delayPrompt: "",
      botImage: ""
    };
    this.overlayClose = this.overlayClose.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();

    const setting = {
      chatbotName: this.state.chatbotName,
      welcomeMessage: this.state.welcomeMessage,
      fallbackMessage: this.state.fallbackMessage,
      delayPrompt: this.state.delayPrompt,
      botImage: this.state.botImage
    };

    console.log(setting);
    axios
      .post("http://localhost:9000/setting", {
        ...setting
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  fileSelectedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  fileUploadHandler = () => {
    const formData = new FormData();
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    axios.post("").then(res => {
      console.log(res);
    });
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  overlayShow() {
    console.log("overlay showed");
    this.setState({ show: true });
  }

  overlayClose() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <Button
          variant="primary"
          className="btn btn-outline-light ml-1 waves-effect waves-light"
          onClick={() => this.overlayShow()}
        >
          Create Bot +
        </Button>

        {this.state.show ? (
          <Overlay height="100%" closeOverlayWithState={this.overlayClose} />
        ) : null}
        {console.log("State value:", this.state.show)}
      </div>
    );
  }
}
