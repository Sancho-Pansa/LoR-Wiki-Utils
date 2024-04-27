import LoRCard from "./LoRCard.js";

import _ from "lodash";

/**
 *
 * @param {Object[]} jsonArray
 */
export function parseLorData(jsonArray) {
  return jsonArray.map((e) => {
    return new LoRCard(
      e.cardCode,
      e.name,
      e.type,
      e.rarity,
      e.formats,
      e.subtypes.forEach(_.capitalize),
      e.supertype,
      e.keywords,
      e.collectible,
      e.cost,
      e.health,
      e.attack,
      e.descriptionRaw,
      e.levelupDescriptionRaw,
      [],
      [],
      e.regions,
      e.flavorText,
      e.artistName,
      false
    );
  }).sort((a, b) => a.cardName > b.cardName ? -1 : 1);
}