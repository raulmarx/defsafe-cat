import { useAuthStore } from '@/stores/useStore'; 

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  if (process.client) {
    if (!authStore.user) {
      await authStore.checkAuth(); 

      if (!authStore.user) {
        return navigateTo('/login');
      }
    }
  }

});
