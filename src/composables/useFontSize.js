import { ref, watch } from "vue";

const FONTSIZE_STORAGE_KEY = "fontSize";
const fontSizeCollection = new set(["small", "medium", "large"]);

const fontSizeStore = localStorage.getItem(FONTSIZE_STORAGE_KEY);
const fontSize = ref(
  fontSizeCollection.has(fontSizeStore) ? fontSizeStore : "medium"
);

const setFontSize = (size) => {
  if (fontSizeCollection.has(size)) {
    fontSize.value = size;
  }
};

watch(fontSize, (newFontSize) => {
  if (fontSizeCollection.has(newFontSize)) {
    localStorage.setItem(FONTSIZE_STORAGE_KEY, newFontSize);
  }
});

export const useFontSize = () => ({
  fontSize,
  setFontSize,
});
