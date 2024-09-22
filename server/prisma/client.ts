// server/prisma/client.ts
import { PrismaClient } from '@prisma/client';

// Definindo a variável global para o Prisma no TypeScript
declare global {
  // Adiciona a variável _prisma ao objeto global
  var _prisma: PrismaClient | undefined; // eslint-disable-line
}

// Inicialize o Prisma apenas uma vez no ambiente de desenvolvimento
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'development') {
  if (!global._prisma) {
    global._prisma = new PrismaClient();
  }
  prisma = global._prisma;
} else {
  prisma = new PrismaClient();
}

export default prisma;
