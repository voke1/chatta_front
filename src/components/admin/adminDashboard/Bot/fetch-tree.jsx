import React, {Component} from 'react';
import Accordion from './accordion';
import ConvoTree from '../../../front/conversation/convo.json'
class FetchTree extends Component {
    state = {
   tree: ConvoTree.tree[0],
   ConvoTree,
    }
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

            {this.state.tree.response.buttons.map(res => (
                <Accordion
                  res={res.val}
                  key={res.key}
                  botKey={res.key}
                  identity={res.identity}
                  chatTree={this.state.ConvoTree}
                />
              ))}
              <form className="text-center">
          <div className="row">
            <div className="md-col-8"></div>
          </div>
          
        </form>
              </div>
        )
    }
}
export default FetchTree;