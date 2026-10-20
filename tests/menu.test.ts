import assert from "node:assert/strict";
import test from "node:test";
import { filterMenu, menu } from "../src/data/menu.ts";

test("all recipes remain vegetarian, with vegan and gluten-free tags matching ingredients", () => {
  assert.equal(menu.length, 12);
  assert.equal(new Set(menu.map((d) => d.id)).size, menu.length);
  for (const dish of menu) {
    const ingredients = dish.ingredients.join(" ").toLowerCase();
    assert.doesNotMatch(
      ingredients,
      /\b(beef|chicken|fish|salmon|shrimp|gelatin|anchovies|bacon)\b/,
      dish.name,
    );
    if (dish.vegan)
      assert.doesNotMatch(
        ingredients,
        /\b(egg|eggs|butter|burrata|cheese|honey|cream)\b/,
        dish.name,
      );
    if (dish.glutenFree)
      assert.doesNotMatch(
        ingredients,
        /\b(wheat|barley|rye|sourdough|tagliatelle|flatbread|pastry)\b/,
        dish.name,
      );
  }
});
test("category and dietary filters intersect, including an intentional empty state", () => {
  assert.equal(filterMenu(menu, "Café", "Vegan").length, 4);
  assert.deepEqual(filterMenu(menu, "Something sweet", "Vegan"), []);
  const veganMains = filterMenu(menu, "Mains", "Vegan");
  assert.deepEqual(
    veganMains.map((d) => d.id),
    ["market-bowl", "charred-cauliflower"],
  );
  assert.ok(filterMenu(menu, "All", "Gluten-free").every((d) => d.glutenFree));
});
