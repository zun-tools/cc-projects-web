import { fetchItems } from "./api.js";

const list = document.getElementById("items");

try {
  const items = await fetchItems();
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = `${item.name}: ${item.price}円`;
    list.append(li);
  }
} catch (e) {
  list.textContent = `読み込みに失敗しました: ${e.message}`;
}
