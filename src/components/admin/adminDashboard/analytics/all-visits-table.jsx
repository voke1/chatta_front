import React, { Component } from "react";
const AllVisitsTable = props => {
  return (
    <div
      className="table-responsive card"
      style={{ width: "100%" }}
    >
      <table class="table table-striped table-sm">
        <thead
          className="thead-primary"
          style={{fontSize: "10px !important",background: "#d2d4d6" }}
        >
          <tr>
            <th scope="col">#</th>
            <th scope="col">Country</th>
            <th scope="col">State</th>
            <th scope="col">Date/Time</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
        <tbody>
          {props.visitorData.map((data, index) => {
            return (
              <tr>
                <th scope="row">
                  {props.paginate ? index + props.offset : index + 1}
                </th>
                <td className="user-info">
                  {data.country_name}{" "}
                 
                </td>
                <td className="user-info">{data.city}</td>
                <td className="user-info"> {data.time}</td>
                <td className="user-info"> {data.session}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllVisitsTable;
