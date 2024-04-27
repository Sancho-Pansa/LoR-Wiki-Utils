import fetchLoRData from "./src/FetchLoRData.js";
import { parseLorData } from "./src/ParseLoRData.js";
import JsonToLua from "json-to-lua";

(async () => {
  let a = await fetchLoRData("5");
  let parsed = parseLorData(a);
  console.log(JsonToLua(parsed));
})();