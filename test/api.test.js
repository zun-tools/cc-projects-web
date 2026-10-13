import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchItems, fetchItemsPage, pageInfo, PAGE_SIZE } from "../src/api.js";
import { API_BASE_URL } from "../src/config.js";

test("fetchItems calls /v2/items and returns the items array", async (t) => {
  const data = [{ id: 1, name: "りんご", price: 120 }];
  const mock = t.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    status: 200,
    json: async () => ({ items: data, total: data.length }),
  }));
  const items = await fetchItems();
  assert.deepEqual(items, data);
  assert.equal(mock.mock.calls[0].arguments[0], `${API_BASE_URL}/v2/items`);
});

test("fetchItems throws on error status", async (t) => {
  t.mock.method(globalThis, "fetch", async () => ({ ok: false, status: 500 }));
  await assert.rejects(fetchItems, /500/);
});

test("fetchItemsPage sends limit and offset and returns items with total", async (t) => {
  const data = [{ id: 21, name: "みかん", price: 80 }];
  const mock = t.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    status: 200,
    json: async () => ({ items: data, total: 41 }),
  }));
  const page = await fetchItemsPage({ limit: 20, offset: 20 });
  assert.deepEqual(page, { items: data, total: 41 });
  assert.equal(mock.mock.calls[0].arguments[0], `${API_BASE_URL}/v2/items?limit=20&offset=20`);
});

test("fetchItemsPage defaults to the first page of PAGE_SIZE", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    status: 200,
    json: async () => ({ items: [], total: 0 }),
  }));
  await fetchItemsPage();
  assert.equal(mock.mock.calls[0].arguments[0], `${API_BASE_URL}/v2/items?limit=${PAGE_SIZE}&offset=0`);
});

test("fetchItemsPage throws on error status", async (t) => {
  t.mock.method(globalThis, "fetch", async () => ({ ok: false, status: 422 }));
  await assert.rejects(() => fetchItemsPage({ limit: 0 }), /422/);
});

test("pageInfo enables prev/next only when there is a page there", () => {
  assert.deepEqual(pageInfo({ limit: 20, offset: 0, total: 41, count: 20 }), { hasPrev: false, hasNext: true, from: 1, to: 20 });
  assert.deepEqual(pageInfo({ limit: 20, offset: 20, total: 41, count: 20 }), { hasPrev: true, hasNext: true, from: 21, to: 40 });
  assert.deepEqual(pageInfo({ limit: 20, offset: 40, total: 41, count: 1 }), { hasPrev: true, hasNext: false, from: 41, to: 41 });
  assert.deepEqual(pageInfo({ limit: 20, offset: 0, total: 0, count: 0 }), { hasPrev: false, hasNext: false, from: 0, to: 0 });
});
