import React, { setGlobal, useEffect, useRef, Component } from "reactn";
import Button from "@material-ui/core/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import './css/embed-code.css'

export default class AlertDialog extends Component {
  state = {
    open: false,
    code: "",
    copied: false,
    copy: "Copy"
  };

  handleClose = () => {
    this.setState({ open: false});
  };
  handleOpen = code => {
    this.setState({
      code,
      open: true,
      copy: "Copy"
    });
  };
  copyToClipBoard = () => {
    const element = this.code;
    console.log("element", element);
    document.execCommand("copy");
  };
  componentDidMount() {
    this.setGlobal({
      handleClose: this.handleClose,
      handleOpen: this.handleOpen
    });
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div
                className="card-header text-white"
                style={{
                  margin: "auto",
                  width: "90%",
                  marginTop: "20px",
                  backgroundColor: "#c9c9c9"
                }}
              >
                <span>
                  Copy the Iframe below and paste any where in your html
                </span>
              </div>
              <div
                className="cardx"
                style={{
                  margin: "auto",
                  width: "100%"
                }}
              >
                <div
                  style={{
                    width: "500px",
                    backgroundColor: "white",
                    opacity: "0.9",
                    borderRadius: "10px"
                  }}
                >
                  <div
                    style={{ margin: "auto", width: "90%", marginTop: "20px" }}
                  >
                    <div
                      className="jumbotron"
                      style={{
                        margin: "auto",
                        width: "90%",
                        marginTop: "10px"
                      }}
                    >
                      <code
                        ref={code => (this.code = code)}
                        style={{
                          margin: "auto",
                          width: "100%",
                          height: "200px",
                          borderRadius: "20px"
                        }}
                        onFocus={event => event.target.select()}
                      >
                        {this.state.code}
                      </code>
                    </div>
                    <CopyToClipboard
                      text={this.state.code}
                      onCopy={() =>
                        this.setState({ copied: true, copy: "Copied" })
                      }
                    >
                      <div
                        className="card copy-text "
                        style={{
                          backgroundColor: "#f7f7f7",
                          height: "40px",
                          padding: "5px 10px 20px 10px",
                          float: "right",
                          marginRight: 40,
                          marginTop: "20px",
                          border: "2px solid #cfcfcf"
                        }}
                      >
                        <div
                          style={{ fontSize: "18px", color: "#9c9c9c" }}
                          onClick={this.copyToClipBoard}
                        >
                          <i class="fas fa-copy"></i> {this.state.copy}
                        </div>
                      </div>
                    </CopyToClipboard>

                    <div
                      className="card cancel"
                      style={{
                        backgroundColor: "#a19f9f",
                        height: "40px",
                        width: "100px",
                        padding: "5px 10px 20px 10px",
                        float: "right",
                        marginRight: 40,
                        marginTop: "20px",
                        border: "2px solid #c9c9c9"
                      }}
                    >
                      <div
                        style={{ fontSize: "18px", color: "white" }}
                        onClick={this.handleClose}
                      >
                        <i class="fas fa-times"></i> Cancel
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
