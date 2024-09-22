<template>
  <div>
    <SidebarNavigation>
      <!-- O conteúdo principal vai aqui -->
      <div class="p-10"></div>
      <div class="pb-2 left-auto right-0 top-2/4">
        <Button  @click="handleRegister">Register Now</Button>
      </div>
      <div class="card card-center bg-accent border rounded-xl">

        <div class="p-4">

          <Table v-if="tableData.length > 0" :data="tableData" :currentPage="currentPage" :totalPages="totalPages"
            @edit="handleEdit" @delete="handleDelete" @changePage="fetchData" />
          <p v-else class="text-gray-500">Carregando...</p>
        </div>
      </div>
    </SidebarNavigation>
    <!-- Modal de Edição -->
    <ModalForm :isOpen="isModalOpen" :title="modalTitle" :initialData="formData" @save="saveFormData"
      @cancel="closeModal" />


    <DeleteModal v-if="showDeleteModal" :show="showDeleteModal" :itemName="petToDelete?.name" @confirm="deletePet"
      @cancel="closeDeleteModal" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth' 
})
import SidebarNavigation from '~/components/Sidebar.vue';
import Table from '~/components/Table.vue';
import Button from '~/components/Button.vue';
import ModalForm from '~/components/ModalForm.vue';
import DeleteModal from '~/components/DeleteModal.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

// Variáveis reativas para armazenar dados
const tableData = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const itemsPerPage = 10; // Defina quantos itens por página você quer exibir
const isModalOpen = ref(false);
const modalTitle = ref('');
const formData = ref({ name: '', age: '', breed: '', description: '', image: null });
const showDeleteModal = ref(false); // Controla o modal de exclusão
const petToDelete = ref(null); // Armazena o pet a ser deletado

// Função para buscar dados da API
const fetchData = async (page) => {
  currentPage.value = page;

  try {
    const response = await axios.get('/api/pets/get', {
      params: {
        page: currentPage.value,
        limit: itemsPerPage
      }
    });

    tableData.value = response.data.pets.map(pet => ({
      id: pet.id,
      name: pet.name,
      age: pet.age,
      breed: pet.breed,
      description: pet.description,
      image: pet.image
    }));
    // Atualiza o total de páginas com base no header da resposta
    totalPages.value = Math.ceil(response.data.total / itemsPerPage);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

// Carregar dados quando o componente for montado
onMounted(() => {
  fetchData(currentPage.value);
});

// Funções para editar e deletar

const handleEdit = (id) => {
  const pet = tableData.value.find((item) => item.id === id);
  if (pet) {
    formData.value = { ...pet };
    modalTitle.value = 'Editar Pet';
    isModalOpen.value = true;
  }
};

const handleRegister = () => {
  modalTitle.value = 'Cadastrar Pet';
  isModalOpen.value = true
}

const saveFormData = async (data) => {
  if (data.id) {
    try {
      await axios.put(`/api/pets/${data.id}`, data);
      fetchData(currentPage.value);
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  } else {
    try {
      await axios.post('/api/pets/post', data);
      fetchData(currentPage.value);
      closeModal();
    } catch (error) {
      console.error('Erro ao registrar o gato:', error);
    }
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  resetForm()
};

const handleDelete = (id) => {
  const pet = tableData.value.find((item) => item.id === id);
  if (pet) {
    petToDelete.value = pet.id;
    showDeleteModal.value = true;
  }
};

const closeDeleteModal = () => {
  petToDelete.value = null;
  showDeleteModal.value = false;
};

const deletePet = async () => {
  try {
    await axios.delete(`/api/pets/${petToDelete.value}`);
    tableData.value = tableData.value.filter(pet => pet.id !== petToDelete.value);
    closeDeleteModal(); // Fecha o modal
  } catch (error) {
    console.error('Erro ao deletar pet:', error);
  }
};
const resetForm = () => {
  formData.value = {
    name: '',
    age: '',
    breed: '',
    description: '',
    image: null, // Para o upload da imagem
    adminId: ''
  };
};
</script>
