/**
 * Возвращает URL указанного файла с фандома League of Legends в строковом виде
 * @param {String} filename Название файла
 * @returns {Promise<String>}
 * @throws {DOMException|TypeError|SyntaxError}
 */
export default async function getWikiFileUrl(filename) {
  let url = new URL(`https://leagueoflegends.fandom.com/ru/rest.php/v1/file/File:${filename}`);
  console.log(url.toString());
  let result = await fetch(url);
  if(result.ok) {
    let responseBody = await result.json();
    let imageUrl = responseBody.preferred.url;
    return imageUrl;
  } else {
    return "";
  }
}