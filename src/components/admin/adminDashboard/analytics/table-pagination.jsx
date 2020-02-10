import React, { useState, useEffect } from "reactn";
import "./css/pagination.css";
import ReactTooltip from "react-tooltip";
let lastPage;
const Pagination = props => {
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState([]);
  const [options, setOptions] = useState(<option></option>);

  const handleChange = event => {
    props.pagify(event.target.value);
    setPage(parseInt(event.target.value, 10));
  };
  const getOptions = (noOfPages, page) => {
    if (page) {
      document.getElementById("selected").selectedIndex = page - 1;
      props.pagify(page);
      setPage(page);
    } else {
      const options = noOfPages.map((elem, index) => (
        <option value={index + 1}>{index + 1}</option>
      ));
      setOptions(options);
    }
  };
  const getNoOfPages = (limit = null) => {
    const pageLimit = limit ? limit : props.recordLimit;
    const pages = Math.ceil(props.visitors.length / pageLimit);
    const pagesArr = [];
    for (let index = 0; index < pages; index += 1) {
      pagesArr.push(index);
    }
    getOptions(pagesArr);
    setNoOfPages(pagesArr);
    lastPage = pages;
    if (!props.paginate) {
      document.getElementById("selected").selectedIndex = 0;
    }
  };
  useEffect(() => {
    getNoOfPages();
  }, [props.visitors]);

  return (
    <div>
      <div className="rows" style={{}}>
        <div
          className="columns"
          style={{
            display: "inline-block",
            width: "fit-content",
            background: "none",
            border: "none",
            fontSize: "15px",
            marginRight: "5px"
          }}
        >
          <span>
            {props.firstLast[0]
              ? `${props.firstLast[0]} - ${props.firstLast[1]} of ${props.visitors.length}`
              : ""}
          </span>
        </div>
        <div
          data-tip="Previous page"
          className={page === 1 ? "disabled columns" : "columns"}
          style={{
            display: "inline-block"
          }}
          onClick={() => {
            if (page === 1) {
              return null;
            }
            getOptions(null, page - 1);
          }}
        >
          <i
            
            disabled
            style={{ fontSize: "23px", color: "#a2a8a3"}}
            class={
              page === 1 ? "disabled fas fa-angle-left " : "fas fa-angle-left"
            }
          ></i>
        </div>
        <div
          className="columns"
          style={{
            width: "50px",
            display: "inline-block"
          }}
        >
          <div
            data-tip="Go to page"
            className=""
            style={{
              width: "fit-content",
              display: "block",
              margin: "auto",
              marginTop: "1px"
            }}
          >
            <select
              id="selected"
              style={{
                border: "0px",
                width: "fit-content",
                height: "100%",
                outline: 0,
                margin: "0px",
                color: "grey",
                background: "none",
                cursor: "pointer"
              }}
              name="pages"
              onChange={handleChange}
            >
              {options}
            </select>
          </div>
        </div>
        <div
          data-tip="Next page"
          className={page === lastPage ? "disabled columns" : "columns"}
          style={{
            display: "inline-block"
          }}
          onClick={() => {
            if (page === lastPage) {
              return null;
            }
            getOptions(null, page + 1);
          }}
        >
          <i
            style={{ fontSize: "23px", color: "#a2a8a3" }}
            class={
              page === lastPage
                ? "disabled fas fa-angle-right "
                : "fas fa-angle-right"
            }
          ></i>
        </div>
        <div
          data-tip="Number of records to display"
          className="limits"
          style={{
            display: "inline-block",
          }}
        >
          <select
            id="limited"
            style={{
              border: "0px",
              width: "37px",
              height: "100%",
              outline: 0,
              margin: "0px",
              background: "none",
              cursor: "pointer"
            }}
            name="pages"
            onChange={event => {
              props.changeLimit(event.target.value);
              props.fetchVisits(null, event.target.value, "pagify");
              props.setOffset(1);
              document.getElementById("selected").selectedIndex = 0;
              getNoOfPages(event.target.value);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
            <option value={60}>100</option>
          </select>
        </div>
      </div>
      <ReactTooltip />
    </div>
  );
};
export default Pagination;
