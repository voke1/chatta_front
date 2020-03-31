import {useState, useGlobal} from 'react'

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
  const [todayLeads, setTodayLeads] = useState([])
  const [bodyStyle, setBodyStyle] = useState({})
  const [showConvoOverlay, setShowConvoOverlay] = useState(fa