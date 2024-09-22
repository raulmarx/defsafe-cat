import { PrismaClient } from '@prisma/client';
import { convertBigInt } from '~/utils/convertBigInt';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    try {
        const pets = await prisma.pet.findMany({
            where: { available: true }
        });
        
        return {
            pets: convertBigInt(pets),
        };
    } catch (error) {
        console.error('Erro ao buscar pets:', error);
        throw createError({ statusCode: 500, statusMessage: 'Erro ao buscar pets' });
    }
});
