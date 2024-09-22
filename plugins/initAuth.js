import { useAuthStore } from '@/stores/useStore';

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  authStore.getUser();
});
