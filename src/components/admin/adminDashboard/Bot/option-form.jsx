import React, { useState, useEffect } from "react";
import { setGlobal, useGlobal } from "reactn";
import Accordion from "./accordion";
import uuid from "uuid/v1";

let initialResponses = [];
let identities = [];
let initialTree;
let newTreeArray;
let fallbackTree;
let DelayPromptTree;

const OptionBox = props => {
  console.log("props from option box", props.chatTree);

  const [responses, setResponses] = useState([]);
  const [response, setResponse] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useGlobal("disableButton");
  const [enableButton, setEnableButton] = useGlobal("enableButton");
  const [buttonText, setButtonText] = useGlobal("setButtonText");
  const [rendered, setRendered] = useState(false);

  // runs when components mounts
  useEffect(() => {
    if (props.chatTree) {
      identities = props.chatTree.tree.slice(1, props.chatTree.tree.length - 2);
      initialTree = props.chatTree.tree[0];
      fallbackTree = props.chatTree.tree[props.chatTree.tree.length - 2];
      DelayPromptTree = props.chatTree.tree[props.chatTree.tree.length - 1];

      console.log("it is our new array", newTreeArray);
      props.chatTree.tree[0].response.buttons.forEach(button => {
        const body = {
          key: button.key,
          botKey: button.key,
          val: button.val,
          identity: props.chatTree.tree[0].identity
        };
        if (!initialResponses.indexOf(body) > -1) {
          initialResponses.push(body);
        }
      });

      newTreeArray = [
        initialTree,
        ...identities,
        fallbackTree,
        DelayPromptTree
      ];
      if (!rendered) {
        setResponses(initialResponses);
      }
      setRendered(true);
    }
  }, [props.chatTree]);

  // runs when component is unmounted
  useEffect(() => {
    return () => {
      initialResponses = [];
      identities = [];
      initialTree = null;
      newTreeArray = null;
      fallbackTree = null;
      DelayPromptTree = null;
    };
  }, []);
  /*
  Algorithm
  1 Delete a button (from response.buttons)
  2 Search the tree for a conversation whose identity corresponds to the button.key (deleted in 1)
  3.Get the array of the buttons from the convo found in 2 and delete convo.
  4.For each button found in 3, repeat step 2
  */

  const findAndDelete = botId => {
    /*
    first check if deleted option serves as an option for fallback or delay prompt message.
    If so, remove them from delayprompt and/Or fallback options
    */
    //delete option from fallback options
    if (newTreeArray[newTreeArray.length - 2]) {
      const fallbackButtons =
        newTreeArray[newTreeArray.length - 2].response.buttons;
      for (let index = 0; index < fallbackButtons.length; index++) {
        if (fallbackButtons[index].key === botId) {
          fallbackButtons.splice(index, 1);
          break;
        }
      }
    }
    //delete options from delayprompt options
    if (newTreeArray[newTreeArray.length - 1]) {
      const delaypromptButtons =
        newTreeArray[newTreeArray.length - 1].response.buttons;
      for (let index = 0; index < delaypromptButtons.length; index++) {
        if (delaypromptButtons[index].key === botId) {
          delaypromptButtons.splice(index, 1);
          break;
        }
      }
    }
    let optionButtons = [];

    const convo = identities.filter(convo => convo.identity === botId);
    if (convo.length) {
      const buttons = convo[0].response.buttons;
      identities.splice(identities.indexOf(convo[0]), 1); // deletes convo
      buttons.forEach(button => optionButtons.push(button));
    }
    for (let index = 0; index < optionButtons.length; index++) {
      const convoTree = identities.filter(
        convo => convo.identity === optionButtons[index].key
      );
      if (convoTree.length) {
        const buttons = convoTree[0].response.buttons;
        identities.splice(identities.indexOf(convoTree[0]), 1);
        buttons.forEach(button => optionButtons.push(button));
      }
    }
  };

  const findAndEdit = (botId, text) => {
    if (newTreeArray[newTreeArray.length - 2]) {
      const fallbackButtons =
        newTreeArray[newTreeArray.length - 2].response.buttons;
      for (let index = 0; index < fallbackButtons.length; index++) {
        if (fallbackButtons[index].key === botId) {
          fallbackButtons[index].val = text;
          break;
        }
      }
    }
    //edit options in delayprompt options
    if (newTreeArray[newTreeArray.length - 1]) {
      const delaypromptButtons =
        newTreeArray[newTreeArray.length - 1].response.buttons;
      for (let index = 0; index < delaypromptButtons.length; index++) {
        if (delaypromptButtons[index].key === botId) {
          delaypromptButtons[index].val = text;
          break;
        }
      }
    }
  };
  /*
  syncTree function builds the chat tree including also the fallback and delay prompt body
  */
  function syncTree(tree, initial, message, option) {
    if (message) {
      if (message.type === "fallback") {
        const fallback = {
          identity: "empty",
          prompt:
            "Sorry I don't understand what you said. Would you like to know about the following?",
          response: {
            buttons: [{ key: message.botKey, val: message.response }],
            text: ""
          }
        };
        if (fallbackTree && !message.fallback) {
          const options = fallbackTree.response.buttons;
          const isFound = options.filter(
            fallback => fallback.key === message.botKey
          );
          if (isFound.length) {
            const index = options.indexOf(isFound[0]);
            options.splice(index, 1);
          }
        } else {
          if (fallbackTree) {
            fallbackTree.response.buttons.push({
              key: message.botKey,
              val: message.response
            });
          } else {
            fallbackTree = fallback;
          }
        }
      }
      // set delay prompt
      if (message.type === "delayprompt") {
        const delayprompt = {
          identity: "delay_prompt",
          prompt:
            "Hello, are you still there?... You can check out the various types of life insurance we offer:",
          response: {
            buttons: [{ key: message.botKey, val: message.response }],
            text: ""
          }
        };
        if (DelayPromptTree && !message.delayprompt) {
          const options = DelayPromptTree.response.buttons;
          const isFound = options.filter(
            delayprompt => delayprompt.key === message.botKey
          );
          if (isFound.length) {
            const index = options.indexOf(isFound[0]);
            options.splice(index, 1);
          }
        } else {
          if (DelayPromptTree) {
            DelayPromptTree.response.buttons.push({
              key: message.botKey,
              val: message.response
            });
          } else {
            DelayPromptTree = delayprompt;
          }
        }
      }
    } else if (initial) {
      initialTree = initial;
    } else {
      const isFound = identities.filter(
        botTree => tree.identity === botTree.identity
      );
      if (isFound.length) {
        const index = identities.indexOf(isFound[0]);
        if (option) {
          identities[index].response.buttons = tree.response.buttons;
          if (option.action === "delete") {
            findAndDelete(option.botId);
          }
          if (option.action === "edit") {
            findAndEdit(option.botId, option.text);
          }
        } else {
          identities[index].response.buttons.push(
            tree.response.buttons[tree.response.buttons.length - 1]
          );
        }
      } else {
        identities.push(tree);
      }
    }
    newTreeArray = [initialTree, ...identities, fallbackTree, DelayPromptTree];
    props.tree([newTreeArray]);
    if (fallbackTree && DelayPromptTree) {
      console.log(fallbackTree.response.buttons.length);
      if (
        fallbackTree.response.buttons.length &&
        DelayPromptTree.response.buttons.length
      ) {
        enableButton(fallbackTree, DelayPromptTree);
      } else {
        disableButton(fallbackTree, DelayPromptTree);
      }
    } else disableButton(fallbackTree, DelayPromptTree);
  }

  const modifyOption =  async (botId, action) => {
    if (action.type === "delete") {
      const convoButtons = newTreeArray[0].response.buttons;
      for (let index = 0; index < convoButtons.length; index++) {
        if (convoButtons[index].key === botId) {
          convoButtons.splice(index, 1);
          break;
        }
      }
      findAndDelete(botId, convoButtons);
      // updates the chat UI
      const responseArray = initialResponses.filter(
        response => response.botKey === botId
      );
      initialResponses.splice(initialResponses.indexOf(responseArray[0]), 1);
      setResponses(initialResponses);
    }
    if (action.type === "edit") {
      const convoButtons = newTreeArray[0].response.buttons;
      for (let index = 0; index < convoButtons.length; index++) {
        if (convoButtons[index].key === botId) {
          convoButtons[index].val = action.text;
          break;
        }
      }
      findAndEdit(botId, action.text);
      // update UI
      const responseArray = initialResponses.filter(
        response => response.key === botId
      );
      responseArray[0].val = action.text;
      setResponses(initialResponses);
    }
    if (!props.chatTree) {
      props.getTab();
    }
    newTreeArray = [initialTree, ...identities, fallbackTree, DelayPromptTree];
    setGlobal({ chatTree: newTreeArray });
    props.tree([newTreeArray]);
  };
  setGlobal({
    syncTree,
    modifyOption: modifyOption,
    findAndEdit
  });
  const checkDuplicate = (event, target) => {
    if (!target) {
      const isFound = initialResponses.filter(
        response =>
          response.val.trim().toLowerCase() ===
          event.target.value.trim().toLowerCase()
      );

      if (isFound.length) {
        let message;
        if (event.target.value.length > 30) {
          message = event.target.value.substr(0, 30) + "...";
        } else message = event.target.value;
        return {
          success: false,
          message: `"${message}" already exists as an option`
        };
      }
      return {
        success: true,
        message: ""
      };
    }
  };
  const handleChange = e => {
    setResponse(e.target.value);
    setInputVal(e.target.value);
    const validation = checkDuplicate(e);
    setValidated(validation.success);
    setMessage(validation.message);
    if (e.target.value.length === 0) {
      setValidated(false);
    }
  };

  const identity = uuid();
  const handleClick = async res => {
    const key = uuid();
    initialResponses.push({
      key,
      botKey: key,
      val: response,
      identity
    });
    setResponses(initialResponses);
    setInputVal("");
    setValidated(false);
    const botTree = {
      identity,
      prompt: props.prompt,
      response: {
        buttons: [{ key, val: response }],
        text: ""
      }
    };
    if (initialTree) {
      initialTree.response.buttons.push({ key, val: response });
    } else {
      initialTree = botTree;
    }
    syncTree(null, initialTree);
  };

  return (
    <div
      style={{
        marginLeft: !props.marginLeft ? "40px" : props.marginLeft,
        marginRight: "100px"
      }}
      className="form-group"
    >
      {responses.map(res => (
        <Accordion
          res={res.val}
          key={res.key}
          botKey={res.botKey}
          syncTree={syncTree}
          identity={res.identity}
          modifyOption={modifyOption}
        />
      ))}

      <div className="form-inline md-form mt-3">
        <input
          className="form-control"
          placeholder="Enter response"
          name="response"
          onChange={handleChange}
          value={inputVal}
          style={{ width: "40%" }}
        ></input>

        <div style={{ marginLeft: "3px" }}>
          <button
            className="btn btn-sm"
            type="button"
            onClick={handleClick}
            style={{ backgroundColor: "#d0e4f2", color: "#3c3e40" }}
            disabled={!validated}
          >
            Add
          </button>
        </div>
      </div>
      {message ? (
        <div
          className="animated shake"
          style={{ float: "left", marginLeft: "10px", color: "red" }}
        >
          <p>{message}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OptionBox;


