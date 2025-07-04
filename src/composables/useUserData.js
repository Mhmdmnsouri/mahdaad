import axios from "axios";
import { ref, watchEffect } from "vue";

const userCache = new Map();

export const useUserData = (userId) => {
  const userData = ref(null);
  const isLoading = ref(false);

  watchEffect(async () => {
    if (!userId.value) {
      userData.value = null;
      return;
    }

    if (userCache.has(userId.value)) {
      userData.value = userCache.get(userId.value);
    }

    if (cancelToken) {
      cancelToken.cancel("previous request canceled.");
    }

    cancelToken = axios.CancelToken.source();

    try {
      const res = await axios.get(`api/users/${userId.value}`, {
        cancelToken: cancelToken.token,
      });

      userData.value = res.data;
      userCache.set(userId.value, res.data);
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.warn("error loading the user data", err);
      }
    } finally {
      isLoading.value = false;
    }
  });

  return {
    userData,
    isLoading,
  };
};
