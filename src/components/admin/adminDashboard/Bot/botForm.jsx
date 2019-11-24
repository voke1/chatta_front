import React, { Component } from "react";

class BotForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  async onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.handleBotFormsubmit({
      name: this.state.name,
      email: this.state.email
    });
  };
  render() {
    return (
      <div class="card">
        <div class="card-body px-lg-5">
          <form
            class="text-center"
            style={{ color: "#757575" }}
            onSubmit={this.onSubmit}
          >
            <div class="md-form mt-3">
              <input
                type="text"
                id="materialSubscriptionFormPasswords"
                class="form-control"
                onChange={this.onChange}
                name="name"
                value={this.state.name}
                placeholder="Name"
              />
            </div>

            <div class="md-form">
              <input
                type="email"
                id="materialSubscriptionFormEmail"
                class="form-control"
                onChange={this.onChange}
                name="email"
                value={this.state.email}
                placeholder="Email"
              />
            </div>

            <button
              class="btn btn-outline-info btn-rounded btn-block z-depth-0 my-2 waves-effect"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default BotForm;
