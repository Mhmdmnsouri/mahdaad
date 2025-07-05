import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useCardStore = defineStore("card", () => {
  const items = ref([]);

  const CARD_STORAGE_KEY = "card";
  const cardStore = localStorage.getItem(CARD_STORAGE_KEY);

  if (cardStore) {
    items.value = JSON.parse(cardStore);
  }

  const addToCard = (product) => {
    items.value.push(product);
  };

  const deleteFromCard = (productId) => {
    items.value = items.value.filter((item) => item.id !== productId);
  };

  watch(
    items,
    (value) => {
      localStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(value));
    },
    { deep: true }
  );

  return { items, addToCard, deleteFromCard };
});
