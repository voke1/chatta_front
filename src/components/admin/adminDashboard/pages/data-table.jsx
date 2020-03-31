import React, { Component } from "react";
const Continent = props => {
  return (
    <div
      className=" card"
      style={{ width: "95%", marginTop: "20px", marginLeft: "15px" }}
    >
      <table class="table table-sm">
        <thead style={{ background: "#d2d4d6" }}>
          <tr>
            <th scope="col">{props.type}</th>
            <th scope="col">Visits</th>
            <th scope="col">Average time spent</th>
          </tr>
        </thead>
        <tbody>
          {props.data.labels
            ? props.data.labels.map((continent, index) => {
                return (
                  <tr>
                    <td>{continent}</td>
                    <td>{props.data.frequency[index]}</td>
                <td>{props.data.averageSession[index]}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Continent;
