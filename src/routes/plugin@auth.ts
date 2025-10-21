import { QwikAuth$ } from '@auth/qwik';
import GitHub from '@auth/qwik/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prismaClient } from '~/prisma-client';
import { isServer } from '@builder.io/qwik';

// noinspection JSUnusedGlobalSymbols
export const {
  onRequest,
  useSession: useSessionLoader,
  useSignIn: useSignInAction,
  useSignOut: useSignOutAction,
} = QwikAuth$(({ env }) => ({
  secret: env.get('AUTH_SECRET'),
  trustHost: true,
  name: 'auth',
  adapter: isServer ? PrismaAdapter(prismaClient) : undefined,
  session: {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    updateAge: 60 * 60 * 24 * 10, // 10 days
  },
  providers: [
    GitHub({
      clientId: env.get('GITHUB_ID'),
      clientSecret: env.get('GITHUB_SECRET'),
      allowDangerousEmailAccountLinking: true,
    }),
  ],
}));
