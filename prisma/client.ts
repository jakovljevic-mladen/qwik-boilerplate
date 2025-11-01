import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { loadEnv } from 'vite';

// Load environment variables this way to be compatible with Vitest
const env =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env
    : loadEnv('test', process.cwd(), '');

const adapter = new PrismaPg({ connectionString: env.VITE_DATABASE_URL });

export const prismaClient = new PrismaClient({ adapter });
