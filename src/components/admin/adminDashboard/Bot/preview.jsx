import React, { useState, useEffect, useGlobal } from "reactn";
import EmbeddedCodeDialog from "./embed-code-dialog";
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
  const [embedeCode, setEmbedCode] = useState(false);
  const [global, setOpen] = useGlobal();

  useEffect(() => {
    setUrl(props.orgUrl);
  }, [props.orgUrl]);

  const showEmbedCode = () => {
    global.handleOpen(getEmbedScript());
  };
  return (
    <div>
      {embedeCode ? (
        <EmbeddedCodeDialog
          embedScript={getEmbedScript()}
          openDialog={embedeCode}
        />
      ) : null}
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
        >
          <div style={{ marginTop: "300px" }}>
            <button
              className="btn"
              style={{
                backgroundColor: "#65678f",
                borderRadius: "5px",
                width: "250px",
                height: "50px",
                color: "white",
                border: "2px solid #f5f5f5",
                fontStyle: "bold"
              }}
              onClick={showEmbedCode}
            >
              {"< Copy embedded code />"}
            </button>
          </div>
        </div>
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
