//delete user
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
});
