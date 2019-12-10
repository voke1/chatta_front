import React, { Component } from "reactn";
import CreateIntent from "./create-intent";

class FetchTree extends Component {
  state = {
    rendered: false,
    convoTree: []
  };
  render() {
    return (
      <div>
        <CreateIntent
          ConvoTree={this.props.chatTree}
          fetchTree={true}
          treeId={this.props.treeId}
          settings={this.props.settings}
          fetched={true}
        />
      </div>
    );
  }
  componentDidMount() {
    this.setState({ convoTree: this.props.chatTree });
    this.setGlobal({ chatTree: this.props.chatTree, rendered: true });
  }
}
export default FetchTree;


