import React, { Component } from "react";
import Accordion from "./accordion";
import ConvoTree from "../../../front/conversation/convo.json";
import OptionForm from "./option-form";
class FetchTree extends Component {
  state = {
    tree: ConvoTree.tree[0],
    ConvoTree
  };
  render() {
    return (
      <div>
        <div className="md-form mt-3">
          <input
            type="text"
            id="materialSubscriptionFormPasswords"
            className="form-control"
            name="prompt"
            value={this.state.tree.prompt}
            onChange={this.onChange}
            placeholder="Enter a prompt"
          />
        </div>

        <div className="ml-50">
          {this.state.tree.response.buttons.map(res => (
            <Accordion
              res={res.val}
              key={res.key}
              botKey={res.key}
              identity={res.identity}
              chatTree={this.state.ConvoTree}
            />
          ))}
        </div>
        <div className="ml-0">
          <OptionForm marginLeft="0px" />
        </div>
        <button
          className={`btn btn-sm btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect`}
          type="submit"
          style={{
            width: "100px",
            float: "right"
          }}
          disabled={this.state.disabledButton}
        >
          Save
        </button>
      </div>
    );
  }
}
export default FetchTree;
