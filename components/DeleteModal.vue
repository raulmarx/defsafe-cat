<!-- components/DeleteModal.vue -->
<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div class="bg-white p-4 rounded-lg shadow-lg w-1/3">
        <h2 class="text-lg font-bold mb-4">Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir <strong>{{ itemName }}</strong>?</p>
        <div class="mt-4 flex justify-end space-x-4">
          <button class="px-4 py-2 bg-gray-200 rounded-lg" @click="onCancel">Cancelar</button>
          <button class="px-4 py-2 bg-red-600 text-white rounded-lg" @click="onConfirm">Deletar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    show: Boolean, // Controla a exibição do modal
    itemName: String, // Nome do item a ser deletado
  });
  
  const emits = defineEmits(['confirm', 'cancel']); // Emitimos os eventos de confirmar ou cancelar
  
  const onConfirm = () => {
    emits('confirm'); // Emite o evento para confirmar a exclusão
  };
  
  const onCancel = () => {
    emits('cancel'); // Emite o evento para cancelar a exclusão
  };
  </script>
  