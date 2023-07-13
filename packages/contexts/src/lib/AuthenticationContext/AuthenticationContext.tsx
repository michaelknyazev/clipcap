import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AuthenticationService } from '@clipcap/services';
import { Splash } from '@clipcap/ui';
import Icon from '@clipcap/icons';

import type { TResponse } from '@clipcap/types';
import type { TAuthenticationContextProvider, TAuthenticationContext, TQueryWithRedirectUri } from './types';

const AuthenticationContext = createContext<TAuthenticationContext>({
  Refresh: () => new Promise(resolve => resolve("")),
  LogOut: () => new Promise(resolve => resolve(""))
});
const AuthenticationContextProvider = ({ children }: TAuthenticationContextProvider) => {
  const router = useRouter();
  const { pathname, asPath } = router;
  const isAuthPage = pathname.includes('/auth');

  const [authorization, setAuthorization] = useState({
    loading: true,
    data: null
  });

  const Methods = {
    Refresh: () => {
      setAuthorization({ ...authorization, loading: true });

      return AuthenticationService.Refresh().then(({ success, event }: TResponse) => {
        if (!success) {
          let { redirect_uri = null } = router.query

          if (!isAuthPage) {
            const { asPath } = router;

            const _buff = Buffer.from(asPath);
            redirect_uri = _buff.toString('base64');
          }

          setAuthorization({ loading: false, data: null });

          return `/auth${redirect_uri ? `?redirect_uri=${redirect_uri}` : ''}`;
        }

        let redirectLocation = window.location.pathname;
        const query = router.query as TQueryWithRedirectUri;
        const { redirect_uri } = query;

        if (redirect_uri) {
          const _buff = Buffer.from(redirect_uri, 'base64');
          const _decodedRedirectLocation = _buff.toString('ascii');

          redirectLocation = _decodedRedirectLocation;
        }

        setAuthorization({ ...authorization, loading: false });

        return redirectLocation;
      })
    },
    LogOut: () => {
      setAuthorization({ ...authorization, loading: true });

      return AuthenticationService.Logout().then(({ success }: TResponse) => {
        if (!success) return setAuthorization({ ...authorization, loading: false });

        const _buff = Buffer.from(router.asPath);
        const redirect_uri = _buff.toString('base64');

        const redirectLocation = `/auth?redirect_uri=${redirect_uri}`;

        setAuthorization({ ...authorization, data: null });

        return redirectLocation;
      })
    }
  }

  useEffect(() => {
    Methods.Refresh().then((redirect_uri: string) => {
      router.push(redirect_uri);
    });
  }, []);

  return (
    <AuthenticationContext.Provider value={Methods}>
      <Splash hide={!authorization.loading} content={<Icon name="loading" />} />
      {(() => {
        if (!authorization.loading) return children;
      })()}
    </AuthenticationContext.Provider>
  );
}

export {
  AuthenticationContext,
  AuthenticationContextProvider
}