<template>
    <div class="min-h-screen flex items-center justify-center bg-secondary">
      <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 class="text-2xl font-bold text-primary mb-6">Registrar Novo Administrador</h1>
        <form @submit.prevent="handleRegister" class="space-y-4">
          
          <input v-model="form.email" type="email" placeholder="Email" required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <input v-model="form.password" type="password" placeholder="Senha" required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button type="submit"
            class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300">
            Registrar
          </button>
        </form>
        <p v-if="form.error" class="text-red-600 mt-4">{{ form.error }}</p>
        <p v-if="form.success" class="text-green-600 mt-4">
          Registro bem-sucedido! Vá para <nuxt-link to="/login" class="text-primary underline">Login</nuxt-link>.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '~/stores/useStore';

  
  const form = reactive({
    email: '',
    password: '',
    error: null,
    success: false,
  });
  
  const router = useRouter();
  const userStore = useAuthStore();
  
  onMounted(async () => {
    const { data } = await userStore.getUser();
    
    if (data?.user) {
      router.push('/login');
    }
  });
  
  const handleRegister = async () => {
    form.error = null;
    form.success = false;
  
    const { data, error } = await userStore.signUp(form.email, form.password);
  
    if (error) {
      form.error = error.message;
    } else {
      form.success = true;
      router.push('/login');
    }
  };
  </script>
  