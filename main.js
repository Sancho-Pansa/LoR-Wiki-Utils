import fetchLoRData from "./src/FetchLoRData.js";

(async () => {
  let a = await fetchLoRData("5");
  console.log(Object.keys(a));
})();