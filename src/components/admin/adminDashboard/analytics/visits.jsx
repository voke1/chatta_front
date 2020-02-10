import React, { useState, useGlobal, useEffect, setGlobal } from "reactn";
import moment from "moment-timezone";
import socket from "socket.io-client";
import AnalyticsHelper from "./helpers/helpers";
import visits from "../../../../constants/visits";
import VisitOverlay from "../Bot/busy-overlay";
import TopLocation from "./top-locations";
import "./css/date-picker.css";
import DatePicker from "./date-picker-overlay";
import SearchBox from "./search-box";
import searchFilter from "../../../../utilities/search-filter";
import Pagination from "./pagination";
import * as apiService from "../../../../services/apiservice";
import { FacebookProgress } from "../Authentication/progressbar";
import Charts from "./chart";
import BarChart from "./bar-chart";
import DataTable from "./data-table";
import milliToTime from "../../../../utilities/milli-time";
import * as ApiService from "../../../../services/apiservice";
import ProgressBar from "../Authentication/progressbar";
import Header from "../../../../components/admin/layouts/layouts.header";
import Map from "./map";
import { APP_ENVIRONMENT } from "../../../../environments/environment";
import TableContainer from "./table-container";
import TodayChart from "./today-bar-chart";
import SmallSummary from "./small-summary";
import ConversationOverlay from "./visit-conversation-leads-overlay";

const BASE_URL = APP_ENVIRONMENT.base_url;
const io = socket(BASE_URL);

let visitors = [];
const Visits = props => {
  const [showBusyOverlay] = useGlobal("showBusyOverlay");
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
  const [uniqueVisits, setUniqueVisits] = useState({});
  const [browser, setBrowser] = useState("");
  const [repeatVisit, setRepeatVisit] = useState(0);

  const [showTableProgress, setShowTableProgress] = useState(false);
  const [todaysData, setTodaysData] = useState([]);
  const [bots, setBots] = useState([]);
  const [botId, setBotId] = useState("");
  const [leads, setLeads] = useState([]);
  const [todayLeads, setTodayLeads] = useState([]);
  const [bodyStyle, setBodyStyle] = useState({});
  const [showConvoOverlay, setShowConvoOverlay] = useState(false);
  const [averageSession, setAverageSession] = useState(0);

  const analyticsHelper = new AnalyticsHelper(
    {
      setVisitorData,
      setShowTable,
      setShowProgress,
      setIsData,
      setRecordLimit,
      setOffset,
      setPaginate,
      setAllRecord,
      setFirstLast,
      setDataset,
      setTopContinents,
      setTopCountries,
      setTopCities,
      setTab,
      setActiveUsers,
      setUniqueVisits,
      setActiveUsers,
      setBrowser,
      setRepeatVisit,
      setShowTableProgress,
      setTodaysData,
      setBots,
      setBotId,
      setLeads,
      setTodayLeads,
      setTerm,
      setAverageSession,
      setGlobal
    },
    { recordLimit, botId, visitors }
  );

  useEffect(async () => {
    await analyticsHelper.fetchBots();
    console.log("zone", await analyticsHelper.getLocalTimezone());
  }, []);

  const handleSearch = term => {
    setVisitorData(
      searchFilter(visitors, term, ["region_name", "region_code"])
    );
  };

  const handleChange = event => {
    const botId = event.target.value;
    analyticsHelper.collectVisits(botId);
  };

  const showOverlay = show => {
    console.log("show overlay", show);
    setShowConvoOverlay(show);
  };

  return (
    <div style={bodyStyle}>
      {allRecord.length ? (
        <ConversationOverlay
          averageSession={averageSession}
          visits={allRecord}
          show={showConvoOverlay}
          setShowConvoOverlay={setShowConvoOverlay}
          setBodyStyle={setBodyStyle}
          botId={botId}
          analyticsHelper={analyticsHelper}
        />
      ) : null}

      <div className="header-bg">
        {/* <!-- Navigation Bar--> */}

        <Header />
        {/* <!-- End Navigation Bar--> */}
        <div className="container-fluid">
          {/* <!-- Page-Title --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <h4 className="page-title" style={{ display: "inline" }}>
                  {" "}
                  <i className="dripicons-meter"></i> Dashboard
                </h4>
                <select
                  name="bots"
                  id=""
                  style={{
                    width: "180px",
                    height: "37px",
                    border: "2px solid #e8e1e1",
                    background: "#2D2553",
                    marginLeft: "15px",
                    color: "white"
                  }}
                  onChange={handleChange}
                >
                  {bots.map(bot => (
                    <option value={bot.botId}>{bot.botName}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* <!-- end page title end breadcrumb --> */}
          {!showProgress && isData ? (
            <div className="row">
              <div className="col-12 mb-4">
                <TodayChart dataSet={todaysData} />
                <div className="mt-4 text-center">
                  <DatePicker fetchVisits={analyticsHelper.fetchVisits} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {!showProgress && isData ? (
        <React.Fragment>
          <div className="wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 col-xl-3">
                  <div className="card text-center m-b-5">
                    <div className="mb-2 card-body text-muted">
                      <h3 className="text-info">
                        {leads.labels
                          ? leads.labels.filter(label => label !== undefined)
                              .length
                          : 0}
                      </h3>
                      Leads
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <div className="card text-center m-b-5">
                    <div className="mb-2 card-body text-muted">
                      <h3 className="text-purple">{repeatVisit}</h3>
                      Repeat Visitors
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <div className="card text-center m-b-5">
                    <div
                      className="mb-2 card-body text-muted"
                      onClick={() => {
                        setShowConvoOverlay(true);
                        setBodyStyle({
                          position: "fixed",
                          left: 0,
                          right: 0,
                          scrollHeight: "150px"
                        });
                      }}
                    >
                      <h3 className="text-primary">{allRecord.length}</h3>
                      Total Visits
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <div className="card text-center m-b-5">
                    <div className="mb-2 card-body text-muted">
                      <h3 className="text-danger">
                        {uniqueVisits.labels ? uniqueVisits.labels.length : 0}
                      </h3>
                      Unique Visitors
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end row --> */}

              <div className="row">
                <div className="col-xl-4"></div>

                <div className="col-xl-8"></div>
              </div>
              {/* <!-- end row --> */}

              <div className="row">
                <div className="col-xl-8"></div>

                <div className="col-xl-4"></div>
              </div>
              {/* <!-- end row --> */}
            </div>
            {/* <!-- end container --> */}
          </div>
          <div class="row">
            <div class="column1">
              <div style={{ float: "left", margin: "10px" }}>
                <SearchBox
                  handleSearch={handleSearch}
                  clearSearch={clearSearch}
                />
              </div>
            </div>
            <div class="column2" style={{ paddingRight: "10px" }}></div>
          </div>
        </React.Fragment>
      ) : null}
      {showProgress && isData ? (
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

      {!showProgress && isData ? (
        <div className="data-row">
          <div className="data-columns columns1" style={{ overflow: "hidden" }}>
            <Map />
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
            <div className="card" style={{ width: "95%", marginTop: "10px" }}>
              <Charts dataSet={dataSet} />
            </div>
            <div className="card" style={{ width: "95%", marginTop: "10px" }}>
              <BarChart dataSet={browser} />
            </div>
          </div>
          <div className="data-columns columns3" style={{}}>
            <div className="card" style={{ width: "95%", marginTop: "10px" }}>
              <SmallSummary
                visits={todaysData.allLabels ? todaysData.allLabels.length : 0}
                leads={
                  todayLeads.labels
                    ? todayLeads.labels.filter(label => label !== undefined)
                        .length
                    : 0
                }
                allLeads={
                  leads.labels
                    ? leads.labels.filter(label => label !== undefined).length
                    : 0
                }
                allVisits={allRecord.length}
                noOfDays={dataSet.labels ? dataSet.labels.length : 0}
              />
            </div>
            <div className="card" style={{ width: "95%", marginTop: "10px" }}>
              <div
                style={{
                  height: "35px",
                  borderBottom: "1px solid #e6e7e8",
                  paddingTop: "5px"
                }}
              >
                <span
                  style={{
                    marginLeft: "10px",
                    color: "#639094",
                    fontWeight: "500",
                    fontSize: "15px"
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
                  width: "10%",
                  margin: "auto",
                  fontSize: "50px",
                  fontWeight: "410"
                }}
              >
                <span>{activeUsers}</span>
              </div>
              <div
                style={{
                  width: "50%",
                  margin: "auto",
                  marginBottom: "15px",
                  fontSize: "15px"
                }}
              >
                <span>active visitors on your bot</span>
              </div>
            </div>

            <div
              className="card"
              style={{
                width: "95%",
                marginTop: "10px",
                height: "fit-content"
              }}
            >
              <TableContainer
                pagify={analyticsHelper.pagify}
                visitors={allRecord}
                recordLimit={recordLimit}
                changeLimit={setRecordLimit}
                fetchVisits={analyticsHelper.fetchVisits}
                botId={botId}
                paginate={paginate}
                setOffset={setOffset}
                firstLast={firstLast}
                visitorData={visitorData}
                paginate={paginate}
                offset={offset}
                showTableProgress={showTableProgress}
                showTable={showTable}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Visits;
