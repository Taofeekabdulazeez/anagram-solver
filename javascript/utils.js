const file = require("node:fs/promises");

async function readAnagramFile(letter) {
  try {
    const data = await file.readFile(`./words/${letter}.json`, "utf8");
    const words = JSON.parse(data);

    return words;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { readAnagramFile };
