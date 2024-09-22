<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
            <h2 class="text-xl mb-4">{{ title }}</h2>
            <div class="border mb-3"></div>

            <div class="flex flex-col mb-4">
                <label for="name" class="mb-1 text-primary">Nome do Gato:</label>
                <input id="name" type="text" v-model="formData.name" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Insira o nome do gato" />
            </div>

            <div class="flex flex-col mb-4">
                <label for="age" class="mb-1 text-primary">Idade:</label>
                <input id="age" type="number" v-model="formData.age" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Insira a idade" />
            </div>

            <div class="flex flex-col mb-4">
                <label for="breed" class="mb-1 text-primary">Raça:</label>
                <input id="breed" type="text" v-model="formData.breed"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Insira a raça (opcional)" />
            </div>

            <div class="flex flex-col mb-4">
                <label for="description" class="mb-1 text-primary">Descrição:</label>
                <input id="description" type="text" v-model="formData.description"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Insira a descrição (opcional)" />
            </div>

            <div class="flex flex-col mb-4">
                <label for="image" class="mb-1 text-primary">Imagem do Gato:</label>
                <input id="image" type="file" @change="handleImageUpload"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>

            <div class="mt-6 flex justify-end space-x-4">
                <Button @click="handleCancel">Cancelar</Button>
                <Button @click="handleSave">Salvar</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://jlodntwwncmbmrgbcrso.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);
const props = defineProps({
    isOpen: Boolean,
    title: String,
    initialData: Object,
});
const emit = defineEmits(['save', 'cancel']);

const formData = ref({
    name: '',
    age: '',
    breed: '',
    description: '',
    image: null, 
    adminId:''
});

watch(() => props.initialData, (newData) => {
    formData.value = { ...newData };
}, { immediate: true });

const handleSave = () => {
    emit('save', formData.value);
};

const handleCancel = () => {
    emit('cancel');
};


const handleImageUpload = async (event) => {
    const { data: { user } } = await supabase.auth.getUser();
    const file = event.target.files[0];
    if (!file) {
        error.value = 'Por favor, selecione uma imagem.';
        return;
    }

    const { data, error: uploadError } = await supabase.storage.from('pets_image').upload(`pet_${Date.now()}.png`, file);

    if (uploadError) {
        error.value = 'Erro ao fazer o upload da imagem: ' + uploadError.message;
        return;
    }

    const { data: publicUrlData, error: urlError } = supabase.storage.from('pets_image').getPublicUrl(data.path);

    if (urlError) {
        error.value = 'Erro ao obter a URL pública da imagem: ' + urlError.message;
        return;
    }

    if (publicUrlData && publicUrlData.publicUrl) {
        formData.value.image = publicUrlData.publicUrl;
        formData.value.adminId = user.id;
    } else {
        error.value = 'Não foi possível gerar a URL pública';
    }
};
</script>
