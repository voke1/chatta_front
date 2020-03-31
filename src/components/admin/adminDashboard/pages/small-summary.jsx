import React, { useState } from "react";
import "./css/small-summary.css";
const SmallSummary = props => {
  console.log("visits", props.allLeads);
  return (
    <div
      className="row"
      style={{ width: "100%", height: "100px", background: "milk" }}
    >
      <div className="col-md-4">
        <div className="total-visit-count">
          <span className="number">{props.visits}</span>
        </div>
        <div className="total-visit-title">
          <span>Visits today</span>
          <span style={{ marginTop: "8px" }}>{`${Math.round(
            props.allVisits / props.noOfDays
          )} avg`}</span>
        </div>
      </div>
      <div className="col-md-4">
        <div className="total-visit-count">
          <span className="number">{props.leads}</span>
        </div>
        <div className="total-visit-title">
          <span>Leads today</span>
          <span style={{ marginTop: "8px" }}>{`${Math.round(
            props.allLeads / props.noOfDays
          )} avg`}</span>
        </div>
      </div>
      <div className="col-md-4">
        <div className="total-visit-count">
          <span className="number">
            {props.visits === 0
              ? 0
              : `${Math.round((props.leads / props.visits) * 100)}%`}
          </span>
        </div>
        <div className="total-visit-title">
          <span>Leads rate</span>
          <span style={{ marginTop: "8px" }}>{`${Math.round(
            (props.allLeads / props.allVisits) * 100
          )}% avg`}</span>
        </div>
      </div>
    </div>
  );
};
export default SmallSummary;
