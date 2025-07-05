import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useProductStore } from "./productStore";

export const useCustomerStore = defineStore("customer", () => {
  const customers = ref([
    { id: 1, name: "Ahmad", city: "Tehran" },
    { id: 2, name: "Mehran", city: "Shiraz" },
    { id: 3, name: "Ali", city: "Esfahan" },
  ]);

  const purchases = ref([
    { customerId: 1, productId: 101, date: "2025-03-01" },
    { customerId: 1, productId: 102, date: "2025-02-02" },
    { customerId: 2, productId: 103, date: "2025-02-05" },
    { customerId: 2, productId: 104, date: "2025-02-06" },
    { customerId: 3, productId: 105, date: "2025-02-07" },
    { customerId: 3, productId: 106, date: "2025-02-08" },
    { customerId: 1, productId: 104, date: "2025-02-10" },
  ]);

  const productStore = useProductStore();

  const purchasedProductByCustomer = computed(() => {
    return customers.value.map((customer) => {
      const customerPurchases = purchases.value.filter(
        (purchase) => purchase.customerId === customer.id
      );

      const purchasedProducts = customerPurchases
        .map((purchase) =>
          productStore.products.find(
            (product) => product.id === purchase.productId
          )
        )
        .filter(Boolean);

      return {
        customerId: customer.id,
        name: customer.name,
        products: purchasedProducts,
      };
    });
  });

  return { purchasedProductByCustomer };
});
