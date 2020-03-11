import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { Component } from "reactn";

class DialogBox extends Component {
  state = {
    openDialog: true
  };

  handleClose = () => {
    this.setState({
      openDialog: false
    });
    this.global.closeDialog();
  };
  handleDelete = () => {
    this.global.modify(this.global.key, this.global.options);
    this.global.closeDialog();
    setTimeout(() => {
      this.setState({
        openDialog: false
      });
    }, 10);
  };
  render() {
    return this.state.openDialog ? (
      <div>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div style={{ backgroundColor: "#fff0f1" }}>
            <DialogTitle id="form-dialog-title" style={{ color: "#42423c" }}>
              Delete Option
            </DialogTitle>
            <DialogContent>
              <span style={{ fontSize: 16 }}>
                You are about to delete this option from every conversation.
                Continue anyway ?
              </span>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleDelete}
                color="primary"
                style={{
                  fontSize: 17,
                  textTransform: "capitalize",
                  color: "#7183ad"
                }}
              >
                DELETE
              </Button>
              <Button
                onClick={this.handleClose}
                color="primary"
                style={{
                  color: "#3e5a9c",
                  textTransform: "capitalize",
                  fontSize: 17
                }}
              >
                CANCEL
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    ) : null;
  }

  componentDidMount() {
    this.setState({
      openDialog: true
    });
  }
}

export default DialogBox;
