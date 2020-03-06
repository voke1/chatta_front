import React, { Component } from "reactn";
import "./css/accordion.css";
import CardView from "./card-view";
import OptionBox from "./option-box";
import PaymentForm from "./payment-form"

class Accordion extends Component {
  state = {
    height: "0px",
    active: "",
    init: "0px",
    newHeight: "0px",
    pay: false,
    keyy: "",
    amount: "",
  };


  getData = (key, price)=>{

    this.setState({keyy: key, amount: price})
    console.log("get Data is called, key is ", key, "price is", price);
  let action ={"type": "edit", "key": key, "amount": price}
    
     this.global.modifyOption(this.props.botKey, action )

  }
  
  syncHeight = height => {
    const number = parseInt(this.state.height.match(/(\d+)/)[0], 10);
    console.log(this.state.init);
    const newHeight = this.state.init + height + number;
    this.setState({
      init: newHeight,
      height: newHeight + this.divElement.clientHeight + "px"
    });
  };

  toggleAccordion = (payment) => {
    this.setState({
      active: this.state.active === "" ? "active" : "",
      height:
        this.state.active === "active"
          ? "0px"
          : this.state.init + this.divElement.clientHeight + "px",

    });
    if(payment){
      this.setState({pay: true});
      console.log("payment is true");
      if(this.state.active === 'active'){
        this.setState({pay: false});
      }
    }
    console.log("checking active and init", this.state.active, "and", this.state.init)
    
  };
  setActive = () => (this.state.active === "" ? "active" : "");
  render() {
    return (
      <div
        ref={divElement => (this.divElement = divElement)}
        className="accordion-section"
        style={{
          marginLeft: "50px",
          marginBottom: "10px",
          marginTop: "10px",
          transition: "max-width 0.6s ease",
        }}
      >
        <CardView
          className={`accordion ${this.setActive}`}
          onClick={this.toggleAccordion}
          syncHeight={this.syncHeight}
          syncTree={this.props.syncTree}
          res={this.props.res}
          key={this.props.key}
          botKey={this.props.botKey}
          chatTree={this.props.chatTree}
          identity={this.props.identity}
          modifyOption={this.props.modifyOption}
          getTab={this.props.getTab}
          toggleAccordion={this.toggleAccordion}
        />
        <div
          style={{ maxHeight: `${this.state.height}` }}
          className="accordion_content"
        >
          {this.state.pay?<PaymentForm getData={this.getData}/>:<OptionBox
            res={this.props.res}
            key={this.props.botKey}
            botKey={this.props.botKey}
            syncTree={this.props.syncTree}
            syncHeight={this.syncHeight}
            identity={this.props.identity}
            prompt={this.props.prompt}
            chatTree={this.props.chatTree}
            modifyOption={this.props.modifyOption}
            pay={this.state.pay}
            amount={this.state.amount}
            keyy={this.state.keyy}

          />} 
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.setGlobal({ toggleAccordion: this.toggleAccordion });
    const height = this.divElement.clientHeight;
    this.setState({ init: height, pay: false});
    // collapse chat tree as default after fetching and rendering

    setTimeout(() => {
      this.toggleAccordion();
    }, 10);
    this.toggleAccordion();
  }
  componentWillReceiveProps(props) {}
}
export default Accordion;
