import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: import.meta.env.VITE_DATABASE_URL });

export const prismaClient = new PrismaClient({ adapter });
