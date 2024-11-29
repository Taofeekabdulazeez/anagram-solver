const express = require("express");
const utils = require("./utils");
const anagaram = require("./anagram");

const PORT = 8000;

const app = express();

const loggerMiddleWare = (req, res, next) => {
  next();
};

app.use(loggerMiddleWare);

app.get("/:word", async (req, res) => {
  const { word } = req.params;
  const data = await utils.readAnagramFile(word);
  // const words = anagaram.findAllAnagrams(word)
  res.send({ results: data?.length, words: data });
});

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
