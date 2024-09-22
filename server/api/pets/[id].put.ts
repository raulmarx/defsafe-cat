import {  PrismaClient } from '@prisma/client';
import { convertBigInt } from '~/utils/convertBigInt';

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    try {
        const result = getRouterParam(event, 'id')
        const id = convertBigInt(result)

        const body = await readBody(event);

        const { name, breed, age, description, image, adminId } = body;
        const updatedPet = await prisma.pet.update({
            where: { id: id }, 
            data: {
                name: name?.toString(), 
                breed: breed ? breed.toString() : null, 
                age: Number(age),
                description: description ? description.toString() : null, 
                image: image?.toString(), 
                adminId: adminId ? adminId.toString() : undefined, 
            },
        });
                
        return {
            success: true,
            pet: {
                ...updatedPet,
                id: updatedPet.id.toString(), 
                adminId: updatedPet.adminId ? updatedPet.adminId.toString() : null, 
            },
        };

    } catch (error) {
        console.error('Erro ao atualizar o pet:', error);
        return { success: false, error: error.message };
    }
});
