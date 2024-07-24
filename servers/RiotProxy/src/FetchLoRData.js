/**
 * Составляет запрос на API Riot Games для получения JSON с информацией об указанном сезоне игры.
 *
 * Значения аргументов совпадают с правилами на https://developer.riotgames.com/docs/lor#data-dragon_set-bundles
 * @param {String} set Номер сезона LoR
 * @param {String} patch Код обновления игры
 * @param {String} locale Локализация игры
 * @returns {Promise<Object>}
 */
export default async function fetchLoRData(set, patch, locale) {
  let url = new URL(new JsonAddress({ set, patch, locale }).toUrlString());

  let response = await fetch(url);
  if(response.ok) {
    return await response.json();
  }
  else {
    throw new Error(`Error during Riot API request. HTTP Code: ${result.status}`);
  }
}

function JsonAddress({ patch, set, locale }) {
  const URL = "https://dd.b.pvp.net/";
  this.patch = patch ?? "latest";
  this.set = set;
  this.locale = locale ?? "ru_ru";

  this.toUrlString = () => {
    return `${URL}${this.patch}/set${this.set}/${this.locale}/data/set${this.set}-${this.locale}.json`;
  };
}