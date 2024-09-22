import prisma from '../prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id, name, email } = body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { name: name, email: email },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
});
