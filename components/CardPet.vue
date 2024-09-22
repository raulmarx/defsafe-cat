<template>
    <div class="bg-secondary py-12">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="flex items-center">
                <Icon icon="dashicons:pets" class="ml-3 mr-3 h-12 w-12" style="color: #4E2096" />
                <h2 class="">Pets para Adoção</h2>
            </div>
            <div class="border"></div>
            <div v-if="loading" class="text-center">Carregando pets...</div>
            <div v-else-if="error" class="text-center text-red-500">Erro ao carregar os pets: {{ error }}</div>
            <div v-else
                class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-10">
                <div v-for="pet in pets" :key="pet.id" class="card card-center bg-accent border rounded-lg group p-5">
                    <div
                        class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <img :src="pet.image" :alt="`Foto do pet ${pet.name}`"
                            class="h-full w-full object-cover object-center group-hover:opacity-75" />
                    </div>
                    <h1 class="mt-4 text-gray-700">{{ pet.name }}</h1>
                    <p class="mt-1 text-sm text-gray-500">{{ pet.breed }}</p>
                    <p class="mt-1 text-sm text-gray-500">{{ pet.age }} anos</p>
                    <button @click="openAdoptionForm(pet)"
                        class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300 mt-4">
                        Adotar
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal Component -->
        <ModalAdoption :isOpen="isModalOpen" :pet="selectedPet" @close="closeModal" @submit="handleSubmit" />

        <ModalSuccess :isOpen="isSuccessModalOpen" @close="closeSuccessModal" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ModalAdoption from './components/ModalAdoption.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';


const pets = ref([]);
const loading = ref(true);
const error = ref(null);

const isModalOpen = ref(false);
const selectedPet = ref(null);
const isSuccessModalOpen = ref(false);

const openAdoptionForm = (pet) => {
    selectedPet.value = pet;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const handleSubmit = (data) => {
    closeModal();
    loadPets();
    isSuccessModalOpen.value = true;
};

const closeSuccessModal = () => {
  isSuccessModalOpen.value = false;
};

const loadPets = async () => {
    try {
        const response = await axios.get('/api/adoptions/get');

        pets.value = response.data.pets.map(pet => ({
            id: pet.id,
            name: pet.name,
            age: pet.age,
            breed: pet.breed,
            description: pet.description,
            image: pet.image
        }));
    } catch (err) {
        error.value = 'Não foi possível carregar os pets.';
        console.error('Erro ao carregar os pets:', err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadPets();
});
</script>

<style scoped></style>
