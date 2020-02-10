import React, { useState, useGlobal, useEffect } from "reactn";
import visits from "../../../../constants/visits";
import TopLocation from "./top-locations";
import "./css/date-picker.css";
import DatePicker from "./date-picker-overlay";
import SearchBox from "./search-box";
import searchFilter from "../../../../utilities/search-filter";
import Pagination from "./pagination";
import * as apiService from "../../../../services/apiservice";
import { FacebookProgress } from "../Authentication/progressbar";
import Charts from "./chart";
import DataTable from "./data-table";
import $ from "jquery";

let visitors = [];
const Visits = props => {
  const [visitorData, setVisitorData] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [isData, setIsData] = useState(true);
  const [setTerm] = useGlobal("clearSearch");
  const [recordLimit, setRecordLimit] = useState(5);
  const [offset, setOffset] = useState(1);
  const [paginate, setPaginate] = useState(false);
  const [allRecord, setAllRecord] = useState([]);
  const [firstLast, setFirstLast] = useState([]);
  const [dataSet, setDataset] = useState({});
  const [topContinents, setTopContinents] = useState({});
  const [topCountries, setTopCountries] = useState({});
  const [topCities, setTopCities] = useState({});
  const [tab, setTab] = useState("1");
  const [activeUsers, setActiveUsers] = useState(0);

  const fetchVisits = async (dates, limit) => {
    setShowProgress(true);
    setShowTable(false);
    setIsData(true);
    try {
      let data;
      if (dates) {
        const visitsInRange = [];
        setPaginate(false);
        data = await apiService.get(
          "visitors",
          `${new Date(dates[0])}*${new Date(dates[1])}*${recordLimit}`
        );
        const dataForPaginate = await apiService.get(
          "visitors",
          `${new Date(dates[0])}*${new Date(dates[1])}`
        );
        dataForPaginate.forEach(visit => visitsInRange.push(visit.visitors));
        visitors = visitsInRange;
        setAllRecord(visitsInRange);
        const start = visitors.length - (visitors.length % recordLimit) + 1;
        setFirstLast([1, recordLimit]);
      } else {
        data = await apiService.get(
          "visitors/all",
          parseInt(limit, 10) || recordLimit
        );
      }
      const allVisits = [];
      data.forEach(visit => allVisits.push(visit.visitors));

      setShowProgress(false);
      setShowTable(true);
      setVisitorData(allVisits);
      visitors = allVisits;
      if (!visitors.length) {
        setIsData(false);
        setShowTable(false);
      } else {
        setIsData(true);
      }
      setTerm("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    const records = [];
    await fetchVisits();
    try {
      const data = await apiService.get("visitors");
      data.forEach(visit => records.push(visit.visitors));
      if (!allRecord.length) {
        setAllRecord(records);
        setFirstLast([1, recordLimit]);
        setDataset(extractData(records, "by_date"));
        setTopContinents(extractData(records, "continent_name"));
        setTopCountries(extractData(records, "country_name"));
        setTopCities(extractData(records, "city"));
        console.log("labels", extractData(records));
      }
    } catch (error) {
      console.log(error.message);
    }
    setInterval(() => {
      apiService
        .get("activeusers")
        .then(res => {
          setActiveUsers(res.length);
          console.log(res);
        })
        .catch(error => {
          console.log(error.message);
        });
    }, 5000);
  }, []);

  const handleSearch = term => {
    setVisitorData(
      searchFilter(visitors, term, ["region_name", "region_code"])
    );
  };
  const pagify = async page => {
    setPaginate(true);
    await fetchVisits(null, recordLimit * page);
    let allRecords;
    if (visitors.length % recordLimit !== 0) {
      const start = visitors.length - (visitors.length % recordLimit) + 1;
      allRecords = visitors.slice(
        visitors.length - (visitors.length % recordLimit),
        visitors.length
      );

      setOffset(start);
      setFirstLast([start, start + (visitors.length % recordLimit) - 1]);
    } else {
      const start = visitors.length - recordLimit + 1;
      allRecords = visitors.slice(
        visitors.length - recordLimit,
        visitors.length
      );
      setOffset(start);
      setFirstLast([start, start + recordLimit - 1]);
    }

    console.log("all records", allRecord.length);
    visitors = allRecords;
    setVisitorData(allRecords);
  };
  const extractData = (visits, type) => {
    // get the labels
    const labels = [];
    const uniqueLabels = [];
    const frequency = [];
    const checked = [];
    let label;
    visits.forEach(visit => {
      const { time } = visit;
      if (type === "by_date") {
        label = time.split(",")[0];
      } else {
        label = visit[type];
      }
      labels.push(label);
      if (!uniqueLabels.includes(label)) uniqueLabels.push(label);
    });
    // get the frequency

    labels.forEach(label => {
      let count = 0;
      if (!checked.includes(label)) {
        for (let index = 0; index < labels.length; index += 1) {
          if (labels[index] === label) count += 1;
        }

        checked.push(label);
        frequency.push(count);
      }
    });
    return {
      labels: uniqueLabels,
      frequency
    };
  };

  return (
    <div>
      <div class="row">
        <div class="column1">
          <div style={{ float: "left", margin: "10px" }}>
            <SearchBox handleSearch={handleSearch} clearSearch={clearSearch} />
          </div>
        </div>
        <div class="column2" style={{ paddingRight: "10px" }}>
          <div style={{ float: "right", margin: "10px" }}>
            <DatePicker fetchVisits={fetchVisits} />
            <div
              style={{
                float: "right",
                marginBottom: "5px",
                marginRight: "70px"
              }}
            >
              <Pagination
                pagify={pagify}
                visitors={allRecord}
                recordLimit={recordLimit}
                changeLimit={setRecordLimit}
                fetchVisits={fetchVisits}
                paginate={paginate}
                setOffset={setOffset}
                firstLast={firstLast}
              />
            </div>
          </div>
        </div>
      </div>
      {showProgress ? (
        <div
          style={{
            width: "10%",
            margin: "auto",
            display: "block",
            marginTop: "150px"
          }}
        >
          <FacebookProgress />
        </div>
      ) : null}

      {!isData ? (
        <div
          style={{
            width: "20%",
            margin: "auto",
            display: "block",
            marginTop: "100px",
            fontSize: "3.2vw"
          }}
        >
          <span>No Records</span>
        </div>
      ) : null}

      {!showProgress ?<div className="data-row">
        <div className="data-columns columns1" style={{}}>
          <TopLocation
            topContinents={topContinents}
            topCountries={topCountries}
            topCities={topCities}
            setTab={setTab}
          />
          {tab === "1" ? (
            <div>
              <DataTable data={topContinents} type="Continents" />
            </div>
          ) : null}
          {tab === "2" ? (
            <div>
              <DataTable data={topCountries} type="Countries" />
            </div>
          ) : null}
          {tab === "3" ? (
            <div>
              <DataTable data={topCities} type="Cities" />
            </div>
          ) : null}
        </div>

        <div className="data-columns columns2" style={{}}>
          <div
            className="container card"
            style={{ width: "95%", marginTop: "10px" }}
          >
            <Charts dataSet={dataSet} />
          </div>

          <div
            className="container card table-holder table-responsive"
            style={{ width: "95%" }}
          >
            {showTable ? (
              <table class="table table-striped table-sm">
                <thead
                  className="thead-primary"
                  style={{ color: "black", fontSize: "25px" }}
                >
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Continent</th>
                    <th scope="col">Country</th>
                    <th scope="col">State</th>
                    <th scope="col">Date / Time</th>
                    <th scope="col">Average time spent</th>
                  </tr>
                </thead>
                <tbody>
                  {visitorData.map((data, index) => {
                    return (
                      <tr>
                        <th scope="row">
                          {paginate ? index + offset : index + 1}
                        </th>
                        <td className="user-info">{data.continent_name}</td>
                        <td className="user-info">
                          {data.country_name}{" "}
                          <i style={{ marginLeft: "2px" }}>
                            {data.location.country_flag_emoji}
                          </i>
                        </td>
                        <td className="user-info">{data.city}</td>
                        <td className="user-info"> {data.time}</td>
                        <td className="user-info"> {"00:05:10"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="data-columns columns3" style={{}}>
          <div className="card" style={{ width: "95%", marginTop: "10px" }}>
            <div
              style={{
                height: "50px",
                borderBottom: "1px solid #e6e7e8",
                paddingTop: "15px"
              }}
            >
              <span
                style={{
                  marginLeft: "10px",
                  fontWeight: "400",
                  fontSize: "18px"
                }}
              >
                Active Visitors
              </span>
            </div>
            <div
              style={{
                width: "30%",
                margin: "auto",
                fontSize: "1.6rem",
                fontWeight: "410"
              }}
            >
              <span>Right Now</span>
            </div>
            <div
              style={{
                width: "20%",
                margin: "auto",
                fontSize: "60px",
                fontWeight: "410"
              }}
            >
              <span>{activeUsers}</span>
            </div>
            <div
              style={{
                width: "40%",
                margin: "auto",
                marginBottom: "20px"
              }}
            >
              <span>active visitors on your bot</span>
            </div>
          </div>
        </div>
      </div>:null}
    </div>
  );
};
export default Visits;
