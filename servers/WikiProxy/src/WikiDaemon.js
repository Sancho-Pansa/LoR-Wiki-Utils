import http from "http";
import url from "url";
import fetchWikiData from "./ParseWikiData.js";

const PORT = 80;
/**
  Этот сервер принимает запросы на указанный порт в виде `http://localhost/{номер набора}`,
  например `http://localhost/6`, после чего вызывает для указанного числа данные из {@link fetchWikiData}
*/
const server = http.createServer(async (req, res) => {
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
    console.error(e);
    res.end(error.message);
    return;
  }
  console.log("Data from Fandom has been fetched successfully");
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(JSON.stringify(result));
});

server.listen(PORT, () => {
  console.log("Proxy to Fandom has successfully started");
});