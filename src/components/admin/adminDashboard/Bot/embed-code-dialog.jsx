import React, { setGlobal, useEffect } from "reactn";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = code => {
    setCode(code);
    setOpen(true);
  };
  setGlobal({ handleClose, handleOpen });
  useEffect(() => {
    setGlobal({ handleOpen: handleOpen });
  }, [props.openDialog]);
  return (
    <div>
      <Dialog
        open={open}
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
                      style={{
                        margin: "auto",
                        width: "100%",
                        height: "200px",
                        borderRadius: "20px"
                      }}
                      onFocus={event => event.target.select()}
                    >
                      {code}
                    </code>
                  </div>
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#f7f7f7",
                      height: "40px",
                      width: "90px",
                      padding: "5px 10px 20px 10px",
                      float: "right",
                      marginRight: 40,
                      marginTop: "20px",
                      border: "2px solid #cfcfcf"
                    }}
                  >
                    <div style={{ fontSize: "18px", color: "#9c9c9c" }}>
                      <i class="fas fa-copy"></i> Copy
                    </div>
                  </div>
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#a19f9f",
                      height: "40px",
                      width: "100px",
                      padding: "5px 10px 20px 10px",
                      float: "right",
                      marginRight: 40,
                      marginTop: "20px",
                      border: "2px solid #cfcfcf"
                    }}
                  >
                    <div
                      style={{ fontSize: "18px", color: "white" }}
                      onClick={handleClose}
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
