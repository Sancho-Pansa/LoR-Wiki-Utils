import { assert, describe, test } from "vitest";
import getWikiFileUrl from "./GetWikiFileUrl";

describe("Вызов изображения из LoL Wiki", () => {
  test("Карта Нырок (08BW008T3)", async () => {
    const id = "08BW008T3";
    let result = await getWikiFileUrl(`${id}.png`);
    assert.isString(result);
  });
});