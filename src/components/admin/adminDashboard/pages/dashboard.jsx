import React, { useState, useGlobal, useEffect, setGlobal } from "reactn";
import socket from "socket.io-client";
import AnalyticsHelper from "./helpers/helpers";
import TopLocation from "./top-locations";
import "./css/date-picker.css";
import DatePicker from "./date-picker-overlay";
import SearchBox from "./search-box";
import searchFilter from "../../../../utilities/search-filter";
import { FacebookProgress } from "../Authentication/progressbar";
import Charts from "./chart";
import BarChart from "./bar-chart";
import DataTable from "./data-table";
import Map from "./map";
import { APP_ENVIRONMENT } from "../../../../environments/environment";
import TableContainer from "./table-container";
import TodayChart from "./today-bar-chart";
import SmallSummary from "./small-summary";
import ConversationOverlay from "./visit-conversation-leads-overlay";

import "../../../../../node_modules/react-toggle-switch/dist/css/switch.min.css";
// import "../components/admin/css/style.css";
// import "../components/admin/css/icons.css";
import "../../../../components/admin/admin_template (1)/fonik/purple/assets/css/bootstrap.min.css";
import "../../../../components/admin/admin_template (1)/fonik/purple/assets/css/icons.css";
import "../../../../components/admin/admin_template (1)/fonik/purple/assets/css/styles.css";
import "../../../../components/admin/admin_template (1)/fonik/purple/assets/plugins/datatables/dataTables.bootstrap4.min.css";
import "../../../../components/admin/admin_template (1)/fonik/purple/assets/plugins/datatables/responsive.bootstrap4.min.css";
// import avatar2 from "../../../../components/admin/images/users/avatar-1.jpg";
// import avatar3 from "../../../../components/admin/images/users/avatar-1.jpg";
import "../../../../components/admin/css/bootstrap.min.css";
import "../../../../components/admin/css/switch.css";
import "../../../../components/admin/images/favicon.ico";
import Footer from "../../layouts/layouts.footer";
import Header from "../../layouts/layouts.header";
import "../../../../components/admin/plugins/datatables/dataTables.bootstrap4.min.css";
import "../../../../components/admin/plugins/datatables/responsive.bootstrap4.min.css";
import "../../../../components/admin/plugins/morris/morris.css";
const BASE_URL = APP_ENVIRONMENT.base_url;
const io = socket(BASE_URL);
let visitors = [];
const App = () => {
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
  const [fetchedBots, setFetchedBots] = useState(false)

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
  const handleSearch = term => {
    setVisitorData(
      searchFilter(visitors, term, ["region_name", "region_code"])
    );
  };

  const handleChange = event => {
    const botId = event.target.value;
    console.log("chat body", botId);
    analyticsHelper.collectVisits(botId);
  };
  const fetchBots = async () => {
   if(!fetchedBots){
     await analyticsHelper.fetchBots();
    setFetchedBots(true)}

  };
  fetchBots()
  return (
    <div>
      <body>
        {/* <!-- Loader --> */}
        {/* <div id="preloader"><div id="status"><div className="spinner"></div></div></div> */}
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
                </div>
              </div>
            </div>
            {/* <!-- end page title end breadcrumb --> */}
            {!showProgress && isData ? (
              <div className="row">
                <div className="col-12 mb-4">
                  <TodayChart dataSet={todaysData} />
                  <div className="mt-4 text-center">
                    <DatePicker
                      fetchVisits={analyticsHelper.fetchVisits}
                      botId={botId}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* <!-- end wrapper --> */}

        {/* <!-- Footer --> */}
        <Footer />
        {/* <!-- End Footer --> */}
      </body>
    </div>
  );
};

export default App;
