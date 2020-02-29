import React, { useState, useEffect, useRef, useGlobal } from "reactn";
import InfiniteScroll from "react-infinite-scroll-component";
import ProgressBar from "../Authentication/progressbar";
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
  const fetchMoreData = async visits => {
    // a fake async api call like which sends
    // 10 more records in 1.5 secs
    setTimeout(() => {
      const moreVisits = visits.slice(0, end);
      console.log("conversation", moreVisits);

      setVisitsForTable(moreVisits);
      setEnd(end + pageOffset);
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
  const getRecords = async daysAgo => {
    console.log("ago", daysAgo);
    if (props.show && botId !== props.botId) {
      await setBotId(props.botId);
      await setVisitsForTable([]);
      await setScrolled(false);
      setMessage("");
      const daysAgoDate = await props.analyticsHelper.getDaysAgo(daysAgo);
      const data = await props.analyticsHelper.getTodayData(
        props.botId,
        daysAgoDate
      );
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
        await setDaysAgo(0);
      } else {
        await setDaysAgo(0);
        setTimeout(() => {
          setMessage("No conversations found");
        }, 2000);
      }
    }
  };
  getRecords(ago);
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
    const day = parseInt(event.target.value, 10);
    await setDaysAgo(day);
    await setBotId("");
    await setVisitsForTable([]);
    await setScrolled(false);
    getRecords(day);
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
    <div>
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
              {selectOptions}
              {visitsForTable.length ? (
                <div
                  className="overlay-table"
                  ref={ref => (tableRef = ref)}
                  id="scroll"
                >
                  <InfiniteScroll
                    scrollableTarget="scroll"
                    dataLength={pageOffset} //This is important field to render the next data
                    next={() => {
                      fetchMoreData(visits);
                      setScrolled(true);
                    }}
                    hasMore={visitsForTable.length < visits.length}
                    loader={<span>Loading...</span>}
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
                          <th scope="col">#</th>
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
                                  <td>{`${index + 1 < 10 ? 0 : ""}${index +
                                    1}`}</td>
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
                                    ].error - 1 || 0}
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
                        <span>{visits.length}</span>
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
                  <LineChart title="Conversations" />
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
