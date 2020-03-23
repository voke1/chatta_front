import React, { useState, useEffect, useRef, useGlobal } from "reactn";
import InfiniteScroll from "react-infinite-scroll-component";
import DatePicker from "./dates";
import ProgressBar from "../Authentication/progressbar";
import Doughnut from "./doughnut";
import { FacebookProgress } from "../Authentication/progressbar";
import LineChart from "./chart";
import loader from "./statics/logo_animation_loop_blue_100x100.gif";
import "./css/conversation-overlay.css";
import Visits from "./visits";
const BusyOverlay = props => {
  const [conversations, setConversations] = useState([]);
  const [visits, setVisits] = useState([]);
  const [visitsForTable, setVisitsForTable] = useState([]);
  const [progress, setProgress] = useState(false);
  const [conversationName, setConversationName] = useState("Conversation 01");
  const [background, setBackground] = useState("");
  const [averageMessage, setAverageMessage] = useState(0);
  const [pageOffset, setPageOffset] = useState(8);
  const [end, setEnd] = useState(8);
  let tableRef = useRef(null);
  const [records] = useGlobal("records");
  const [newRecord, setNewRecord] = useState(false);
  const [botId, setBotId] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [message, setMessage] = useState("");
  const [ago, setDaysAgo] = useState(0);
  const [averageSession, setAverageSession] = useState(0);
  const [averageAccuracy, setAverageAccuracy] = useState(0);
  const [averageErrors, setAverageError] = useState(0);
  const [averageBounceRate, setBounceRate] = useState(0);
  const [dateOptions, setDateOptions] = useState(false);
  const [pickedDate, setPickedDate] = useState("");
  const [dateType, setDateType] = useState("");
  const [percentageSentiment, setPercentageSentiment] = useState([]);
  const [uniqueSentimentLabels, setUniqueSentimentLabels] = useState([]);
  const [uniqueSentimentFrequency, setUniqueSentimentFrequency] = useState([]);
  const [keywords, setKeywords] = useState({});

  const fetchMoreData = async visits => {
    setTimeout(() => {
      const moreVisits = visits.slice(0, end);
      console.log("more visits", moreVisits);
      setVisitsForTable(moreVisits);
      setEnd(end + pageOffset);
      setScrolled(false);
    }, 1500);
  };

  const getVisits = async allVisits => {
    if (allVisits.visits.length) {
      setAverageMessage(
        Math.round(allVisits.messages / allVisits.visits.length)
      );
      setAverageError(Math.round(allVisits.errors / allVisits.visits.length));
      const accuracy = Math.round(
        100 - (allVisits.errors / allVisits.messages) * 100
      );
      setAverageAccuracy(accuracy);
      console.log("accuracy", accuracy);
      setVisits(allVisits.visits);

      await fetchMoreData(allVisits.visits);
      setConversations(allVisits.visits[0].conversations);
      setBackground(0);
    } else {
      setProgress(false);
      setTimeout(() => {
        setMessage("No conversations found");
      }, 2000);
    }
  };
  const getRecords = async (daysAgo, date) => {
    if (props.show && botId !== props.botId) {
      let data = [];
      if (date) {
        data = await props.analyticsHelper.getTodayData(props.botId, date);
      } else {
        const daysAgoDate = await props.analyticsHelper.getDaysAgo(daysAgo);
        data = await props.analyticsHelper.getTodayData(
          props.botId,
          daysAgoDate
        );
      }
      await setBotId(props.botId);
      await setVisitsForTable([]);
      await setVisits([]);
      await setKeywords([]);
      await setScrolled(false);
      await setScrolled(false);
      await setMessage("");
      if (data.length) {
        setShowProgress(false);
        const conversationVisits = await props.analyticsHelper.extractConversations(
          data
        );
        const bounceRate =
          100 -
          Math.round((conversationVisits.visits.length / data.length) * 100);
        setBounceRate(bounceRate);
        const sessionArray = await props.analyticsHelper.extractAndFormatData(
          data,
          "ipv4"
        );
        setAverageSession(sessionArray.averageSession[0]);
        await getVisits(conversationVisits);
        const keywordPhraseAnalytics = props.analyticsHelper.analyzeKeywords(
          data
        );
        await setUniqueSentimentLabels(
          keywordPhraseAnalytics.sentiments.uniqueSentimentLabels
        );
        await setPercentageSentiment(
          keywordPhraseAnalytics.sentiments.percentageSentiment
        );
        await setUniqueSentimentFrequency(
          keywordPhraseAnalytics.sentiments.uniqueSentimentFrequency
        );
        console.log("keyy", keywordPhraseAnalytics);
        await setKeywords(keywordPhraseAnalytics.keywords);
      } else {
        await setDaysAgo(null);
        await setVisitsForTable([]);
        await setKeywords([]);
        await setVisits([]);
        await setScrolled(false);
        setTimeout(() => {
          setMessage("No conversations found");
        }, 2000);
      }
    }
  };
  getRecords(ago, pickedDate);
  useEffect(async () => {}, []);

  const handleClick = conversationId => {
    setConversationName(
      `Conversation ${conversationId + 1 < 10 ? 0 : ""}${conversationId + 1}`
    );
    setProgress(true);
    setBackground(conversationId);
    setTimeout(() => {
      setConversations(visits[conversationId].conversations);
      setProgress(false);
    }, 2000);
  };
  const handleSelect = async event => {
    const day = event.target.value;

    if (day === "choose" || day === "range" || day === "single") {
      await setDateType(day);
      await setDateOptions(true);
      console.log("event");
    } else {
      setDateOptions(false);
      await setDaysAgo(parseInt(day, 10));
      await setBotId("");
      await setVisitsForTable([]);
      await setKeywords([]);
      await setScrolled(false);
      await setDateType("");

      getRecords(day);
    }
  };

  const selectOptions = (
    <select name="select-range" id="" onChange={handleSelect}>
      <option value={0}>Today so far</option>
      <option value={1}>Yesterday</option>
      <option value={7}>7 days ago</option>
      <option value={28}>28 days ago</option>
      <option value="choose">Choose date</option>
    </select>
  );
  return (
    <div style={{ overflow: "scroll" }}>
      <div
        className="show-conversation-overlay "
        style={{ display: props.show ? "block" : "none" }}
      >
        <div
          className="overlay-container"
          style={{
            background: !visitsForTable.length ? "white" : "rgb(248, 247, 247)"
          }}
        >
          <div className="overlay-header">
            <div className="overlay-title">
              <span>Conversations</span>
            </div>
            <div
              className="overlay-close-btn"
              onClick={() => {
                props.setShowConvoOverlay(false);
                props.setBodyStyle({
                  position: "relative"
                });
              }}
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-close"></i>
            </div>
          </div>
          <div className="overlay-row">
            <div className="overlay-left">
              <div style={{ display: "inline", float: "left" }}>
                {selectOptions}
              </div>
              {dateOptions ? (
                <div style={{ display: "inline", float: "left" }}>
                  <select
                    name="select-range"
                    id=""
                    onChange={handleSelect}
                    style={{ width: "fit-content" }}
                  >
                    <option value="single">Single date</option>
                    <option value="range">Range</option>
                  </select>
                </div>
              ) : null}

              <div
                style={{ display: "inline", float: "left", marginTop: "10px" }}
              >
                {dateType === "single" ||
                dateType === "range" ||
                dateType === "choose" ? (
                  <DatePicker
                    setBotId={setBotId}
                    getRecords={getRecords}
                    setPickedDate={setPickedDate}
                    setVisitsForTable={setVisitsForTable}
                    setScrolled={setScrolled}
                  />
                ) : null}
              </div>
              {dateType === "range" ? (
                <React.Fragment>
                  <div
                    style={{
                      display: "inline",
                      float: "left",
                      marginTop: "10px"
                    }}
                  >
                    <span
                      style={{
                        margin: "10px 5px 0px 5px",
                        fontWeight: "400px",
                        color: "grey"
                      }}
                    >
                      TO
                    </span>
                  </div>
                  <div
                    style={{
                      display: "inline",
                      float: "left",
                      marginTop: "10px",
                      marginLeft: "5px",
                      marginRight: "5px"
                    }}
                  >
                    {" "}
                    <DatePicker
                      setBotId={setBotId}
                      getRecords={getRecords}
                      setPickedDate={setPickedDate}
                      setVisitsForTable={setVisitsForTable}
                      setKeywords={setKeywords}
                      setScrolled={setScrolled}
                    />
                  </div>
                </React.Fragment>
              ) : null}

              {visitsForTable.length ? (
                <div
                  className="overlay-table"
                  ref={ref => (tableRef = ref)}
                  id="scroll"
                >
                  <InfiniteScroll
                    scrollableTarget="scroll"
                    dataLength={1000} //This is important field to render the next data
                    next={() => {
                      fetchMoreData(visits);
                      setScrolled(true);
                    }}
                    hasMore={visitsForTable.length < 1000}
                    loader={
                      <div>
                        {scrolled ? (
                          <div style={{ width: "fit-content", margin: "auto" }}>
                            {<FacebookProgress size={20} />}
                          </div>
                        ) : null}

                        <span>.</span>
                      </div>
                    }
                    endMessage={
                      scrolled ? (
                        <p style={{ textAlign: "center" }}>
                          <b>You've hit the bottom</b>
                        </p>
                      ) : null
                    }
                    // below props only if you need pull down functionality
                    refreshFunction={() => {}}
                    pullDownToRefresh
                    pullDownToRefreshContent={null}
                    releaseToRefreshContent={
                      <h3 style={{ textAlign: "center" }}>
                        &#8593; Release to refresh
                      </h3>
                    }
                  >
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">time</th>
                          <th scope="col">Continent</th>
                          <th scope="col">Country</th>
                          <th scope="col">Messages</th>
                          <th scope="col">Errors</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visitsForTable.length
                          ? visitsForTable.map((convo, index) => (
                              <React.Fragment>
                                <tr
                                  value={index}
                                  onClick={() => {
                                    handleClick(index);
                                  }}
                                  disabled
                                  style={
                                    background === index
                                      ? { background: "grey", color: "white" }
                                      : {}
                                  }
                                >
                                  <td>
                                    <span style={{ display: "block" }}>
                                      {visitsForTable[index].time.split(" ")[0]}
                                    </span>
                                    <span
                                      style={{
                                        display: "block",
                                        marginTop: "15px"
                                      }}
                                    >
                                      {visitsForTable[index].time.split(" ")[1]}
                                    </span>
                                  </td>
                                  <td>
                                    {visitsForTable[index].continent_name}
                                  </td>
                                  <td>{visitsForTable[index].country_name}</td>
                                  <td>
                                    {visitsForTable[index].conversations.length}
                                  </td>
                                  <td>
                                    {visitsForTable[index].conversations[
                                      visitsForTable[index].conversations
                                        .length - 1
                                    ]
                                      ? visitsForTable[index].conversations[
                                          visitsForTable[index].conversations
                                            .length - 1
                                        ].error || 0
                                      : 0}
                                  </td>
                                </tr>
                              </React.Fragment>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </InfiniteScroll>
                </div>
              ) : null}
              {keywords.uniqueKeywordLabel && visitsForTable.length ? (
                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Keywords</th>
                      <th scope="col">Search volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywords.uniqueKeywordLabel.map((label, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{label}</td>
                        <td>{keywords.uniqueKeywordFrequency[index]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>

            <div className="overlay-right row">
              <div
                className="col-md-5 bot-column"
                style={
                  visitsForTable.length
                    ? {
                        borderRight: "1px solid rgb(240, 238, 238)",
                        borderTop: "red"
                      }
                    : {}
                }
              >
                {visitsForTable.length ? (
                  <React.Fragment>
                    <div className="conversation-title">
                      {progress ? (
                        <span>Retrieving conversation...</span>
                      ) : (
                        <span style={{ fontWeight: 400 }}>
                          {conversationName}
                        </span>
                      )}
                    </div>
                    <div className="conversations">
                      <div className="conversation-header"></div>
                      {progress ? (
                        <div
                          style={{
                            width: "15%",
                            margin: "auto",
                            marginTop: "150px"
                          }}
                        >
                          {" "}
                          <FacebookProgress size={30} />
                        </div>
                      ) : (
                        <div className="conversation-body">
                          {conversations.length
                            ? conversations.map(conversation =>
                                conversation.from === "bot" ? (
                                  <div className="conversation-bot">
                                    <div className="time-stamp">
                                      <span>{conversation.name}</span>{" "}
                                      <span>{conversation.timeStamp}</span>
                                    </div>
                                    <div className="message-box">
                                      <span>{conversation.message}</span>
                                    </div>
                                    <div className="buttons">
                                      {conversation.buttons.length
                                        ? conversation.buttons.map(button => (
                                            <button className="button1">
                                              {button.val}
                                            </button>
                                          ))
                                        : null}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="conversation-user">
                                    <div className="time-stamp">
                                      <span>{conversation.name}</span>{" "}
                                      <span>{conversation.timeStamp}</span>
                                    </div>
                                    <div className="message-box user-box">
                                      <span>{conversation.message}</span>
                                    </div>
                                  </div>
                                )
                              )
                            : null}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ) : (
                  <div
                    style={{
                      width: "fit-content",
                      margin: "auto",
                      marginTop: "100px"
                    }}
                  >
                    {message ? (
                      <span
                        style={{
                          fontSize: "25px",
                          color: "grey",
                          fontWeight: 500
                        }}
                      >
                        {message}
                      </span>
                    ) : (
                      <img src={loader} alt="fetching..." />
                    )}
                  </div>
                )}
              </div>
              {visitsForTable.length ? (
                <div className="col-md-7">
                  <div className="row-small-data">
                    <div className="analysis">
                      <div
                        style={{
                          fontSize: "20px",
                          color: "grey",
                          fontWeight: 500,
                          marginLeft: "5px"
                        }}
                      >
                        <span>{visitsForTable.length}</span>
                      </div>
                      <div style={{ marginLeft: "5px" }}>
                        <span>Conversations</span>
                      </div>
                    </div>
                    <div className="analysis">
                      <div
                        style={{
                          fontSize: "20px",
                          color: "grey",
                          fontWeight: 500,
                          marginLeft: "5px"
                        }}
                      >
                        <span>{averageMessage}</span>
                      </div>
                      <div style={{ marginLeft: "5px" }}>
                        <span>Messages (Avg)</span>
                      </div>
                    </div>
                    <div className="analysis">
                      <div
                        style={{
                          fontSize: "20px",
                          color: "grey",
                          fontWeight: 500,
                          marginLeft: "5px"
                        }}
                      >
                        <span>{averageSession}</span>
                      </div>
                      <div style={{ marginLeft: "5px" }}>
                        <span>Duration (Avg)</span>
                      </div>
                    </div>
                  </div>

                  <div className="row-small-data">
                    <div className="analysis">
                      <div
                        style={{
                          fontSize: "20px",
                          color: "grey",
                          fontWeight: 500,
                          marginLeft: "5px"
                        }}
                      >
                        <span>{`${averageAccuracy}%`}</span>
                      </div>
                      <div style={{ marginLeft: "5px" }}>
                        <span>Accuracy (Avg)</span>
                      </div>
                    </div>
                    <div className="analysis">
                      <div
                        style={{
                          fontSize: "20px",
                          color: "grey",
                          fontWeight: 500,
                          marginLeft: "5px"
                        }}
                      >
                        <span>{averageErrors}</span>
                      </div>
                      <div style={{ marginLeft: "5px" }}>
                        <span>Errors (Avg)</span>
                      </div>
                    </div>
                    <div className="analysis">
                      <div
                        style={{
                          fontSize: "20px",
                          color: "grey",
                          fontWeight: 500,
                          marginLeft: "5px"
                        }}
                      >
                        <span>{`${averageBounceRate}%`}</span>
                      </div>
                      <div style={{ marginLeft: "5px" }}>
                        <span>Bounce rate (Avg)</span>
                      </div>
                    </div>
                  </div>

                  {percentageSentiment.length ? (
                    <div>
                      <div className="row-small-data">
                        {percentageSentiment.map((value, index) => (
                          <div
                            className={`analysis-${percentageSentiment.length}`}
                          >
                            <div
                              style={{
                                fontSize: "20px",
                                color: "grey",
                                fontWeight: 500,
                                marginLeft: "5px"
                              }}
                            >
                              <span>{`${value}%`}</span>
                            </div>
                            <div style={{ marginLeft: "5px" }}>
                              <span>
                                {uniqueSentimentLabels[index]
                                  .charAt(0)
                                  .toUpperCase() +
                                  uniqueSentimentLabels[index].slice(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="card" style={{ marginTop: 10 }}>
                        <Doughnut
                          caption="Sentiments"
                          data={{
                            labels: uniqueSentimentLabels,
                            frequency: uniqueSentimentFrequency
                          }}
                        />
                      </div>
                    </div>
                  ) : null}

                  
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BusyOverlay;
