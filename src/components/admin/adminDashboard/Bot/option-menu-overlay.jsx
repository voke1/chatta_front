import React, { useState } from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import "./css/option-menu.css";

const Example = props => {
  const [fallback, setFallback] = useState(false);
  const [delayprompt, setDelayPrompt] = useState(false);
  const handleCheck = event => {
    if (event.target.name === "fallback") {
      setFallback(!fallback);
      props.syncTree(null, null, {
        type: event.target.id,
        botKey: props.botKey,
        response: props.res,
        fallback: !fallback
      });
    }
    if (event.target.name === "delayprompt") {
      setDelayPrompt(!delayprompt);
      props.syncTree(null, null, {
        type: event.target.id,
        botKey: props.botKey,
        response: props.res,
        delayprompt: !delayprompt
      });
    }
  };
  return (
    <OverlayTrigger
      trigger="click"
      placement="right"
      overlay={
        <Popover id="popover-basic">
          <div className="animated">
            <Popover.Title as="h3">Menu</Popover.Title>
            <div className="option">
              <Popover.Content>
                <i class="fas fa-pen"></i>{" "}
                <span style={{ marginLeft: "5px" }}>Edit</span>
              </Popover.Content>
            </div>
            <div className="option">
              <Popover.Content>
                <i class="fas fa-trash"></i>{" "}
                <span style={{ marginLeft: "5px" }}>Delete</span>
              </Popover.Content>
            </div>
            <div className="option">
              <Popover.Content>
                <i class="fas fa-plus"></i>{" "}
                <span style={{ marginLeft: "5px" }}>Add</span>
              </Popover.Content>
            </div>

            <div className="option">
              <Popover.Content>
                <input
                  type="checkbox"
                  id="fallback"
                  name="fallback"
                  checked={fallback}
                  onChange={handleCheck}
                />
                <label
                  for="fallback"
                  style={{ marginLeft: "5px", color: "none" }}
                >
                  Set As Fallback{" "}
                </label>
              </Popover.Content>
            </div>
            <div className="option">
              <Popover.Content>
                <input
                  id="delayprompt"
                  type="checkbox"
                  name="delayprompt"
                  checked={delayprompt}
                  onChange={handleCheck}
                />
                <label
                  for="delayprompt"
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                >
                  Set As Delay Prompt{" "}
                </label>
              </Popover.Content>
            </div>
          </div>
        </Popover>
      }
      rootClose={true}
    >
      <i class="fas fa-ellipsis-v grey-text icons"></i>
    </OverlayTrigger>
  );
};
export default Example;
