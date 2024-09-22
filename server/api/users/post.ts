import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, phone, email, message, petId } = body;

  try {
    // Verifica se o pet existe
    const pet = await prisma.pet.findUnique({
      where: { id: BigInt(petId) }, // Certifique-se de que o petId seja do tipo correto
    });

    if (!pet) {
      return { error: "Pet not found" }; // Retorna erro se o pet não existir
    }

    // Cria o usuário
    const newUser = await prisma.user.create({
      data: {
        name: name.toString(),
        phone: phone ? phone.toString() : null, // phone é opcional
        email: email ? email.toString() : null,
        message: message ? message.toString() : null, // message é opcional
      },
    });

    // Cria a adoção vinculando o usuário e o pet
    const newAdoption = await prisma.adoption.create({
      data: {
        userId: newUser.id,
        petId: BigInt(petId), // Certifica-se de que o petId está no formato correto
      },
    });

    const newPet = await prisma.pet.update({
      where: { id: BigInt(petId) }, // Verifica o pet pelo ID
      data: {
        available: false
      },
    });

    // Retorna os dados formatados, convertendo BigInt para string se necessário
    return {
      success: true,
      pet: {
        ...newPet,        
        ...newAdoption,
        userId: newAdoption.userId.toString(),
        petId: newAdoption.petId.toString(),
        ...newUser,
        id: newUser.id.toString(), // Se id for BigInt, converta
      },
    };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create user or adoption", details: error.message };
  }
});
