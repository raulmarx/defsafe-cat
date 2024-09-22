import { Prisma, PrismaClient } from '@prisma/client';
import { convertBigInt } from '~/utils/convertBigInt';

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    try {
        const result = getRouterParam(event, 'id')
        const id = convertBigInt(result)
        // Lê o corpo da requisição
        const body = await readBody(event);

        // Obtém o id do pet para ser atualizado
        const { name, breed, age, description, image, adminId } = body;

        // Verifica se o id e campos obrigatórios estão presentes
        // if (!id) {
        //     return { success: false, error: 'ID do pet é obrigatório para atualização.' };
        // }
        // if (!name || !age || !image) {
        //     return { success: false, error: 'Nome, idade e imagem são obrigatórios.' };
        // }

        // Atualiza o registro no banco de dados Prisma
        const updatedPet = await prisma.pet.update({
            where: { id: id }, // Verifica o pet pelo ID
            data: {
                name: name?.toString(), // Garante que name existe antes de usar toString()
                breed: breed ? breed.toString() : null, // breed é opcional
                age: Number(age),
                description: description ? description.toString() : null, // descrição é opcional
                image: image?.toString(), // Garante que image existe antes de usar toString()
                adminId: adminId ? adminId.toString() : undefined, // Atualiza o adminId se necessário
            },
        });

        // Retorna o registro atualizado
        return {
            success: true,
            pet: {
                ...updatedPet,
                id: updatedPet.id.toString(), // Se id for BigInt, converta
                adminId: updatedPet.adminId ? updatedPet.adminId.toString() : null, // Se adminId for BigInt, converta
            },
        };

    } catch (error) {
        console.error('Erro ao atualizar o pet:', error);
        return { success: false, error: error.message };
    }
});
