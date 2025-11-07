import { BetterAuth$ } from '~/better-auth-adapter';
import { betterAuth } from 'better-auth';
import { isServer } from '@builder.io/qwik';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prismaClient } from '~/prisma-client';

// noinspection JSUnusedGlobalSymbols
export const { onRequest, useSessionLoader } = BetterAuth$(({ env }) =>
  betterAuth({
    secret: env.get('AUTH_SECRET'),
    database: isServer ? prismaAdapter(prismaClient, { provider: 'postgresql' }) : undefined,
    session: {
      updateAge: 10 * 60 * 60 * 24, // 10 days
      expiresIn: 365 * 60 * 60 * 24, // 365 days
      storeSessionInDatabase: true,
    },
    socialProviders: {
      github: {
        clientId: env.get('GITHUB_ID')!,
        clientSecret: env.get('GITHUB_SECRET'),
      },
    },
  }),
);
