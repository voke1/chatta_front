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
    console.log("patterns", patterns);

    return output;
  };
  async identify(learnedData, sentence, entity) {
    let matchedResult = { wordsBefore: "", wordsAfter: "", degreeOfMatch: 0 };
    let pattern = {};

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
    }
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
    let result = "";
    if (!matchedResult.wrongWords && matchedResult.wrongWords.length) {
      return false;
    }
    matchedResult.wrongWords.forEach((word, index) => {
      result += !result.length
        ? `${word.charAt(0).toUpperCase()}${word.slice(1)}`
        : ` ${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    });
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
  save = (data, method, api) => {};
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

// const check = async () => {
//   const nerify = new Nerify();
//   const pattern = await nerify.process(trainingData, "name");
//   const learnedData = await nerify.learn(pattern);
//   const result = await nerify.identify(learnedData, "Emeka is my name", "name");
//   console.log(result);
// };
// check();