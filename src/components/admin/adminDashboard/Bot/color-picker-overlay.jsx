import React, { useState } from "reactn";
import { SketchPicker } from "react-color";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const ColorPickerOverlay = props => {
  const [color, setColor] = useState(props.defaultColor);
  

  const handleChangeComplete = color => {
    console.log("changing", color)
    setColor(color.hex);
    props.buildTemplate(null, { name: props.name, value: color.hex, });
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="left"
      overlay={
        <Popover id="popover-basic">
          <div className="animated">
            <SketchPicker
              color={color}
              onChangeComplete={handleChangeComplete}
            />
          </div>
        </Popover>
      }
      rootClose={true}
    >
      <div
        style={{
          backgroundColor: props.defaultColor,
          height: "12px",
          width: "12px",
          marginTop: 7,
          border: "0.64px solid grey"
        }}
        onClick={event => {
          // event.stopPropagation();
          // this.onSelect("botOnline");
        }}
      ></div>
    </OverlayTrigger>
  );
};
export default ColorPickerOverlay;
