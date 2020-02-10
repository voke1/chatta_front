import React, { useState, useEffect, setGlobal } from "reactn";

const SearchBox = props => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    setGlobal({ clearSearch: setTerm });
  }, []);

  return (
    <div class="main">
      <div class="form-group has-search">
        <i
          style={{ color: "#BDA3C2" }}
          class="fas fa-search form-control-feedback"
        ></i>
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          value={term}
          onChange={event => {
            setTerm(event.target.value);
            props.handleSearch(event.target.value);
          }}
        ></input>
      </div>
    </div>
  );
};

export default SearchBox;
