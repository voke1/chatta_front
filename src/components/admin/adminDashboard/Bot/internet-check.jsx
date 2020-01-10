import React from "reactn";

const InternetCheck = () => {
  return (
    <div>
      <div
        className="containerx"
        style={{
          position: "absolute",
          left: "40%",
          top: 10,
          display: "block",
          background: "none"
        }}
      >
        <div
          className="row"
          style={{
            width: "350px",
            height: "40px",
            background: "#FEEFF4",
            borderRadius: "29px"
          }}
        >
          <div className="col-md-1">
            <i
              class="fas fa-exclamation-circle"
              style={{
                fontSize: "20px",
                color: "#553C3C",
                marginTop: "10px"
              }}
            ></i>
          </div>
          <div className="col-md-10" style={{ padding: 0 }}>
            <div
              style={{
                marginTop: "10px",
                marginLeft: "40px",
                color: "black"
              }}
            >
              <span>Please check your Internet connection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetCheck;
