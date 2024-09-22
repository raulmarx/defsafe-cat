<template>
  <form @submit.prevent="submitForm" class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
    <div class="flex flex-col">
      <label for="name" class="mb-1 ">Nome do Gato:</label>
      <input id="name" type="text" v-model="form.name" required
        class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        placeholder="Insira o nome do gato" />
    </div>

    <div class="flex flex-col">
      <label for="age" class="mb-1 ">Idade:</label>
      <input id="age" type="number" v-model="form.age" required
        class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        placeholder="Insira a idade" />
    </div>

    <div class="flex flex-col">
      <label for="breed" class="mb-1 ">Raça:</label>
      <input id="breed" type="text" v-model="form.breed"
        class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        placeholder="Insira a raça (opcional)" />
    </div>

    <div class="flex flex-col">
      <label for="description" class="mb-1 ">Descrição:</label>
      <input id="description" type="text" v-model="form.description"
        class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        placeholder="Insira a descrição (opcional)" />
    </div>

    <div class="flex flex-col">
      <label for="image" class="mb-1 ">Imagem do Gato:</label>
      <input id="image" type="file" @change="handleImageUpload"
        class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
    </div>

    <button type="submit" class="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition">
      Enviar
    </button>

    <div v-if="error" class="text-red-500">{{ error }}</div>
  </form>
</template>

<script>
import { createClient } from '@supabase/supabase-js';
import { ref } from 'vue';
import axios from 'axios';
import { z } from 'zod';
import { useRouter } from 'vue-router';

const supabaseUrl = 'https://jlodntwwncmbmrgbcrso.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);


const petSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  age: z.number().min(0, 'A idade deve ser positiva'),
  breed: z.string().optional(),
  description: z.string().optional(),
  image: z.any(),
});

export default {
  setup() {
    const form = ref({
      name: '',
      age: null,
      breed: '',
      description: '',
      image: null,
      adminId: '',
    });
    const error = ref(null);
    const router = useRouter();

    const handleImageUpload = async (event) => {
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
        form.value.image = publicUrlData.publicUrl;
      } else {
        error.value = 'Não foi possível gerar a URL pública';
      }
    };

    const submitForm = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const validationResult = petSchema.safeParse(form.value);
      if (!validationResult.success) {
        error.value = validationResult.error.errors.map((e) => e.message).join(', ');
        return;
      }

      const formData = {
        name: form.value.name,
        age: form.value.age,
        breed: form.value.breed || '',
        description: form.value.description || '',
        image: form.value.image, 
        adminId: user.id,
      };

      try {
        
        await axios.post('/api/pets/post', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        router.push('/admin/home'); 
      } catch (err) {
        console.error('Erro ao enviar o formulário:', err);
        error.value = 'Erro ao enviar o formulário. Tente novamente.';
      }
    };

    return {
      form,
      error,
      handleImageUpload,
      submitForm,
    };
  },
};
</script>
