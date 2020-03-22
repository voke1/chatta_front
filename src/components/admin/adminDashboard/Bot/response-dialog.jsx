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
    openDialog: true,
    option: "",
    response: "",
  };

  handleClose = () => {
    this.setState({
      openDialog: false
    });
    this.global.closeEditDialog();
  };
  handleSave = () => {
    this.setState({
      openDialog: false
    });
    this.global.closeEditDialog();
    this.global.modify(this.global.key, {
      type: "edit",
      text: this.state.response
    });
  };
  handleChange = e => {
    this.setState({ response: e.target.value });
  };

  render() {
    return this.state.openDialog ? (
      <div>
        {console.log("dialogstate", this.state.openDialog)}
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit option</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Option"
              type="text"
              value={this.state.response}
              onChange={this.handleChange}
              name="response"
              fullWidth
              style={{ width: "420px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : null;
  }

  // componentWillReceiveProps(props) {
  //   this.setState({
  //     openDialog: props.open
  //   });
  // }

  componentDidMount() {
    this.setState({
      response: this.props.response
    });
  }
}

export default DialogBox;
