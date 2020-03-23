import moment from "moment-timezone";
import socket from "socket.io-client";
import axios from "axios";
import { APP_ENVIRONMENT } from "../../../../../environments/environment";

import milliToTime from "../../../../../utilities/milli-time";
import * as apiService from "../../../../../services/apiservice";
const BASE_URL = APP_ENVIRONMENT.base_url;
const io = socket(BASE_URL, { transports: ["websocket"] });
export default class AnalyticsHelper {
  constructor(callbacks, state) {
    this.callbacks = callbacks;
    this.state = state;
  }

  /**
   * This function extracts and formats specific data from the visitors data for analysis
   * @param {Array} visits - contains an array of visits
   * @param {string} type - property of the visitors object needed for analysis. E.g cities, country
   * @returns {object} contains the final output which can be fed into charts or tables for analysis
   */

  async extractAndFormatData(visits, type) {
    const labels = [];
    const uniqueLabels = [];
    const frequency = [];
    const averageSession = [];
    const checked = [];
    const regionName = [];
    let label;
    if (visits.length) {
      visits.forEach(visit => {
        const { time, region_name, continent_name } = visit;
        if (type === "by_date") {
          label = time.split(" ")[0];
        } else if (type === "by_time") {
          label = time.split(" ");
        } else {
          label = visit[type];
        }
        labels.push(label);
        if (regionName && continent_name) {
          regionName.push(
            `${continent_name}/${region_name.split(" ").join("_")}`
          );
        }

        if (!uniqueLabels.includes(label)) uniqueLabels.push(label);
      });
    }

    // get the frequency
    if (type === "by_time") {
      let newLabel = [];

      this.convertLocal(labels, regionName)
        .then(result => {
          newLabel = result;
          const hour = [];
          const frequency = [];
          for (let index = 0; index < 24; index += 1) {
            let countHour = 0;
            result.forEach(label => {
              const hour = label
                .toString()
                .split(" ")[1]
                .split(":")[0];
              if (parseInt(hour, 10) === index) countHour += 1;
            });
            if (index === 0) {
              hour.push("00");
            } else {
              hour.push(index);
            }
            frequency.push(countHour);
          }
          if (frequency.length) {
            this.callbacks.setTodaysData({
              labels: [
                "12am",
                "1am",
                "2am",
                "3am",
                "4am",
                "5am",
                "6am",
                "7am",
                "8am",
                "9am",
                "10am",
                "11am",
                "12pm",
                "1pm",
                "2pm",
                "3pm",
                "4pm",
                "5pm",
                "6pm",
                "7pm",
                "8pm",
                "9pm",
                "10pm",
                "11pm"
              ],
              frequency,
              allLabels: labels
            });
            this.callbacks.setShowProgress(false);
          } else {
            this.callbacks.setTodaysData({});
          }
        })
        .catch(error => console.log("error message", error));
    } else {
      labels.forEach((label, index) => {
        let count = 0;

        if (!checked.includes(label)) {
          const allLabel = [];
          for (let index = 0; index < labels.length; index += 1) {
            if (labels[index] === label) {
              count += 1;
              allLabel.push(visits[index].session);
            }
          }

          checked.push(label);
          averageSession.push(allLabel);
          frequency.push(count);
        }
      });
      return {
        labels: uniqueLabels,
        allLabels: labels,
        frequency,
        averageSession: this.getAverageTime(averageSession)
          ? this.getAverageTime(averageSession)
          : null
      };
    }
  }

  /**
   * This function makes a call to the api to return visitors data based on date, data limit, type and id
   * @param {Array} dates - contains an array of date range
   * @param {string} type - type of requests
   * @param {number} limit - specifies how much data to be returned
   * @param {string} botID - specifies which bot whose visitors datashould be returned
   * @returns {Array} contains objects which contains the visitors information
   */

  findVisitsInRangeAndLimit = async (dates, botId, limit) => {
    const visitsInRange = [];
    this.callbacks.setPaginate(false);
    const data = await apiService.get(
      "visitors",
      `${new Date(dates[0])}*${new Date(dates[1])}*${limit}/${botId}`
    );
    data.forEach(visit => visitsInRange.push(visit.visitors));
    return visitsInRange;
  };
  findAllVisitsInRange = async (dates, botId) => {
    const visitsInRange = [];

    const dataForPaginate = await apiService.get(
      "visitors",
      `${new Date(dates[0])}*${new Date(dates[1])}/${botId}`
    );
    dataForPaginate.forEach(visit => visitsInRange.push(visit.visitors));
    return visitsInRange;
  };
  findAllVisitsAndLimit = async (botId, limit) => {
    const allVisits = [];
    const data = await apiService.get(
      `visitors/all`,
      `${parseInt(limit, 10) || this.state.recordLimit}/${botId}`
    );
    data.forEach(visit => allVisits.push(visit.visitors));
    return allVisits;
  };
  fetchVisits = async (dates, limit, type, botID) => {
    if (type === "pagify") {
      this.callbacks.setShowTableProgress(true);
    } else {
      this.callbacks.setShowProgress(true);
      this.callbacks.setShowTable(false);
      this.callbacks.setIsData(true);
    }

    try {
      let data;
      if (dates) {
        this.callbacks.setPaginate(false);
        data = await this.findVisitsInRangeAndLimit(dates, botID, limit);
        const allVisitsInRange = await this.findAllVisitsInRange(dates, botID);
        this.state.visitors = allVisitsInRange;
        this.callbacks.setAllRecord(allVisitsInRange);
        this.callbacks.setFirstLast([1, this.state.recordLimit]);
        this.callbacks.setShowProgress(false);
      } else {
        data = await this.findAllVisitsAndLimit(botID, limit);
      }

      this.callbacks.setVisitorData(data);
      this.callbacks.setShowTableProgress(false);
      this.state.visitors = data;
      if (!this.state.visitors.length) {
        this.callbacks.setIsData(false);
        this.callbacks.setShowTable(false);
        this.callbacks.setShowProgress(false);
      } else {
        this.callbacks.setIsData(true);
      }
      this.callbacks.setTerm("");
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * This function takes in raw date as the input and outputs a formatted string in YY-MM-DD HH:MM
   * @param {Date} time - date string
   * @returns {object} formatted date string
   */

  getDate = time => {
    return `${time.getFullYear()}-${time.getMonth() +
      1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
  };

  /**
   * This function returns and saves the region time of the client
   * @returns {object} formatted date string
   */

  getLocalTimezone = async () => {
    const continentCodes = {
      AS: "Asia",
      AF: "Africa",
      AN: "Antarctica",
      NA: "North America",
      EU: "Europe",
      OC: "Ocenia",
      SA: "South America"
    };
    let timezone;
    try {
      const result = await axios.get("https://ipapi.co/json/");
      const visitor = result.data;
      const { region } = visitor;
      visitor.continent_name = continentCodes[visitor.continent_code];
      visitor.region_name = region;

      const regionName = region
        .toString()
        .split(" ")
        .join("_");
      timezone = `${visitor.continent_name}/${regionName}`;
    } catch (error) {
      console.log("request error", error);
    }

    return timezone;
  };

  /**
   * This function converts visitors date and time to the clients local date and time
   * @param {Array} labels - contains an array of date strings
   * @param {string} regionName - visitors region name E.g America/New_York
   * @returns {String} contains date string of the converted dates
   */

  convertLocal(labels, regionName) {
    const converted = [];
    return new Promise(async (resolve, reject) => {
      for (let index = 0; index < labels.length; index += 1) {
        const localtime = await this.getLocalTimezone();

        const visitorsTime = await moment.tz(
          `${labels[index][0]} ${labels[index][1]}`,
          regionName[index]
        );
        const localizedTime = await visitorsTime.clone().tz(localtime);

        if (localizedTime._d) {
          converted.push(this.getDate(localizedTime._d));
        }
      }
      if (converted.length) {
        resolve(converted);
        this.callbacks.setShowProgress(false);
      } else {
        reject("nothing converted");
        this.callbacks.setTodaysData({});
        this.callbacks.setShowProgress(false);
      }
    });
  }

  /**
   * This function contains logic for pagifying a table: <Previous Next> and skipping to a page number
   * @param {Number} page - the page number to jump to
   * @returns {Array} contains the specified page
   */

  pagify = async page => {
    this.callbacks.setPaginate(true);
    await this.fetchVisits(
      null,
      this.state.recordLimit * page,
      "pagify",
      this.state.botId
    );
    let allRecords;
    if (this.state.visitors.length % this.state.recordLimit !== 0) {
      const start =
        this.state.visitors.length -
        (this.state.visitors.length % this.state.recordLimit) +
        1;
      allRecords = this.state.visitors.slice(
        this.state.visitors.length -
          (this.state.visitors.length % this.state.recordLimit),
        this.state.visitors.length
      );

      this.callbacks.setOffset(start);
      this.callbacks.setFirstLast([
        start,
        start + (this.state.visitors.length % this.state.recordLimit) - 1
      ]);
    } else {
      const start = this.state.visitors.length - this.state.recordLimit + 1;
      allRecords = this.state.visitors.slice(
        this.state.visitors.length - this.state.recordLimit,
        this.state.visitors.length
      );
      this.callbacks.setOffset(start);
      this.callbacks.setFirstLast([start, start + this.state.recordLimit - 1]);
    }

    this.state.visitors = allRecords;
    this.callbacks.setVisitorData(allRecords);
  };

  /**
   * This function returns visitors data for the current date
   * @param {String} botId - the is of the bot whose data should be returned
   * @returns {Array} contains the specified page
   */

  getTodayData = async (botId, newTime) => {
    const time = newTime || new Date();
    const dateStart = `${time.getMonth() +
      1}/${time.getDate()}/${time.getFullYear()}`;

    const dateEnd = `${time.getMonth() + 1}/${time.getDate() +
      1}/${time.getFullYear()}`;

    const dates = [dateStart, dateEnd];
    let allVisits = [];
    try {
      allVisits = await this.findAllVisitsInRange(dates, botId);
    } catch (error) {
      console.log(error.message);
    }
    const sessionArray = await this.extractAndFormatData(allVisits, "ipv4");
    this.callbacks.setAverageSession(sessionArray.averageSession[0]);
    return allVisits;
  };
  getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  getDaysAgo = async dayAgo => {
    const time = new Date();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();
    let day = time.getDate();
    const newDay = day - dayAgo;
    if (newDay <= 0) {
      month = month - 1;
      day = newDay + this.getDaysInMonth(month, year);

      if (month < 1) {
        month = 12;
      }
    } else {
      day -= dayAgo;
    }
    return new Date(`${month}/${day}/${year}`);
  };

  extractConversations = async allVisits => {
    if (!allVisits.length) {
      return false;
    }
    let messages = 0;
    let errors = 0;
    const visits = allVisits.filter(visit => visit.conversations.length);
    visits.forEach(visit => {
      messages += visit.conversations.length;
      const convoIndex = visit.conversations.length - 1;
      if (visit.conversations[convoIndex]) {
        const error = visit.conversations[convoIndex].error;

        if (error) errors += parseInt(error, 10);
      }
    });
    return {
      visits,
      messages,
      errors
    };
  };

  /**
   * Calcluates the average sentiment and order the keywords
   * @param {Array} data - contains all the viditors data
   * @returns {Object} contains the analyzed sentiments and ordered keywords
   */

  analyzeKeywords = data => {
    const analyticsData = [];
    let keywords = [];
    let sentiments = [];
    const uniqueSentimentLabels = [];
    const uniqueSentimentFrequency = [];
    const percentageSentiment = [];
    const uniqueKeywordLabel = [];
    const uniqueKeywordFrequency = [];
    data.forEach(visit => {
      if (visit.keywordAnalytics) analyticsData.push(visit.keywordAnalytics);
    });
    analyticsData.forEach(data => {
      data.keywords.forEach(keyword =>
        keyword.phrases.length
          ? keyword.phrases.forEach(keyword => keywords.push(keyword))
          : null
      );
      data.sentiments.forEach(sentiment => sentiments.push(sentiment));
    });

    sentiments.filter(sentiment =>
      !uniqueSentimentLabels.includes(sentiment.documentSentiment)
        ? uniqueSentimentLabels.push(sentiment.documentSentiment)
        : null
    );
    uniqueSentimentLabels.forEach(label => {
      let count = 0;
      sentiments.forEach(sentiment => {
        if (label === sentiment.documentSentiment) count += 1;
      });
      uniqueSentimentFrequency.push(count);
    });
    keywords.filter(keyword =>
      !uniqueKeywordLabel.includes(keyword)
        ? uniqueKeywordLabel.push(keyword)
        : null
    );
    uniqueKeywordLabel.forEach(label => {
      let count = 0;
      keywords.forEach(keyword => {
        if (label === keyword) count += 1;
      });
      uniqueKeywordFrequency.push(count);
    });
    let totalSentiments = 0;
    uniqueSentimentFrequency.forEach(
      frequency => (totalSentiments += frequency)
    );
    uniqueSentimentFrequency.forEach(frequency =>
      percentageSentiment.push(((frequency / totalSentiments) * 100).toFixed(2))
    );
    return {
      sentiments: {
        uniqueSentimentLabels,
        uniqueSentimentFrequency,
        percentageSentiment
      },
      keywords: {
        uniqueKeywordLabel,
        uniqueKeywordFrequency
      }
    };
  };
  /**
   * Calculates the average time spent by visitors
   * @param {Array} sessions - contains all the time spent
   * @returns {Array} the average time spent on the bot
   */

  getAverageTime = sessions => {
    const averages = [];
    sessions.forEach(session => {
      let totalSession = 0;
      session.forEach(time => {
        if (time) {
          const timeStrings = time.split(":");
          const secondsToMilli = parseInt(timeStrings[2], 10) * 1000;
          const minutesToMilli = parseInt(timeStrings[1], 10) * 60 * 1000;
          const hoursToMilli = parseInt(timeStrings[0], 10) * 60 * 60 * 1000;
          const totalMilli = secondsToMilli + minutesToMilli + hoursToMilli;
          totalSession += totalMilli;
        }
      });
      const average = totalSession / session.length;
      averages.push(milliToTime(average));
    });
    return averages;
  };

  /**
   * Returns all the bots specific to the user
   * @returns {Array} contains the bots specific to the user; the bot name and the id
   */

  fetchBots = () => {
    const clientId = JSON.parse(localStorage.getItem("userdetails")).id;
    apiService
      .get("tree/all", clientId)
      .then(async res => {
        if (!res.length) {
          this.callbacks.setIsData(false);
          this.callbacks.setShowProgress(false);
        } else {
          const bots = [];
          const chatBody = res;
          chatBody.forEach(body => {
            bots.push({
              botName: body.setting_id.chatbotName,
              botId: body._id
            });
          });
          this.callbacks.setBots(bots);
          await this.callbacks.setBotId(bots[0].botId);

          //
          await this.collectVisits(bots[0].botId);
          this.callbacks.setIsData(true);
        }
      })
      .catch(err => console.log(err.message));
  };

  /**
   * Delivers real-time counts of the number of visitors online
   * @param {String} botId - the id specific to the user
   * @returns {Number} the average time spent on the bot
   */

  getOnlineCounts = botId => {
    io.on("msgToClient", message => {
      const users = message.filter(message => message.botId === botId);
      this.callbacks.setActiveUsers(users.length);
    });
  };

  /**
   * Calculates the number of repeated visits
   * @param {Array} uniqueVisits - contains the frequency of visits
   * @returns {Number} returns total number of repeat visits
   */

  getRepeatVisits = uniqueVisits => {
    return uniqueVisits.frequency.filter(frequency => frequency > 1).length;
  };

  /**
   * This function returns and sets visits specific to the chatbot
   * @param {String} sessions - contains all the time spent
   * @returns {Array} the id of the bots whose information are to be returned
   */

  collectVisits = async botId => {
    this.getOnlineCounts(botId);
    this.callbacks.setBotId(botId);
    await this.fetchVisits(null, null, null, botId);
    const records = [];

    try {
      const data = await apiService.get("visitors", botId);
      data.forEach(visit => records.push(visit.visitors));
      await this.callbacks.setGlobal({
        records
      });
      this.callbacks.setAllRecord(records);
      this.callbacks.setFirstLast([1, this.state.recordLimit]);
      this.callbacks.setDataset(
        await this.extractAndFormatData(records, "by_date")
      );
      this.callbacks.setTopContinents(
        await this.extractAndFormatData(records, "continent_name")
      );
      this.callbacks.setTopCountries(
        await this.extractAndFormatData(records, "country_name")
      );
      this.callbacks.setTopCities(
        await this.extractAndFormatData(records, "city")
      );
      this.callbacks.setBrowser(
        await this.extractAndFormatData(records, "browser")
      );
      this.callbacks.setUniqueVisits(
        await this.extractAndFormatData(records, "ip")
      );
      this.callbacks.setRepeatVisit(
        this.getRepeatVisits(await this.extractAndFormatData(records, "ip"))
      );
      this.callbacks.setLeads(await this.extractAndFormatData(records, "lead"));
      const todayData = await this.getTodayData(botId);

      await this.extractAndFormatData(todayData, "by_time");

      await this.callbacks.setTodayLeads(
        await this.extractAndFormatData(todayData, "lead")
      );
    } catch (error) {
      console.log(error.message);
    }
  };
}
