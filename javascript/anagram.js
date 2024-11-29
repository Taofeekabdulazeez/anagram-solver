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

function findAllAnagrams(str) {
  const letters = ["ate", "eat", "pet", "stream", "rats", "eaters"];
  const anagrams = [];

  for (let i = 0; i < letters.length; i++) {
    if (checkAnagram(str, letters[i])) anagrams.push(letters[i]);
  }

  return anagrams;
}

console.log(findAllAnagrams("ates"));

module.exports = { findAllAnagrams };
