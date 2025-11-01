import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Modo desenvolvimento sem banco de dados
const isDatabaseAvailable = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('temp')

export const prisma = isDatabaseAvailable 
  ? (globalForPrisma.prisma ?? new PrismaClient())
  : null as any

if (process.env.NODE_ENV !== 'production' && isDatabaseAvailable) {
  globalForPrisma.prisma = prisma
}

export default prisma

