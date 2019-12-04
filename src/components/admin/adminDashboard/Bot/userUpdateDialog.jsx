import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Update BOT Settings?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            User Profile successfully updated
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeDialog} color="primary" autoFocus>
            OKAY
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
