import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchItems } from "../src/api.js";
import { API_BASE_URL } from "../src/config.js";

test("fetchItems calls /v1/items and returns the array", async (t) => {
  const data = [{ id: 1, name: "りんご", price: 120 }];
  const mock = t.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    status: 200,
    json: async () => data,
  }));
  const items = await fetchItems();
  assert.deepEqual(items, data);
  assert.equal(mock.mock.calls[0].arguments[0], `${API_BASE_URL}/v1/items`);
});

test("fetchItems throws on error status", async (t) => {
  t.mock.method(globalThis, "fetch", async () => ({ ok: false, status: 500 }));
  await assert.rejects(fetchItems, /500/);
});
