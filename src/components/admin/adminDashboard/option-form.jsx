import React, { Component, useState } from "react";
import Accordion from "./accordion";
const initialResponses = [];
const OptionBox = () => {
  const [responses, setResponses] = useState([]);
  const [response, setResponse] = useState("");
  const [inputVal, setInputVal] = useState("");
  const handleClick = async res => {
    initialResponses.push(response);
    setResponses(initialResponses);
    setInputVal("");
  };
  return (
    <div
      style={{
        marginLeft: "40px",
        marginRight: "100px"
      }}
      className="form-group"
    >
      {responses.map(res => (
        <Accordion res={res} key={res} />
      ))}
      <div className="form-inline">
        <input
          className="form-control"
          placeholder="Enter response"
          name="response"
          onChange={e => {
            setResponse(e.target.value);
            setInputVal(e.target.value);
          }}
          value={inputVal}
          style={{ width: "72%" }}
        ></input>
        <div style={{ width: "10%", marginLeft: "3px" }}>
          <button
            className="add-response"
            type="button"
            onClick={handleClick}
            style={{
              width: "67px",
              height: "37px",
              color: "#141473",
              backgroundColor: "#f0f0f5",
              borderRadius: 5
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionBox;
