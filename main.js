import jsonToLua from "json-to-lua";
import fetchLoRData from "./src/riot/FetchLoRData.js";
import { parseLorData } from "./src/ParseLoRData.js";
import writeLuaFile from "./src/WriteLua.js";

async function main() {
  const args = process.argv;
  const setNumber = args[2] ?? "9";
  const patchVersion = args[3] ?? "5.4";
  let a = await fetchLoRData(setNumber);
  let parsed = parseLorData(a);
  let luaObject = {};
  for(let card of parsed) {
    let { id, ...rest } = card;
    luaObject[id] = rest;
  }
  let luaFile = jsonToLua(luaObject, { replacer: { "cardName": "name", "isHidden": "hidden", "lvlDesc": "lvldesc" }, omitFalsies: true });
  writeLuaFile(`Set${setNumber}_V${patchVersion}`, luaFile, setNumber, patchVersion);
  console.log("Write completed");
}

main();