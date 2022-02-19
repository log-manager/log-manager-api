import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function resetDb() {
  await prisma.$transaction([prisma.logs.deleteMany(), prisma.user.deleteMany()]);
}

export async function disconnect() {
  await prisma.$disconnect();
}
