import { PrismaClient } from '@prisma/client';
import { convertBigInt } from '~/utils/convertBigInt';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    // Pega os parâmetros de consulta da URL
    const query = getQuery(event);
    const page = query.page ? parseInt(query.page) : 1; // Página atual, padrão para 1
    const limit = query.limit ? parseInt(query.limit) : 5; // Itens por página, padrão para 5
    const skip = (page - 1) * limit; // Cálculo de 'skip' para a consulta

    try {
        const pets = await prisma.pet.findMany({
            skip,
            take: limit,
        });
        const total = await prisma.pet.count();
        const totalPages = Math.ceil(total / limit);
        
        return {
            pets: convertBigInt(pets),
            page,
            limit,
            total,
            totalPages,
        };
    } catch (error) {
        console.error('Erro ao buscar pets:', error);
        throw createError({ statusCode: 500, statusMessage: 'Erro ao buscar pets' });
    }
});
