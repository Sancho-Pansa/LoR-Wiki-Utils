import LoRCard from "./LoRCard.js";

import _ from "lodash";
import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {{tip: string, regex: RegExp}[]} */
let regexCollection = [];

const quotesRegex = new RegExp(/"/g);

/**
 *
 * @param {Object[]} jsonArray
 */
export function parseLorData(jsonArray) {
  regexCollection = getRegexes();
  let cardArray = jsonArray.map((e) => {
    let rarity = _.capitalize(e.rarity).replace(/ое$/gm, "ая");
    rarity = rarity === "Нет" ? "None" : rarity;
    let description = addTipTemplate(e.descriptionRaw)
      .replace(/\r?\n/gm, "<br />")
      .replace(quotesRegex, "\\\"");
    let levelUp = addTipTemplate(e.levelupDescriptionRaw).replace(/\r?\n/gm, "<br />");
    let flavorText = e.flavorText.replace(quotesRegex, "\\\"");
    let regions = e.regions.length > 1 ? e.regions : undefined;

    return new LoRCard(
      e.cardCode,
      e.name.replace(quotesRegex, "\\\""),
      e.type,
      rarity,
      e.formats,
      e.subtypes.map(_.capitalize),
      e.supertype,
      e.keywords,
      e.collectible,
      e.cost,
      e.health,
      e.attack,
      description,
      levelUp,
      [],
      [],
      regions,
      flavorText,
      e.artistName,
      false
    );
  }).sort((a, b) => a.id > b.id ? 1 : -1);

  cardArray = guessHiddenCards(cardArray);
  return cardArray;
}

/**
 *
 * @param {String} description
 */
function addTipTemplate(description) {
  regexCollection.forEach((e) => {
    description = description.replace(e.regex, (text) => {
      return e.tip === text ? `{{Tip LoR|${e.tip}}}` : `{{Tip LoR|${e.tip}|${text}}}`;
    });
  });
  return description;
}

/**
 * Данная функция пытается определить "скрытые" карты набора, т.е. карты, которые являются
 * лишь вариантами исполнения одной и той же карты, и на самом деле не представлены как отдельный элемент.
 *
 * Критерии поиска: одноименные карты, причем у одной из них есть T в коде, а у одной из них - нет.
 * @param {LoRCard[]} cardArray - ***сортированный*** массив карт
 */
function guessHiddenCards(cardArray) {
  let currentName;
  for(let card of cardArray) {
    // Если перед Т стоит цифра, значит это не Таргон (MT)
    if(card.id.search(/\dT/) === -1 && card.supertype !== "Чемпион") {
      currentName = card.cardName;
      continue;
    }
    if(card.cardName === currentName) {
      card.isHidden = true;
    }
  }
  return cardArray;
}

/**
 *
 * @returns {{tip: string, regex: RegExp}[]}
 */
function getRegexes() {
  const __filename = fileURLToPath(import.meta.url);
  const REGEXES = `${dirname(__filename)}/../assets/regexes`;
  try {
    let regexFile = readFileSync(REGEXES, { encoding: "utf-8" });
    let regexArray = regexFile.split(/\r?\n/g);
    if(regexArray.length % 2 !== 0) {
      throw new SyntaxError("Error in Regex file: odd line count");
    }
    let regexCollection = [];
    for(let i = 0; i < regexArray.length; i += 2) {
      if(regexArray[i].length < 1 || regexArray.length[i + 1] < 1) {
        continue;
      }
      regexCollection.push({
        tip: regexArray[i],
        regex: new RegExp(regexArray[i + 1], "mi")
      });
    }
    return regexCollection;

  } catch(error) {
    console.error(error);
    throw error;
  }
}