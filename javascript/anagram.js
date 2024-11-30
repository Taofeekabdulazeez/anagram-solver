const utils = require("./utils");

function checkAnagram(str, subStr) {
  if (str.length < subStr.length) return false;
  const strFreq = getLettersFreqCount(str);
  const subStrFreq = getLettersFreqCount(subStr);

  const subStrEntries = Object.entries(subStrFreq);

  for (let i = 0; i < subStrEntries.length; i++) {
    const [key, value] = subStrEntries[i];

    if (!strFreq[key] || strFreq[key] < value) return false;
  }

  return true;
}

function getLettersFreqCount(str) {
  const countObj = {};
  for (let i = 0; i < str.length; i++) {
    if (countObj[str[i]]) {
      countObj[str[i]]++;
    } else {
      countObj[str[i]] = 1;
    }
  }

  return countObj;
}

function getUniqueLetters(str) {
  const strArr = str.toLowerCase().split("").sort();
  return [...new Set(strArr)];
}

async function findAllAnagrams(str) {
  const uniqueLetters = getUniqueLetters(str);

  const letterArrs = await Promise.all(
    uniqueLetters.map(async (letter) => utils.readAnagramFile(letter))
  );
  console.log(letterArrs);
  const letters = letterArrs.flat();
  const anagrams = [];

  for (let i = 0; i < letters.length; i++) {
    if (checkAnagram(str, letters[i])) anagrams.push(letters[i]);
  }

  return anagrams;
}

module.exports = { findAllAnagrams };
