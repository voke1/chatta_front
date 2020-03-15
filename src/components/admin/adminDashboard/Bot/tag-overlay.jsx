import React, { useState, useEffect, useRef, useGlobal } from "reactn";
import "./css/tag-overlay.css";

const TagOverlay = props => {
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const scrollBar = document.getElementById("chat_bottom");

  const handleSubmit = event => {
    event.preventDefault();
    const optionTags = [...tags];

    if (
      inputTag.length &&
      !optionTags.filter(tag => tag.tag === inputTag).length
    ) {
      optionTags.push({
        tag: inputTag
      });
      setTags(optionTags);
      setInputTag("");
      scrollBar.scrollIntoView();
      if (scrollBar) {
        console.log("yes");
        setTimeout(() => {
          scrollBar.scrollIntoView({
            behavior: "smooth"
          });
        }, 10);
      }
    }
  };
  const handleTagDelete = (index, deleteAll) => {
    if (deleteAll) {
      setTags([]);
    } else {
      const optionTags = [...tags];
      optionTags.splice(index, 1);
      setTags(optionTags);
    }
  };
  return (
    <div>
      <div className="show-conversation-overlay ">
        <div className="tag-overlay-content">
          <div>
            <i className="fas fa-close"></i>
          </div>
          <div className="tag-input">
            <form
              className="text-center m-t-30"
              action="submit"
              onSubmit={handleSubmit}
            >
              <div className="tag-form">
                <input
                  name="tag"
                  form-control
                  type="text"
                  className="form-controlw"
                  placeholder="Enter your tag"
                  value={inputTag}
                  onChange={event => {
                    setInputTag(event.target.value);
                  }}
                ></input>

                <button>
                  <i
                    className={
                      inputTag === "" ? "fa fa-plus disabled" : "fa fa-plus"
                    }
                  ></i>
                </button>
              </div>
            </form>
          </div>
          <div className="all-tags">
            {tags.map((oneTag, index) => (
              <div className="one-tag animated fadeIn">
                <span>{oneTag.tag}</span>

                <i
                  className="fas fa-close"
                  onClick={() => {
                    handleTagDelete(index);
                  }}
                ></i>
              </div>
            ))}
            <div id="chat_bottom"></div>
          </div>
          <div className="option-buttons">
            <div className="save-tag">
              <i className={tags.length ? "fa fa-check" : ""}></i>{" "}
              <span>{tags.length ? "Save" : "Close"}</span>
            </div>
          </div>
          <div className="option-buttons">
            <div
              className={tags.length ? "save-tag" : "save-tag disabled"}
              onClick={() => handleTagDelete(null, true)}
            >
              <i className="fa fa-close"></i> <span>Clear all</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TagOverlay;
