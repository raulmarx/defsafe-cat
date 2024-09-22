<template>
  <div class="min-h-screen flex items-center justify-center bg-secondary">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-bold text-primary mb-6">Login</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="form.email" type="email" placeholder="Email" required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <input v-model="form.password" type="password" placeholder="Senha" required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button type="submit"
          class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300">
          Entrar
        </button>
      </form>
      <p v-if="form.error" class="text-red-600 mt-4">{{ form.error }}</p>
      <p class="mt-4">
        Não tem uma conta? <nuxt-link to="/register" class="text-primary underline">Registrar</nuxt-link>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/useStore';

const form = reactive({
  email: '',
  password: ''
});

const router = useRouter();
const userStore = useAuthStore(); 

const handleLogin = async () => {
  form.error = null;

  try {
    await userStore.signIn(form.email, form.password); 
      router.push('/admin/home'); 
    
  } catch (err) {
    form.error = 'Algo deu errado. Tente novamente.'; 
  }
};
</script>
