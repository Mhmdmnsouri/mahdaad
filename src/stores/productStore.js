import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
  const products = ref([
    { id: 101, name: "Laptop", category: "Electronics" },
    { id: 102, name: "Mouse", category: "Electronics" },
    { id: 103, name: "Monitor", category: "Electronics" },
    { id: 104, name: "Coffee Maker", category: "Home Appliances" },
    { id: 105, name: "Blender", category: "Home Appliances" },
    { id: 106, name: "Headphones", category: "Electronics" },
  ]);

  return { products };
});
