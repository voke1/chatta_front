import React, { Component } from "reactn";
import CreateIntent from "./create-intent";
import ConvoTree from "../../../front/conversation/convo.json";

class FetchTree extends Component {
  state = {
    ConvoTree: ConvoTree,
    rendered: false
  };
  render() {
    return (
      <div>
        {!this.state.rendered ? (
          <CreateIntent ConvoTree={this.state.ConvoTree} fetchTree={true}/>
        ) : (
          ""
        )}
      </div>
    );
  }
  componentDidMount() {
    this.setGlobal({ chatTree: ConvoTree, rendered: true });
  }
}
export default FetchTree;
