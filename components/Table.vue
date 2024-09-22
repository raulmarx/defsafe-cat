<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border-xl border-gray-200">
      <thead>
        <tr>
          <th class="px-4 py-2 border-b text-left text-sm  text-gray-600">Imagem</th>
          <th class="px-4 py-2 border-b text-left text-sm  text-gray-600">Nome</th>
          <th class="px-4 py-2 border-b text-left text-sm  text-gray-600">Idade</th>
          <th class="px-4 py-2 border-b text-left text-sm  text-gray-600">Raça</th>
          <th class="px-4 py-2 border-b text-left text-sm  text-gray-600">Açoes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index" class="odd:bg-gray-50">
          <td class="px-4 py-2 border-b text-sm text-gray-700">
            <img :src="row.image" alt="Imagem do usuário" class="w-10 h-10 rounded-full object-cover" />
          </td>
          <td class="px-4 py-2 border-b text-sm text-gray-700">{{ row.name }}</td>
          <td class="px-4 py-2 border-b text-sm text-gray-700">{{ row.age }}</td>
          <td class="px-4 py-2 border-b text-sm text-gray-700">{{ row.breed }}</td>
          <td class="px-4 py-2 border-b text-sm text-gray-700">
            <button class="text-blue-500 hover:text-blue-700  px-2 py-1" @click="editRow(row.id)">
              Editar
            </button>
            <button class="text-red-500 hover:text-red-700  px-2 py-1" @click="deleteRow(row.id)">
              Deletar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Paginação -->
    <div class="flex justify-between items-center mt-4">
      <button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" :disabled="currentPage === 1"
        @click="$emit('changePage', currentPage - 1)">
        Anterior
      </button>
      <span class="text-sm">Página {{ currentPage }} de {{ totalPages }}</span>
      <button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" :disabled="currentPage === totalPages"
        @click="$emit('changePage', currentPage + 1)">
        Próximo
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete', 'changePage']);

const editRow = (id) => {
  emit('edit', id);
};

const deleteRow = (id) => {
  emit('delete', id);
};
</script>
