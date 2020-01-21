import React, { useState, useGlobal, setGlobal} from "reactn";
import ReactTooltip from "react-tooltip";
import "./css/bot-ui-template.css";
const Options = props => {
  const [saveClass, setSaveClass] = useState("");
  const [showImportOverlay] = useGlobal("showImportOverlay");
  const [showExportOverlay] = useGlobal("showExportOverlay");
  const defaultHandler = () => {};
  return (
    <div className="options">
      <div style={{ marginRight: "20px" }} className={props.saveClass}>
        {" "}
        <i
          className={`fas fa-arrow-left ${
            props.disabledButtons.previous ? "disable-button" : ""
          }`}
          data-tip="Previous"
          style={{
            color: "grey",
            fontSize: "21px",
            cursor: "pointer",
            marginLeft: "20px"
          }}
          onClick={props.handlePrevious}
        ></i>
        <i
          className={`fas fa-arrow-right ${
            props.disabledButtons.next ? "disable-button" : ""
          }`}
          data-tip="Next"
          style={{
            color: "grey",
            fontSize: "21px",
            cursor: "pointer",
            marginLeft: "20px"
          }}
          onClick={props.handleNext || defaultHandler}
        ></i>
        <i
          className={`fas fa-undo ${
            props.disabledButtons.undo ? "disable-button" : ""
          }`}
          data-tip="Undo"
          style={{
            color: "grey",
            fontSize: "21px",
            cursor: "pointer",
            marginLeft: "20px"
          }}
          onClick={props.saveTemplate}
        ></i>
        <i
          className={`fas fa-redo ${
            props.disabledButtons.redo ? "disable-button" : ""
          }`}
          data-tip="Redo"
          style={{
            color: "grey",
            fontSize: "21px",
            cursor: "pointer",
            marginLeft: "20px"
          }}
          onClick={props.saveTemplate}
        ></i>
        <i
          className={`fas fa-file-import ${
            props.disabledButtons.import ? "disable-button" : ""
          }`}
          data-tip="Import Template"
          style={{
            color: "grey",
            fontSize: "21px",
            cursor: "pointer",
            marginLeft: "20px"
          }}
          onClick={() => {
            showImportOverlay(true);
          }}
        ></i>
        <i
          className={`fas fa-file-export ${
            props.disabledButtons.export ? "disable-button" : ""
          }`}
          data-tip="Export Template"
          style={{
            color: "grey",
            fontSize: "21px",
            cursor: "pointer",
            marginLeft: "20px"
          }}
          onClick={() => {
            showExportOverlay(true);
            setGlobal({template: props.template})
          }}
        ></i>
        <i
          className={`fas fa-cloud-upload-alt ${
            props.disabledButtons.deploy ? "disable-button" : ""
          }`}
          data-tip="Deploy Bot"
          style={{
            color: "grey",
            fontSize: "27px",
            cursor: "pointer",
            marginLeft: "20px"
          }}
          onClick={props.saveTemplate}
        ></i>
      </div>
      <ReactTooltip />
    </div>
  );
};

export default Options;
