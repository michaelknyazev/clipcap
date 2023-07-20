import { createContext, useEffect, useRef, useState } from 'react';

import { AuthenticationService } from '@clipcap/services';

import type { TAuthorization } from '@clipcap/types';
import type { TAuthenticationContextProviderProps, TAuthorizationContextMethods } from './types';
import { AuthForm } from '../../components/AuthForm';
import { Loader } from '../../components/Loader';

const AuthenticationContextDefaultValue = {
  GetAccessToken: (): Promise<string> => new Promise(r => r("")),
  GetRefreshToken: (): Promise<string> => new Promise(r => r("")),
  Refresh: (_: string): Promise<TAuthorization> => new Promise(r => r({ access_token: "", refresh_token: "" })),
}
 
const AuthenticationContext = createContext<TAuthorizationContextMethods>(AuthenticationContextDefaultValue);
const AuthenticationContextProvider = ({ 
  children,
  onAuthorizationRefresh = () => new Promise(r => r({ access_token: "", refresh_token: "" })),
  onAuthorizationRequest = () => new Promise(r => r({ access_token: "", refresh_token: "" }))
}: TAuthenticationContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [AccessToken, setAccessToken] = useState<string>("")
  const [RefreshToken, setRefreshToken] = useState<string>("")

  const handleGetStoredAuthorization = () => {
    return onAuthorizationRequest();
  }

  const handleRefreshAuthorization = async (stored_refresh_token: string): Promise<TAuthorization> => {
    try {
      const { success, event, result } = await AuthenticationService.Refresh(stored_refresh_token);
      if (!success) throw new Error(event);

      const { access_token, refresh_token } = result;
      if (!access_token || !refresh_token) throw new Error(event);

      await onAuthorizationRefresh(result);

      setAccessToken(access_token);
      setRefreshToken(refresh_token);

      return result
    } catch (err) {
      setAccessToken("");
      setRefreshToken("");

      return { access_token: "", refresh_token: "" }
    }
  }

  useEffect(() => {
    handleGetStoredAuthorization().then(({ access_token, refresh_token }) => {
      if (access_token === "" || refresh_token === "") return setLoading(false);

      return handleRefreshAuthorization(refresh_token).then(() => {
        setLoading(false);
      });
    })
  }, []);

  const Methods = {
    GetAccessToken: (): Promise<string> => new Promise(resolve => resolve(AccessToken)),
    GetRefreshToken: (): Promise<string> => new Promise(resolve => resolve(RefreshToken)),
    Refresh: handleRefreshAuthorization
  }

  return (
    <AuthenticationContext.Provider value={Methods}>
      {(() => {
        if (loading) {
          return <Loader />
        }

        if (RefreshToken === "" || AccessToken === "") {
          return <AuthForm />
        }

        return children;
      })()}
    </AuthenticationContext.Provider>
  );
}

export {
  AuthenticationContext,
  AuthenticationContextProvider
}