import { fetchItemsPage, pageInfo, PAGE_SIZE } from "./api.js";

const list = document.getElementById("items");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const range = document.getElementById("range");

let offset = 0;

async function load() {
  prev.disabled = true;
  next.disabled = true;
  try {
    const { items, total } = await fetchItemsPage({ limit: PAGE_SIZE, offset });
    list.replaceChildren();
    for (const item of items) {
      const li = document.createElement("li");
      li.textContent = `${item.name}: ${item.price}円`;
      list.append(li);
    }
    const info = pageInfo({ limit: PAGE_SIZE, offset, total, count: items.length });
    range.textContent = `${total}件中 ${info.from}〜${info.to}件`;
    prev.disabled = !info.hasPrev;
    next.disabled = !info.hasNext;
  } catch (e) {
    list.textContent = `読み込みに失敗しました: ${e.message}`;
    range.textContent = "";
  }
}

prev.addEventListener("click", () => {
  offset = Math.max(0, offset - PAGE_SIZE);
  load();
});
next.addEventListener("click", () => {
  offset += PAGE_SIZE;
  load();
});

load();
