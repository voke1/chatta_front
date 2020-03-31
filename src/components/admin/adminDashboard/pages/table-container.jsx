import React, { Component } from "react";
import TablePagination from "./table-pagination";
import AllVisitsTable from "./all-visits-table";
import ProgressBar from "../Authentication/progressbar";
const TableContainer = props => {
  console.log("visitorss", props);
  return (
    <div style={{ height: "fit-content" }}>
      <div
        style={{
          height: "35px",
          borderBottom: "1px solid #e6e7e8",
          marginBottom: 10
        }}
      >
        <div
          style={{
            display: "inline",
            float: "left",
            padding: "5px",
            marginLeft: "8px"
          }}
        >
          <span
            style={{
              color: "#639094",
              fontWeight: "500",
              fontSize: "15px"
            }}
          >
            All Visits
          </span>
        </div>
        <div style={{ float: "right", marginTop: "5px", display: "inline" }}>
          {props.recordLimit ? (
            <TablePagination
              pagify={props.pagify}
              visitors={props.visitors}
              recordLimit={props.recordLimit}
              changeLimit={props.changeLimit}
              fetchVisits={props.fetchVisits}
              paginate={props.paginate}
              setOffset={props.setOffset}
              firstLast={props.firstLast}
              showProgress={props.showProgress}
              showTable={props.showTable}
              botId={props.botId}
            />
          ) : null}
        </div>
        {props.showTableProgress ? null : (
          <AllVisitsTable
            visitorData={props.visitorData}
            paginate={props.paginate}
            offset={props.offset}
            botId={props.botId}
          />
        )}
      </div>
      {props.showTableProgress ? (
        <div style={{ height: "230px" }}>
          <ProgressBar />
        </div>
      ) : null}
    </div>
  );
};
export default TableContainer;
