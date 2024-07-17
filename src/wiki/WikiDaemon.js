import http from "http";
import url from "url";
import fetchWikiData from "./ParseWikiData.js";

const port = 10000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const setNumber = parsedUrl.query.set;
  let result = {};
  try {
    result = await fetchWikiData(setNumber);
  } catch(e) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    console.error(e);
    res.end("Error");
    return;
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(JSON.stringify(result));
});

server.listen(port, () => {
  console.log("Start");
});