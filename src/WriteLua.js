import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/**
 * Записывает строку в файл по указанному адресу
 * @param {String} fileName Название файла без расширения
 * @param {String} fileContent Содержимое для записи
 */
export default async function writeLuaFile(fileName, fileContent) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const outFolder = `${__dirname}/../out`;
  try {
    if(!fs.existsSync(outFolder)) {
      fs.mkdirSync(outFolder);
    }
    await fs.promises.writeFile(`${outFolder}/${fileName}.lua`, fileContent);
  } catch(error) {
    console.error(error);
    throw error;
  }
}