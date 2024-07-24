import http from "http";
import url from "node:url";
import fetchLoRData from "./FetchLoRData.js";

const RIOT_DATA_PORT = 8000;
/**
  Этот сервер принимает запросы на указанный порт в виде `http://localhost/?set={номер набора}&patch={номер обновления}&locale={локализация}`,
  после чего вызывает для указанного числа данные из {@link FetchLoRData}
*/
const cardDataServer = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  const { set, patch, locale } = query;
  let result = {};
  try {
    if(set === undefined) {
      throw new SyntaxError("Set value is undefined");
    }
    result = await fetchLoRData(set, patch, locale);
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

cardDataServer.listen(RIOT_DATA_PORT, () => {
  console.log("Proxy to Riot API has been successfully started");
});