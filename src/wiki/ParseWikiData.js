/**
 * Отправляет запрос к API League of Legends Wiki для получения данных о картах указанного сезона.
 *
 * Запрос состоит из вызова функции из Модуль:LoRData по преобразованию указанной таблицы Lua в JSON с возвращением результата.
 * @param {Number} set номер сезона
 * @returns {Promise<Object<string, Object>>}
 */
export default async function fetchWikiData(set) {
  let url = new URL("https://leagueoflegends.fandom.com/ru/api.php");
  const wikiLuaCall = `{{#invoke:LoRData|toJson|${set}}}`;
  let apiConfig = {
    action: "expandtemplates",
    format: "json",
    prop: "wikitext",
    formatversion: "2",
    text: wikiLuaCall
  };
  let urlParams = new URLSearchParams(apiConfig);
  url.search = urlParams.toString();
  try {
    let result = await fetch(url, { mode: "cors" });
    if(result.ok) {
      let responseBody = await result.json();
      let json = responseBody.expandtemplates.wikitext;
      let wikiLoRData = JSON.parse(json);
      return wikiLoRData;
    } else {
      throw new Error(`Error during Fandom API request. HTTP Code: ${result.status}`);
    }
  } catch(error) {
    if(error instanceof DOMException || error instanceof TypeError) {
      console.error("General error during Fandom API request");
      throw error;
    }
    if(error instanceof SyntaxError) {
      console.error("Error during result JSON parsing / Fandom returned Lua Error");
      throw error;
    }
  }
}