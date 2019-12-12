import React, { useState, useEffect } from "reactn";
import ChatComponent from "../../../front/chat/chat.component";
import previewBackground from "../../../../preview_background.jpg";
const BotPreview = props => {
  const getEmbedScript = url => {
    return `<iframe src="${props.orgUrl}" frameborder="0" style="background-color:transparent;
    position:fixed;
    z-index:1000000000000000000000000000050000;
    bottom:2%;
    height:600px;
    width:600px;
    right: 0px !important;"></iframe>`;
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
