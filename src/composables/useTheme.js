import { ref, watch } from "vue";

const THEME_STORAGE_KEY = "theme";

const themeStore = localStorage.getItem(THEME_STORAGE_KEY);
const theme = ref(themeStore === "dark" ? "dark" : "light");

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
};

watch(theme, (newTheme) => {
  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
});

export const useTheme = () => ({
  theme,
  toggleTheme,
});
