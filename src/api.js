import { API_BASE_URL } from "./config.js";

// 一覧を取得する（API の v1 を呼ぶ）。 / Fetch the item list (calls API v1).
export async function fetchItems() {
  const res = await fetch(`${API_BASE_URL}/v1/items`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}
