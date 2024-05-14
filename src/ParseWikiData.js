async function fetchWikiData() {
  let url = "https://leagueoflegends.fandom.com/ru/api.php?action=expandtemplates&format=json&prop=wikitext&formatversion=2&text={{%23invoke:LoRData|toJson|4}}";
  let result = await fetch(url);
  if(result.ok) {
    let responseBody = await result.json();
    let json = responseBody.expandtemplates.wikitext;
    let wikiLoRData = JSON.parse(json);
    for(let [key, value] of Object.entries(wikiLoRData)) {
      console.log(key, value.name);
    }
  }
}

fetchWikiData();