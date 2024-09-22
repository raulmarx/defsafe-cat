<template>
  <div v-if="isOpen" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Adote {{ pet?.name }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Preencha o formulário abaixo para iniciar o processo de adoção.
                </p>
              </div>
            </div>
          </div>
          <form @submit.prevent="submitForm">
            <div class="mt-4">
              <label for="name" class="block text-sm font-medium text-primary">Seu nome</label>
              <input
                v-model="form.name"
                type="text"
                id="name"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div class="mt-4">
              <label for="email" class="block text-sm font-medium text-primary">Seu email</label>
              <input
                v-model="form.email"
                type="email"
                id="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div class="mt-4">
              <label for="phone" class="block text-sm font-medium text-primary">Seu Telefone</label>
              <input
                v-model="form.phone"
                type="phone"
                id="phone"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div class="mt-4">
              <label for="message" class="block text-sm font-medium text-primary">Mensagem</label>
              <textarea
                v-model="form.message"
                id="message"
                rows="3"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>
            <div class="mt-4 flex justify-end">
              <button @click="closeModal" type="button" class="bg-gray-600 text-white py-2 px-4 rounded mr-2 hover:bg-gray-700 focus:outline-none">
                Cancelar
              </button>
              <button type="submit" class="bg-primary text-white py-2 px-4 rounded hover:bg-purple-800 transition duration-300 ">
                Enviar Formulário
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Props do modal
const props = defineProps({
  isOpen: Boolean,
  pet: Object
});

const emit = defineEmits(['close', 'submit']);

const form = ref({
  name: '',
  email: '',
  phone:'',
  message: ''
});

// Função para fechar o modal
const closeModal = () => {
  emit('close');
  resetForm();
};

// Função para enviar o formulário e fazer a requisição com Axios
const submitForm = async () => {
  try {
    const response = await axios.post('/api/users/post', {
      petId: props.pet.id,
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
      message: form.value.message
    });
    
    // Emite os dados de sucesso para o componente pai
    emit('submit', response.data);
    closeModal();
  } catch (error) {
    console.error('Erro ao enviar o formulário:', error);
    alert('Houve um problema ao enviar o formulário. Tente novamente mais tarde.');
  }
};

// Resetar o formulário após fechar
const resetForm = () => {
  form.value = {
    name: '',
    phone: '',
    email: '',
    message: ''
  };
};
</script>

<style scoped>
</style>
