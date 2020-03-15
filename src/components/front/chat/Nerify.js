import axios from "axios";
import words from "../conversation/dictionary.json";

// a program that finds the degree of match between two sentences
export default class Nerify {
  async process(trainingData, namedEntity) {
    const data = trainingData.filter(data =>
      Object.keys(data).includes(namedEntity)
    );
    const patterns = [];
    for (let index = 0; index < data.length; index += 1) {
      const pattern = {
        wordsBefore: "",
        wordsAfter: ""
      };
      const { sentence } = data[index];
      const entity = data[index][namedEntity];
      const sentenceArray = sentence.split(" ");
      const endIndex = sentenceArray.indexOf(entity.split(" ")[0]);
      const beginIndex =
        sentence
          .split(" ")
          .indexOf(entity.split(" ")[entity.split(" ").length - 1]) + 1;
      const wordsBefore = sentence.split(" ").splice(0, endIndex);
      const wordsAfter = sentence
        .split(" ")
        .splice(beginIndex, sentence.split(" ").length - 1);
      pattern.wordsBefore = wordsBefore.join(" ");
      pattern.wordsAfter = wordsAfter.join(" ");
      pattern.recognizedPattern = `${
        pattern.wordsBefore
      } ${namedEntity.toUpperCase()} ${pattern.wordsAfter}`;
      patterns.push(pattern);
    }
    return patterns;
  }
  getPartsOfSpeech = word => {
    const partsOfSpeech = [];
    const { definitions } = words[word] ? words[word] : [];
    if (definitions && definitions.length) {
      definitions.forEach(definition =>
        partsOfSpeech.push(definition.part_of_speech)
      );
    }
    return partsOfSpeech;
  };
  learn = patterns => {
    const pattern1 = [...patterns];
    const pattern2 = [...patterns];
    let output = [];
    for (let index = 0; index < pattern1.length; index += 1) {
      let count = 0;
      for (let i = 0; i < pattern2.length; i += 1) {
        if (
          pattern2[i].wordsBefore === pattern1[index].wordsBefore &&
          pattern2[i].wordsAfter === pattern1[index].wordsAfter
        ) {
          count += 1;
        }
      }
      if (count > 1) {
        pattern1.splice(index, 1);
        if (pattern1[index]) {
          pattern1[index].score = count;
        }

        output = pattern1;
      } else {
        output = pattern1;

        pattern1[index].score = count;
      }
    }

    return output;
  };
  firstLetterToUpperCase = wordArray => {
    let result = "";
    wordArray.forEach((word, index) => {
      result += !result.length
        ? `${word.charAt(0).toUpperCase()}${word.slice(1)}`
        : ` ${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    });
    console.log("resultss", result);
    return result;
  };

  getName = sentenceArray => {
    let names = [];
    for (let index = 0; index < sentenceArray.length; index += 1) {
      const partOfSpeech = this.getPartsOfSpeech(sentenceArray[index]);
      if (
        (partOfSpeech.includes("noun") || partOfSpeech.length === 0) &&
        !partOfSpeech.includes("preposition") &&
        !partOfSpeech.includes("verb") &&
        !partOfSpeech.includes("adverb") &&
        !partOfSpeech.includes("conjunction")
      ) {
        names.push(sentenceArray[index]);
      } else {
        break;
      }
    }
    return names;
    // const names = sentenceArray.filter(sentenceWord => {
    //   const partOfSpeech = this.getPartsOfSpeech(sentenceWord.toLowerCase());
    //   console.log("parts", partOfSpeech);
    //   if (
    //     (partOfSpeech.includes("noun") || partOfSpeech.length === 0) &&
    //     !partOfSpeech.includes("preposition") &&
    //     !partOfSpeech.includes("verb") &&
    //     !partOfSpeech.includes("adverb") &&
    //     !partOfSpeech.includes("conjunction")
    //   ) {
    //     return sentenceWord;
    //   }
    // });
    // console.log("sentence array", names);

    // return names;
  };
  async identify(learnedData, sentence, entity) {
    let matchedResult = {
      wordsBefore: "",
      wordsAfter: "",
      degreeOfMatch: 0
    };
    let pattern = {};
    let randomGuess = "";

    let wordsBeforeMatch = { wordsBefore: "" };
    let wordsAfterMatch = { wordsAfter: "" };

    for (let index = 0; index < learnedData.length; index += 1) {
      if (learnedData[index]) {
        const sentencePattern = learnedData[index].recognizedPattern
          .toString()
          .toLowerCase();
        const inputSentence = sentence.toString().toLowerCase();

        try {
          const matched = await this.compare(sentencePattern, inputSentence);
          if (matched.degreeOfMatch > matchedResult.degreeOfMatch) {
            matchedResult = matched;
            pattern = learnedData[index];
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (
        learnedData[index].wordsBefore.length &&
        sentence
          .toLowerCase()
          .includes(learnedData[index].wordsBefore.toLowerCase())
      ) {
        if (
          learnedData[index].wordsBefore.length >
          wordsBeforeMatch.wordsBefore.length
        )
          wordsBeforeMatch = learnedData[index];
      }
      if (
        learnedData[index].wordsAfter.length &&
        sentence
          .toLowerCase()
          .includes(learnedData[index].wordsAfter.toLowerCase())
      ) {
        if (
          learnedData[index].wordsAfter.length >
          wordsAfterMatch.wordsAfter.length
        )
          wordsAfterMatch = learnedData[index];
      }
    }

    const sentenceArray = sentence.split(" ");
    if (wordsBeforeMatch.wordsBefore.length) {
      sentenceArray.splice(
        0,
        sentenceArray.indexOf(
          wordsBeforeMatch.wordsBefore.split(" ")[
            wordsBeforeMatch.wordsBefore.split(" ").length - 1
          ]
        ) + 1
      );
    }

    if (wordsAfterMatch.wordsAfter.length) {
      sentenceArray.splice(
        sentenceArray.indexOf(wordsAfterMatch.wordsAfter.split(" ")[0]),
        sentenceArray.length
      );
    }
    if (!wordsBeforeMatch.length) {
      const names = this.getName(sentenceArray);
      randomGuess = this.firstLetterToUpperCase(names);
    }

    if (!wordsAfterMatch.length) {
      const names = this.getName(sentenceArray);
      randomGuess = this.firstLetterToUpperCase(names);
    }
    console.log("sentence", randomGuess);
    if (matchedResult.wordsBefore === "" && matchedResult.wordsAfter === "") {
      matchedResult.degreeOfMatch = 100;
      pattern.recognizedPattern = entity.toUpperCase();
      return {
        match: {
          matchedWords: [sentence],
          wrongWords: [],
          unmatchedWords: [],
          degreeOfMatch: 100,
          consecutiveMatch: [sentence]
        },
        pattern,
        result: {
          [entity]: sentence,
          accuracy: `100%`
        }
      };
    }
    if (!matchedResult.wrongWords && matchedResult.wrongWords.length) {
      return false;
    }
    const result =
      matchedResult.wrongWords.length <= 2
        ? this.firstLetterToUpperCase(matchedResult.wrongWords)
        : this.firstLetterToUpperCase(randomGuess.split(" "));
    return {
      match: matchedResult,
      pattern,
      result: {
        [entity]: result,
        accuracy: `${matchedResult.degreeOfMatch}%`
      }
    };
  }
  compare = async (sentence1, sentence2) => {
    return new Promise((resolve, reject) => {
      const sentence1Words = sentence1.split(" ");
      const sentence2Words = sentence2.split(" ");
      const matchedWords = [];
      const wrongWords = [];
      const consecutiveMatch = [];
      let unmatchedWords = [];

      for (let index = 0; index < sentence2Words.length; index += 1) {
        if (sentence1Words.includes(sentence2Words[index])) {
          matchedWords.push(sentence2Words[index]);
          if (!wrongWords.length) consecutiveMatch.push(sentence2Words[index]);
        } else {
          wrongWords.push(sentence2Words[index]);
        }
      }
      if (wrongWords.length) {
        unmatchedWords = sentence1Words.filter(
          word => !matchedWords.includes(word)
        );
      }
      const degreeOfMatch = Math.round(
        (matchedWords.length / sentence1Words.length) * 100
      );
      if (degreeOfMatch) {
        resolve({
          matchedWords,
          wrongWords,
          unmatchedWords,
          degreeOfMatch,
          consecutiveMatch
        });
      } else {
        reject(false);
      }
    });
  };
  // saves the learned or training data
  save = async (data, method, api) => {
    axios[method](api, method !== "get" ? data : null)
      .then(res => {
        console.log("training response", res);
      })
      .catch(error => {
        console.log("training error", error);
      });
  };
}

///////////////////////////////////////////////////////////////////

const trainingData = [
  { sentence: "my name is Christian Nwodo and you ?", name: "Christian Nwodo" },
  { sentence: "my name is Christian Nwodo and you ?", name: "Christian Nwodo" },

  { sentence: "my name is Christian", name: "Christian" },
  { sentence: "I am Christian Nwodo", name: "Christian Nwodo" },
  { sentence: "I am Christian Nwodo", name: "Christian Nwodo" },

  { sentence: "I am Christian Nwodo", name: "Christian Nwodo" },
  { sentence: "Christian is my name", name: "Christian" },
  {
    sentence: "I am called Christian Chukwuemeka",
    name: "Christian Chukwuemeka"
  },
  { sentence: "My friends call me Chrismeeky", name: "Chrismeeky" },
  { sentence: "I am known as Cathy", name: "Cathy" },
  { sentence: "Christian Nwodo", name: "Christian Nwodo" }
];

const check = async () => {
  const nerify = new Nerify();
  const pattern = await nerify.process(trainingData, "name");
  const learnedData = await nerify.learn(pattern);
  const result = await nerify.identify(learnedData, "Emeka is my name", "name");
  console.log(result);
};
check();
