// middleware/auth.ts
import { useAuthStore } from '@/stores/useStore'; // Importa o store de autenticação

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  if (process.client) {
    // Se o usuário não está logado, redireciona para a página de login
    if (!authStore.user) {
      await authStore.checkAuth(); // Verifica a sessão novamente

      if (!authStore.user) {
        return navigateTo('/login');
      }
    }
  }

});
