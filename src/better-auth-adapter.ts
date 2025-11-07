import { implicit$FirstArg, type QRL } from '@builder.io/qwik';
import { routeLoader$, type RequestEventCommon } from '@builder.io/qwik-city';
import { isServer } from '@builder.io/qwik/build';
import { type Session, Auth } from 'better-auth';

const getSessionData = (req: Request, auth: Auth) => auth.api.getSession({ headers: req.headers });

export const BetterAuthQrl = (authQrl: QRL<(ev: RequestEventCommon) => Auth>) => {
  // eslint-disable-next-line qwik/loader-location
  const useSessionLoader = routeLoader$(req => req.sharedMap.get('session') as Session | null);

  const onRequest = async (req: RequestEventCommon) => {
    if (isServer) {
      const prefix = '/api/auth/';

      const auth = await authQrl(req);
      if (req.url.pathname.startsWith(prefix)) {
        const res = await auth.handler(req.request);
        throw req.send(res);
      } else {
        const session = await getSessionData(req.request, auth);
        req.sharedMap.set('session', session);
      }
    }
  };

  return { useSessionLoader, onRequest };
};

export const BetterAuth$ = implicit$FirstArg(BetterAuthQrl);
