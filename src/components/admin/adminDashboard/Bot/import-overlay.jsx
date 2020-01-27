import React, { useState, useEffect, setGlobal, useGlobal } from "reactn";
import "./css/import-overlay.css";
import BotBody from "./bot-body";
import Template from "./constants/templates";
import * as ApiService from "../../../../services/apiservice";

const ImportOverlay = props => {
  const [action, setAction] = useState("hide-overlay");
  const [selected, setSelected] = useState("");
  const [templates, setTemplates] = useState(Template);
  const [activeTemplate, setActiveTemplate] = useState(templates[0].template);
  const [animate, setAnimate] = useState(false);
  const [setDefaultTemplate, setSetDefaultTemplate] = useState(false);
  const [showBusyOverlay, setShowBusyOverlay] = useGlobal("showBusyOverlay");
  const [setBusyNotification] = useGlobal("setBusyNotification");
  const [setNotification] = useGlobal("setNotification");
  const showOverlay = show => {
    if (show) {
      setAction("show-overlay");
    } else {
      setAction("hide-overlay");
    }
  };
  const importTemplate = () => {
    ApiService.get("template")
      .then(res => {
        console.log("template id", res[0]._id);
        setActiveTemplate(res[0].template);
        setSelected(res[0]._id);
        setTemplates(res);
      })
      .catch(err => console.log(err.message));
  };
  useEffect(() => {
    importTemplate();
  }, []);

  setGlobal({ showImportOverlay: showOverlay, setTemplates, importTemplate });

  return (
    <div>
      <div className={action}>
        <div className="overlay-content row">
          <div className="col-md-3 column">
            <div className="template">
              <div className="list">
                {templates.map(template => (
                  <div
                    key={template._id}
                    className={` ${
                      selected === template._id
                        ? "selected-template"
                        : "template-title"
                    }`}
                    onClick={() => {
                      setActiveTemplate(template.template);
                      setAnimate(true);
                      setSelected(template._id);
                    }}
                  >
                    <span key={template._id}> {template.templateName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div
              className="close-button"
              style={{
                float: "right",
                color: "grey",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => {
                showOverlay(false);
              }}
            >
              <i class="fas fa-times"></i>
            </div>
            <div className="preview">
              
                <BotBody
                  animate={animate}
                  setAnimate={setAnimate}
                  activeTemplate={activeTemplate}
                />
              <div className="buttons">
                <div style={{ float: "left" }}>
                  <button
                    className="btn btn-sm"
                    style={{
                      background: "grey",
                      color: "white",
                      borderRadius: "5px",
                      fontWeight: "bold"
                    }}
                    onClick={() => {
                      showOverlay(false);
                    }}
                  >
                    CANCEL
                  </button>
                </div>
                <div style={{ float: "right" }}>
                  <button
                    className="btn btn-sm"
                    style={{
                      background: "#297260",
                      color: "white",
                      borderRadius: "5px",
                      fontWeight: "bold"
                    }}
                    onClick={async () => {
                      showBusyOverlay(true);
                      setNotification("yes", "Processing...");
                      await setSetDefaultTemplate(true);
                      setGlobal({
                        activeTemplate: activeTemplate,
                        setDefaultTemplate: setSetDefaultTemplate,
                        setSetDefaultTemplate: setSetDefaultTemplate
                      });
                    }}
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImportOverlay;
