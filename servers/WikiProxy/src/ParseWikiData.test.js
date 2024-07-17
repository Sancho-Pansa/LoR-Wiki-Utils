import { assert, describe, test } from "vitest";
import fetchWikiData from "./ParseWikiData";

describe("Вызов JSON из LoL Wiki", () => {
  test("Данные о сезоне 5", async () => {
    const set = "5";
    let result = await fetchWikiData(set);
    assert.isNotEmpty(result);
  });
});