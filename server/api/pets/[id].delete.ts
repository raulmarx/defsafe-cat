import prisma from '@/server/prisma/client';
import { convertBigInt } from "~/utils/convertBigInt"; 

export default defineEventHandler(async (event) => {
  
  const result = getRouterParam(event, 'id');
  
  
  const id = convertBigInt(result);

  try {
    
    const pet = await prisma.pet.delete({
      where: {
        id: typeof id === 'bigint' ? Number(id) : id, 
      },
    });

    
    const serializedPet = convertBigInt(pet); 
    
    return serializedPet;
  } catch (error) {
    console.error('Erro ao deletar pet:', error);
    return { success: false, error: error.message };
  }
});
