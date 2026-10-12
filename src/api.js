import { API_BASE_URL } from "./config.js";

// 一覧を取得する（API の v2 を呼ぶ）。 / Fetch the item list (calls API v2).
// v2 は {"items": [...], "total": n} を返すので、配列だけを取り出して返す。
// v2 returns {"items": [...], "total": n}; return just the array.
export async function fetchItems() {
  const res = await fetch(`${API_BASE_URL}/v2/items`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  const body = await res.json();
  return body.items;
}
