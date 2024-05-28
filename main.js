import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";

/*import jsonToLua from "json-to-lua";
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
}*/

//main();
const createWindow = () => {
  const PRELOAD_PATH = "/src/electron-ui/preloader.cjs";
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(app.getAppPath(), PRELOAD_PATH)
    }
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
  ipcMain.on("set-title", () => console.log("Click"));
  app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if(process.platform !== "darwin") app.quit();
});