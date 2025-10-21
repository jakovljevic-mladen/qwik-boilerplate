import { component$ } from '@builder.io/qwik';
import { useSessionLoader, useSignInAction, useSignOutAction } from '~/routes/plugin@auth';

export default component$(() => {
  const session = useSessionLoader();
  const signIn = useSignInAction();
  const signOut = useSignOutAction();

  return (
    <button
      onClick$={() => {
        if (session.value) {
          signOut.submit({ redirectTo: '/' });
        } else {
          signIn.submit({ providerId: 'github' });
        }
      }}>
      {session.value ? 'Logout' : 'Login'}
    </button>
  );
});
