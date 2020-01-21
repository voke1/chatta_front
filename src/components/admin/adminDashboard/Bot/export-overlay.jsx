import React, { useState, setGlobal, useGlobal } from "reactn";
import Modal from "react-bootstrap/Modal";
import * as apiService from "../../../../services/apiservice";
import "./css/export-overlay.css";
const ExportOverlay = () => {
  const [show, setShow] = useState(false);
  const [disable, disableButton] = useState(true)
  const [templateName, setTemplatename] = useState("");
  const [setNotification] = useGlobal("setNotification");
  const [showBusyOverlay] = useGlobal("showBusyOverlay");
  const [importTemplate] = useGlobal("importTemplate");
  const [template] = useGlobal("template");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  setGlobal({
    handleClose,
    showExportOverlay: handleShow
  });
  const handleChange = event => {
    setTemplatename(event.target.value);
    if(event.target.value.length === 0) {
        disableButton(true)
    }
    else {
        disableButton(false)
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    setNotification("yes", "Exporting...");
    showBusyOverlay(true);
    handleClose();
    // setTemplates(template);
    apiService
      .post("template", { templateName, template })
      .then(res => {
        importTemplate();
        setTimeout(() => {
          setNotification("yes", "Exported successfully");
          showBusyOverlay(false);
        }, 4000);
      })
      .catch(err => {
        setNotification("yes", err.message);
        showBusyOverlay(false);
        console.log(err);
      });
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <div className="export">
          <div className="close-button-export" onClick={handleClose}>
            <i class="fas fa-times"></i>
          </div>{" "}
          <div className="container" style={{ background: "none" }}>
            <form className="text-center m-t-30">
              <div className="md-form" style={{ margin: "0px" }}>
                <input
                  name="templateName"
                  type="text"
                  className="form-control"
                  id="templateName"
                  placeholder="Template Name"
                  value={templateName}
                  onChange={handleChange}
                ></input>
              </div>
              <div style={{ float: "right", margin: "0px" }}>
                <button
                  className="btn btn-sm"
                  style={{
                    borderRadius: "5px",
                    color: "white",
                    background: "#444753"
                  }}
                  onClick={handleSubmit}
                  disabled={disable}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExportOverlay;
