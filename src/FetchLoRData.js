function fetchLoRData(set, patch, locale) {
  let url = new URL(new JsonAddress({set, patch, locale}).toUrlString());
  console.log(url);
}

function JsonAddress({patch, set, locale}) {
  const URL = "https://dd.b.pvp.net/";
  this.patch = patch ?? "latest";
  this.set = set;
  this.locale = locale ?? "ru_ru";

  this.toUrlString = () => {
    return `${URL}${this.patch}/set${this.set}/${this.locale}/data/set${this.set}-${this.locale}.json`;
  };
}