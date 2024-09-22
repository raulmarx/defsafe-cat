import { PrismaClient, Prisma } from '@prisma/client'
import { convertBigInt } from '~/utils/convertBigInt';
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany();

  // Converter todos os BigInts para strings
  return convertBigInt(users);
});
