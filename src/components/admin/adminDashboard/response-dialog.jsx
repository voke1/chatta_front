import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { Component } from "react";

class DialogBox extends Component {
  state = {
    openDialog: true
  };

  handleClose = () => {
    this.setState({
      openDialog: false
    });
  };

  render() {

    return this.state.openDialog ? (
      <div>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Bot response</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Response"
              type="text"
              value={this.props.response}
              fullWidth
              style={{ width: "420px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : null;
  }

  componentWillReceiveProps(props) {
    this.setState({
      openDialog: props.open
    });
  }
}

export default DialogBox;
