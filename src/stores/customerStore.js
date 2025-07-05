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

  const topCategoryByCustomer = computed(() => {
    return customers.value.map((customer) => {
      const categoryTotals = {};

      purchases.value.forEach((purchase) => {
        if (purchase.customerId === customer.id) {
          const product = productStore.products.find(
            (product) => product.id === purchase.productId
          );

          if (product) {
            categoryTotals[product.category] =
              (categoryTotals[product.category] || 0) + 1;
          }
        }
      });

      const sortedCategory = Object.entries(categoryTotals).sort(
        (a, b) => b[1] - a[1]
      );
      const topCategory =
        sortedCategory.length > 0 ? sortedCategory[0][0] : null;

      return { customerId: customer.id, name: customer.name, topCategory };
    });
  });

  const recommendationProducts = (customerId) => {
    const targetCustomer = customers.value.find(
      (customer) => customer.id === customerId
    );

    console.log(targetCustomer);

    if (!targetCustomer) return [];

    const favoriteCategory = topCategoryByCustomer.value.find(
      (item) => item.customerId === customerId
    ).topCategory;
    console.log(favoriteCategory);

    if (!favoriteCategory) return [];

    const purchasedProductIds = purchases.value
      .filter((purchase) => purchase.customerId === customerId)
      .map((purchase) => purchase.productId);

    console.log(purchasedProductIds);

    let otherCustomerPurchases = purchases.value.filter(
      (purchase) => purchase.customerId !== customerId
    );

    console.log(otherCustomerPurchases);

    const recommendedProducts = otherCustomerPurchases
      .map((purchase) =>
        productStore.products.find(
          (product) => product.id === purchase.productId
        )
      )
      .filter(
        (product) =>
          product &&
          product.category === favoriteCategory &&
          !purchasedProductIds.includes(product.id)
      );

    console.log(recommendedProducts);

    const uniqueRecommendations = Array.from(
      new Set(recommendedProducts.map((product) => product.id))
    ).map((id) => productStore.products.find((product) => product.id === id));

    console.log(uniqueRecommendations);

    return { uniqueRecommendations };
  };

  return {
    purchasedProductByCustomer,
    topCategoryByCustomer,
    recommendationProducts,
  };
});
