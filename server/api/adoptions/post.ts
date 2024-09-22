import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdoption(userId: number, petId: number) {
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    throw new Error("Usuário não encontrado");
  }

  const petExists = await prisma.pet.findUnique({
    where: { id: petId },
  });

  if (!petExists) {
    throw new Error("Pet não encontrado");
  }

  const adoption = await prisma.adoption.create({
    data: {
      user: { connect: { id: userId } },
      pet: { connect: { id: petId } },
      adoptionDate: new Date(),
      status: 'pending', // Valor padrão
    },
  });

  return adoption;
}

