import {  PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {

        
        const body = await readBody(event);

        
        const { name, breed, age, description, image, adminId } = body;

        if (!name || !age || !image) {
            return { success: false, error: 'Nome, idade e imagem são obrigatórios.' };
        }

        
        const newPet = await prisma.pet.create({
            data: {
                name: name.toString(),
                breed: breed ? breed.toString() : null, 
                age: Number(age),
                description: description ? description.toString() : null, 
                image: image.toString(), 
                adminId: adminId.toString(), 
            },
        });

        
        return {
            success: true,
            pet: {
                ...newPet,
                id: newPet.id.toString(), 
                adminId: newPet.adminId ? newPet.adminId.toString() : null, 
            },
        };

    } catch (error) {
        console.error('Erro ao salvar o pet:', error);
        return { success: false, error: error.message };
    }
});



