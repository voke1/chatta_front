import React from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Options</Popover.Title>
    <Popover.Content>
      <i class="fas fa-pen"></i> <span style={{marginLeft: "5px"}}>Edit</span>
    </Popover.Content>
    <Popover.Content>
      <i class="fas fa-trash"></i> <span style={{marginLeft: "5px"}}>Delete</span>
    </Popover.Content>
    <Popover.Content>
      <i class="fas fa-plus"></i> <span style={{marginLeft: "5px"}}>Add</span>
    </Popover.Content>
    <Popover.Content>
      <i class="fas fa-save"></i> <span style={{marginLeft: "5px"}}>Set As </span>
    </Popover.Content>
  </Popover>
);

const Example = () => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose={true}>
    <i class="fas fa-ellipsis-v black-text"></i>
  </OverlayTrigger>
);
export default Example;
