import { ref } from "vue";
import axios from "axios";

const isCircuitOpen = ref(false);
const errorCount = ref(0);
let timer = null;

const fetchStockData = async () => {
  if (isCircuitOpen.value) {
    console.warn("Circuit is active, skipping the request.");
    return null;
  }

  try {
    const res = await axios.get("test/stock");
    errorCount.value = 0;
    return res.data;
  } catch (err) {
    errorCount.value++;
    console.warn("Error fetching stocks:", err);

    if (errorCount.value >= 3) {
      isCircuitOpen.value = true;

      timer = setTimeout(() => {
        isCircuitOpen.value = false;
        errorCount.value = 0;
      }, 60000);
    }

    return null;
  }
};

export const useStockApi = () => ({
  fetchStockData,
});
