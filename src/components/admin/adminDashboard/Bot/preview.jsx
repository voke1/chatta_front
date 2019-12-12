import React, { useState, useEffect } from "reactn";
import ChatComponent from "../../../front/chat/chat.component";
import previewBackground from "../../../../preview_background.jpg";
const BotPreview = props => {
  const getEmbedScript = url => {
    return `<iframe src=${props.orgUrl} style="bottom: 34px;
        right: 34px;
        position: fixed;
        padding: 12px 14px 11px; 
       color: white;
       cursor: pointer; 
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 10px 0px;
        border: none;
        border-radius: 50%;
        z-index: 12893128000000000000000000;
        outline: none;
        opacity: 1;"></iframe>`;
  };

  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(props.orgUrl);
    console.log("embedded script", getEmbedScript(url));
  }, [props.orgUrl]);

  return (
    <div>
      <div
        className="card "
        style={{ padding: "none", backgroundColor: "#E0F3FD" }}
      >
        <div
          id="prev_div"
          style={{
            color: "black",
            position: "absolute",
            left: "0px",
            height: "100%",
            width: "40%"
          }}
        ></div>
        <iframe
          src={url}
          height="600px"
          style={{
            border: "4px dashed #95D3FF"
          }}
        ></iframe>
      </div>
    </div>
  );
};
export default BotPreview;
