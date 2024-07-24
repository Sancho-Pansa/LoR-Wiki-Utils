import http from "http";
import url from "url";
import fetchWikiData from "./ParseWikiData.js";
import getWikiFileUrl from "./GetWikiFileUrl.js";

const CARD_DATA_PORT = 8000;
const FILE_PORT = 8080;
/**
  Этот сервер принимает запросы на указанный порт в виде `http://localhost/{номер набора}`,
  например `http://localhost/6`, после чего вызывает для указанного числа данные из {@link fetchWikiData}
*/
const cardDataServer = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const setNumber = parsedUrl.pathname.slice(1);
  let result = {};
  try {
    result = await fetchWikiData(setNumber);
  } catch(error) {
    res.statusCode = 400;
    if(error instanceof SyntaxError) {
      res.statusCode = 422;
    }
    res.setHeader("Content-Type", "text/plain");
    console.error(error);
    res.end(error.message);
    return;
  }
  console.log("Data from Fandom has been fetched successfully");
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(JSON.stringify(result));
});

let fileServer = http.createServer(async (req, res) => {
  let result = "";
  try {
    const parsedUrl = url.parse(req.url, true);
    const filename = parsedUrl.pathname.slice(1);
    result = await getWikiFileUrl(filename);
    console.log(result);
  } catch(error) {
    res.statusCode = 400;
    if(error instanceof SyntaxError) {
      res.statusCode = 422;
    }
    res.setHeader("Content-Type", "text/plain");
    console.error(error);
    res.end(error.message);
    return;
  }
  console.log("Data from Fandom has been fetched successfully");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(result);
});

cardDataServer.listen(CARD_DATA_PORT, () => {
  console.log("Proxy to Fandom has been successfully started");
});

fileServer.listen(FILE_PORT, () => {
  console.log("Proxy to Fandom rest.api has been successfully started");
});