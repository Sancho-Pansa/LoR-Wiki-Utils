export default class LoRCard {
  constructor(
    id,
    cardName,
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
    flavour,
    artist,
    isHidden
  ) {
    this.id = id;
    this.cardName = cardName;
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
    this.flavour = flavour;
    this.artist = artist;
    this.isHidden = isHidden;
  }
}