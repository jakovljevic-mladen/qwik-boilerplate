import { component$ } from '@builder.io/qwik';
import { useSessionLoader } from '~/routes/plugin@auth';
import Button from '~/components/ui/Button/Button';
import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient();

export default component$(() => {
  const session = useSessionLoader();

  return (
    <Button
      onClick$={() => {
        if (session.value) {
          authClient.signOut();
        } else {
          authClient.signIn.social({ provider: 'github' });
        }
      }}>
      {session.value ? 'Logout' : 'Login'}
    </Button>
  );
});
