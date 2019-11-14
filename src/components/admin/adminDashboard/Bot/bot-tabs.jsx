import React, { Component } from "react";
import { Tab, Tabs, Row, Col, Form, Button } from "react-bootstrap";
import CreateIntent from "./create-intent";
class BotTabs extends Component {
  render() {
    return (
      <div className="container-holder">
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          &nbsp;
          <Tab eventKey="home" title="Create Bot">
            <div className="" style={{ background: "none" }}>
              <div className="card">
                <div className="card-body px-lg-5">
                  <form
                    className="text-center"
                    style={{ color: "#757575" }}
                    action="#!"
                  >
                    <p>Let's start by giving your bot some default settings</p>

                    <div className="md-form mt-3">
                      <input
                        type="text"
                        id="materialSubscriptionFormPasswords"
                        className="form-control"
                        placeholder="Bot name"
                      />
                    </div>
                    <div className="md-form">
                      <input
                        type="text"
                        id="materialSubscriptionFormEmail"
                        className="form-control"
                        placeholder="Welcome message"
                      />
                    </div>
                    <div className="md-form">
                      <input
                        type="text"
                        id="materialSubscriptionFormEmail"
                        className="form-control"
                        placeholder="Fallback message"
                      />
                    </div>
                    <div className="md-form">
                      <input
                        type="text"
                        id="materialSubscriptionFormEmail"
                        className="form-control"
                        placeholder="Delay prompt"
                      />
                    </div>
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFileLang"
                        lang="en"
                      />
                      <label class="custom-file-label" for="customFileLang">
                        Upload bot image
                      </label>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect"
                      type="submit"
                      style={{ width: "100px", float: "right" }}
                    >
                      Next
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="profile" title="Add Intent" ClassName="close">
            <div className="card w-100">
              <div className="card-body">
                <CreateIntent />
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
export default BotTabs;
