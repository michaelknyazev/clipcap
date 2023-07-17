import { createContext, useEffect, useRef, useState } from 'react';

import { AuthenticationService } from '@clipcap/services';

import type { TAuthorization } from '@clipcap/types';
import type { TAuthenticationContextProviderProps, TAuthorizationContextMethods } from './types';
import { AuthForm } from '../../components/AuthForm';
import { Loader } from '../../components/Loader';

const AuthenticationContextDefaultValue = {
  GetAccessToken: (): Promise<string> => new Promise(r => r("")),
  GetRefreshToken: (): Promise<string> => new Promise(r => r("")),
  Refresh: (_: TAuthorization): Promise<TAuthorization> => new Promise(r => r({
    access_token: "",
    refresh_token: ""
  })),
}
 
const AuthenticationContext = createContext<TAuthorizationContextMethods>(AuthenticationContextDefaultValue);
const AuthenticationContextProvider = ({ 
  children,
  access_token,
  refresh_token, 
  onAuthorizationRefresh
}: TAuthenticationContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [AccessToken, setAccessToken] = useState<string>(access_token)
  const [RefreshToken, setRefreshToken] = useState<string>(refresh_token)

  const handleRefreshAuthorization = (newAuthorization: TAuthorization): Promise<TAuthorization> => new Promise((resolve, reject) => {
    setAccessToken(newAuthorization.access_token);
    setRefreshToken(newAuthorization.refresh_token);

    if (onAuthorizationRefresh) {
      onAuthorizationRefresh(newAuthorization).then((authorization) => {
        resolve(authorization);
      }).catch(err => {
        setAccessToken("");
        setRefreshToken("");

        return onAuthorizationRefresh({ access_token: "", refresh_token: "" }).then(() => {
          reject(err);
        });
      })
      return;
    }

    setAccessToken("");
    setRefreshToken("");
    reject(new Error("no authorization refresh handler"));
    return;
  });

  useEffect(() => {
    AuthenticationService.Refresh(RefreshToken).then(({ success, event, result }) => {
      if (!success) {
        throw new Error(event);
      }

      return handleRefreshAuthorization(result).then(() => {
        setLoading(false);
      }).catch(err => {
        console.log(err);
        setAccessToken("");
        setRefreshToken("");
        setLoading(false);
      })
    }).catch(err => {
      console.log(err);
      setAccessToken("");
      setRefreshToken("");
      setLoading(false);
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

        if (RefreshToken === "") {
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