import React, { Component } from "react";
import "../css/intent.css";
import Response from "./response";
import Accordion from "./accordion";

class CreateIntent extends Component {
  state = {
    responses: [],
    response: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onClick = info => {
    console.log("clicked");
    const initialResponse = [...this.state.responses];
    initialResponse.push(info.response);
    this.setState({
      responses: initialResponse,
      response: ""
    });
  };

  render() {
    console.log(this.state.responses);
    const newResponse = <Response />;
    return (
      <div className="container" style={{ background: "white", width: "75%" }}>
        <form>
          <div className="row">
            <div className="md-col-8"></div>
          </div>
          <fieldset className="the-fieldset">
            <legend className="the-legend">Bot settings</legend>
            <div className="form-group">
              <label for="botname">Bot Name</label>
              <input
                type="text"
                name="botname"
                value={this.state.botname}
                id="botname"
                className="form-control"
                placeholder="Enter bot name"
              ></input>
            </div>
            <div className="form-group">
              <label for="welcome-message">Prompt</label>
              <input
                className="form-control"
                type="text"
                name="welcomemessage"
                value={this.state.welcomeMessage}
                id="welcome-message"
                placeholder="Enter bot's welcome message"
              ></input>
            </div>
            <div className="form-group">
              <label for="fallback-message">Fallback Message</label>
              <input
                className="form-control"
                type="text"
                name="fallback"
                value={this.state.fallback}
                id="text"
                placeholder="We offer Solutions, applications, delivery.."
              ></input>
            </div>
            <div className="form-group">
              <label for="theme">Choose theme</label>
              <select className="form-control" id="theme">
                <option name="dark" value={this.state.dark}>
                  Dark
                </option>
                <option name="light" value={this.state.light}>
                  Light
                </option>
              </select>
            </div>
            <div className="form-group">
              <label for="bot-image">Bot Image</label>
              <input className="form-control-file" type="file"></input>
            </div>
          </fieldset>
          <hr></hr>
          <fieldset className="the-fieldset">
            <legend className="the-legend">Create Intents</legend>
            <div className="form-group">
              <label for="identity">Identity</label>
              <input
                type="text"
                name="identity"
                value={this.state.identity}
                id="identity"
                className="form-control"
                placeholder="endowments"
              ></input>
            </div>
            <div className="form-group">
              <label for="prompt">Description text</label>
              <input
                className="form-control"
                type="text"
                name="text"
                value={this.state.text}
                id="text"
                placeholder="We offer Solutions, applications, delivery.."
              ></input>
            </div>
            <div className="form-group">
              <label for="prompt">Prompt</label>
              <input
                className="form-control"
                type="text"
                name="prompt"
                value={this.state.prompt}
                id="prompt"
                placeholder="An endowment policy is a life insurance contract designed to.."
              ></input>
            </div>
            <hr className="mt-3"></hr>
            <Accordion />
            <hr></hr>
          </fieldset>

          <button
            className="save"
            style={{
              width: "100px",
              height: "40px",
              marginTop: "6px",
              border: "2px solid #d4d4d6",
              backgroundColor: "#46467d",
              color: "white"
            }}
          >
            Deploy
          </button>
        </form>
      </div>
    );
  }
}
export default CreateIntent;
