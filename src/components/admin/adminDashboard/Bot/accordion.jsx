import React, { Component } from "reactn";
import "./css/accordion.css";
import CardView from "./card-view";
import OptionBox from "./option-box";

class Accordion extends Component {
  state = {
    height: "0px",
    active: "",
    init: "0px",
    newHeight: "0px",
    pay: false,
  };


  // paymentForm = <div className="option-box">
  //   <div
  //     style={{
  //       marginLeft: "40px",
  //       marginRight: "100px",
  //       marginTop: "15px"
  //     }}
  //     className="form-group"
  //   >
  //     <input
  //       className="form-control border-top-0 border-right-0 border-left-0"
  //       placeholder="Paystack key"
  //       name="pKey"
  //       value={this.state.prompt}
  //       onChange={this.onChange}
  //       style={{ width: "300px" }}
  //     ></input>
      
  //     <div className="form-inline">
  //       <input
  //         className="form-control border-top-0 border-right-0 border-left-0"
  //         placeholder="Price"
  //         name="response"
  //         value={this.state.response}
  //         onChange={this.onChange}
  //         style={{ width: "300px" }}
  //         disabled={this.state.noOption}
  //       ></input>
  //       <div style={{ width: "10%" }}>
  //         <button
  //           type="button"
  //           className="btn btn-sm"
  //           onClick={() =>
  //             this.onClick({ response: this.state.response })
  //           }
  //           style={{ backgroundColor: "#ededed", color: "#5b616b" }}
  //           disabled={!this.state.validated}
  //         >
  //           Add
  //               </button>
  //       </div>
  //     </div>
  //   </div>
  // </div>

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
      this.setState({pay: !this.state.pay})
      console.log("payment is true")
      // if(this.state.active === 'active'){
      //   this.setState({pay: false})
      // }
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
          transition: "max-width 0.6s ease"
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
          {<OptionBox
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
