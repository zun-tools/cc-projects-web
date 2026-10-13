import { API_BASE_URL } from "./config.js";

// 1ページの件数の既定値（API 側の既定と同じ）。 / Default page size (matches the API default).
export const PAGE_SIZE = 20;

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

// 1ページ分を取得する。 / Fetch one page.
// limit（1〜100）と offset（0 以上）を渡し、{ items, total } をそのまま返す。
// Passes limit (1-100) and offset (>= 0); returns { items, total } as is.
export async function fetchItemsPage({ limit = PAGE_SIZE, offset = 0 } = {}) {
  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  const res = await fetch(`${API_BASE_URL}/v2/items?${params}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  const body = await res.json();
  return { items: body.items, total: body.total };
}

// 前へ・次へを出すかと、表示中の範囲を計算する。 / Compute prev/next availability and the shown range.
export function pageInfo({ limit, offset, total, count }) {
  return {
    hasPrev: offset > 0,
    hasNext: offset + limit < total,
    from: count > 0 ? offset + 1 : 0,
    to: offset + count,
  };
}
