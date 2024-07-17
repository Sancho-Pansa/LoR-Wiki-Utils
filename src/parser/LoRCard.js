/**
 * Класс, обозначающий карту Legends of Runeterra.
 */
export default class LoRCard {
  /**
   *
   * @param {String} id
   * @param {String} name
   * @param {String} type
   * @param {"Чемпион"|"Эпическая"|"Редкая"|"Обычная"|"None"} rarity
   * @param {String[]} formats
   * @param {String[]} subtype
   * @param {String} supertype
   * @param {String[]} keywords
   * @param {Boolean} collectible
   * @param {Number} cost
   * @param {Number} health
   * @param {Number} power
   * @param {String} desc
   * @param {String} lvlDesc
   * @param {String[]} keywordRefs
   * @param {String[]} categoryRefs
   * @param {String[]} regions
   * @param {String} flavor
   * @param {String} artist
   * @param {Boolean} isHidden
   */
  constructor(
    id,
    name,
    type,
    rarity,
    formats,
    subtype,
    supertype,
    keywords,
    collectible,
    cost,
    health,
    power,
    desc,
    lvlDesc,
    keywordRefs,
    categoryRefs,
    regions,
    flavor,
    artist,
    isHidden
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.rarity = rarity;
    this.formats = formats;
    this.subtype = subtype;
    this.supertype = supertype;
    this.keywords = keywords;
    this.collectible = collectible;
    this.cost = cost;
    this.health = health;
    this.power = power;
    this.desc = desc;
    this.lvlDesc = lvlDesc;
    this.keywordRefs = keywordRefs;
    this.categoryRefs = categoryRefs;
    this.regions = regions;
    this.flavor = flavor;
    this.artist = artist;
    this.isHidden = isHidden;
  }
}