import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {

        // Lê o corpo da requisição
        const body = await readBody(event);

        // Verifica se todos os campos obrigatórios estão presentes
        const { name, breed, age, description, image, adminId } = body;

        if (!name || !age || !image) {
            return { success: false, error: 'Nome, idade e imagem são obrigatórios.' };
        }

        // Cria um novo registro no banco de dados Prisma
        const newPet = await prisma.pet.create({
            data: {
                name: name.toString(),
                breed: breed ? breed.toString() : null, // breed é opcional
                age: Number(age),
                description: description ? description.toString() : null, // descrição é opcional
                image: image.toString(), // Salva a URL pública da imagem
                adminId: adminId.toString(), // Usa o ID do usuário logado
            },
        });

        // Retorna o novo registro
        return {
            success: true,
            pet: {
                ...newPet,
                id: newPet.id.toString(), // Se id for BigInt, converta
                adminId: newPet.adminId ? newPet.adminId.toString() : null, // Se adminId for BigInt, converta
            },
        };

    } catch (error) {
        console.error('Erro ao salvar o pet:', error);
        return { success: false, error: error.message };
    }
});



