import React, { Component, useState } from "react";
import Accordion from "./accordion";
import uuid from "uuid/v1";
const initialResponses = [];
const identities = [];
let initialTree;
const syncTree = tree => {
  const isFound = identities.filter(
    botTree => tree.identity === botTree.identity
  );
  if (isFound.length > 0) {
    const index = identities.indexOf(isFound[0]);
    identities[index].response.buttons.push(
      tree.response.buttons[tree.response.buttons.length - 1]
    );
  } else {
    identities.push(tree);
  }
  const newTreeArray = [initialTree, ...identities];
  console.log("this is tree", newTreeArray);
};
const OptionBox = props => {
  const [responses, setResponses] = useState([]);
  const [response, setResponse] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [trees, setTree] = useState([]);
  const key = uuid();
  const handleClick = async res => {
    const botKeys = uuid();
    initialResponses.push({ key, val: response, identity: botKeys });
    setResponses(initialResponses);
    setInputVal("");
    const botTree = {
      identity: botKeys,
      prompt: props.prompt,
      response: {
        buttons: [{ key: botKeys, val: response }],
        text: ""
      }
    };
    if (initialTree) {
      initialTree.response.buttons.push({ key, val: response });
    } else {
      initialTree = botTree;
    }

    props.tree(initialTree);
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
        <Accordion
          res={res.val}
          key={res.key}
          syncTree={syncTree}
          identity={res.identity}
        />
      ))}

      <div className="form-inline md-form mt-3">
        <input
          className="form-control"
          placeholder="Enter response"
          name="response"
          onChange={e => {
            setResponse(e.target.value);
            setInputVal(e.target.value);
          }}
          value={inputVal}
          style={{ width: "40%" }}
        ></input>
        <div style={{ marginLeft: "3px" }}>
          <button
            className="btn btn-sm"
            type="button"
            onClick={handleClick}
            style={{ backgroundColor: "#d0e4f2", color: "#3c3e40" }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionBox;
