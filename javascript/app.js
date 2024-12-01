const express = require("express");
const utils = require("./utils");
const anagaram = require("./anagram");
const cors = require("cors");

const PORT = 8000;

const app = express();

const loggerMiddleWare = (req, res, next) => {
  next();
};

app.use(loggerMiddleWare);
app.use(cors());

app.get("/anagram/:word", async (req, res) => {
  const { word } = req.params;
  // const data = await utils.readAnagramFile(word);
  const words = await anagaram.findAllAnagrams(word);
  res.send({ results: words.length, words });
});

app.get("/favicon.ico", (req, res) => res.status(204));

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
