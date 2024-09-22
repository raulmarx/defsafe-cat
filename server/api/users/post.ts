import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, phone, email, message, petId } = body;

  try {
    
    const pet = await prisma.pet.findUnique({
      where: { id: BigInt(petId) }, 
    });

    if (!pet) {
      return { error: "Pet not found" }; 
    }

    
    const newUser = await prisma.user.create({
      data: {
        name: name.toString(),
        phone: phone ? phone.toString() : null, 
        email: email ? email.toString() : null,
        message: message ? message.toString() : null, 
      },
    });

    
    const newAdoption = await prisma.adoption.create({
      data: {
        userId: newUser.id,
        petId: BigInt(petId), 
      },
    });

    const newPet = await prisma.pet.update({
      where: { id: BigInt(petId) }, 
      data: {
        available: false
      },
    });

    
    return {
      success: true,
      pet: {
        ...newPet,        
        ...newAdoption,
        userId: newAdoption.userId.toString(),
        petId: newAdoption.petId.toString(),
        ...newUser,
        id: newUser.id.toString(), 
      },
    };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create user or adoption", details: error.message };
  }
});
