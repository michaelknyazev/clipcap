import { createContext, useEffect, useState } from 'react';

import { AuthenticationService, TransactionService } from '@clipcap/services';
import { NonIdealState, Spinner } from '@blueprintjs/core';

import type { TAuthenticationContextProvider, TAuthenticationContext, TQueryWithRedirectUri } from './types';
import { debug, getLocalStorageProperty, setLocalStorageProperty, waitUntilWindowIsClosed } from '@clipcap/helpers';
import { useRouter } from 'next/router';
import type { TAuthorization } from '@clipcap/types';

const AuthenticationContext = createContext<TAuthenticationContext>({
  GetAccessToken: () => "",
  Google: () => new Promise(r => r([{ access_token: "", refresh_token: "" }, ""]))
});
const AuthenticationContextProvider = ({ children }: TAuthenticationContextProvider) => {
  const router = useRouter();
  const isAuthPage = router.asPath.includes("auth");
  const [RefreshToken, setRefreshToken] = useState<string>("");
  const [AccessToken, setAccessToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const handleRefresh = async (old_refresh_token: string): Promise<[TAuthorization, string]> => {
    const { redirect_uri = "" } = router.query;
    const _buff = Buffer.from(redirect_uri as string, 'base64');
    const _decodedRedirectLocation = _buff.toString('ascii');
    const redirectLocation = _decodedRedirectLocation;

    try {
      const { success, event, result } = await AuthenticationService.Refresh(old_refresh_token);
      if (!success) throw new Error(event);

      const { access_token, refresh_token } = result;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);

      setLocalStorageProperty("refresh_token", refresh_token);

      return [{ access_token, refresh_token }, redirectLocation]
    } catch (err) {
      console.log(err);
    }

    return [{
      access_token: "",
      refresh_token: ""
    }, redirectLocation]
  }

  const handleGoogleLogIn = async (): Promise<[TAuthorization, string]> => {
    try {
      const GenerateLinkResponse = await AuthenticationService.GetGoogleLink();
      if (!GenerateLinkResponse.success) throw new Error(GenerateLinkResponse.event);
  
      debug('GenerateLink', GenerateLinkResponse)
  
      const { url, transactionId } = GenerateLinkResponse.result;
      if (!url || !transactionId) throw new Error(GenerateLinkResponse.event);
  
      let _newPopUp = window.open(url, "_blank", "closed=false,popup=yes,width=450,height=550");
  
      await waitUntilWindowIsClosed(_newPopUp);
  
      const TransactionResponse = await TransactionService.Get(transactionId);
      if (!TransactionResponse.success) throw new Error(TransactionResponse.event);
  
      debug('Transaction', TransactionResponse)
  
      const Transaction = TransactionResponse.result;
      if(Transaction.status !== 2) throw new Error(Transaction.data);
  
      let authorization: TAuthorization = JSON.parse(Transaction.data)
  
      return handleRefresh(authorization.refresh_token);
    } catch (err) {
      return [{
        access_token: "",
        refresh_token: ""
      }, ""]
    }
  }

  useEffect(() => {
    const storedRefreshToken = getLocalStorageProperty("refresh_token");
    const { asPath } = router;
    const _buff = Buffer.from(asPath);
    const redirect_uri = _buff.toString('base64');

    if (storedRefreshToken) {
      handleRefresh(storedRefreshToken).then(([authorization, _]) => {
        const { access_token } = authorization;
        setLoading(false);

        if (access_token != "") return;
        if (isAuthPage) return;

        router.push(`/auth?redirect_uri=${redirect_uri}`);
      });
    } else {
      setLoading(false);
      if (isAuthPage) return
      
      router.push(`/auth?redirect_uri=${redirect_uri}`);
    }
  }, []);

  const Methods = {
    GetAccessToken: () => AccessToken,
    Google: () => handleGoogleLogIn()
  }

  return (
    <AuthenticationContext.Provider value={Methods}>
      {(() => {
        if (loading) {
          return (
            <NonIdealState
              icon={<Spinner />}
              title="Loading"
              description="Loading your authorization data"
            />
          );
        }

        if (isAuthPage) return children;

        if (AccessToken == "" || RefreshToken == "") {
          return (
            <NonIdealState
              icon={<Spinner />}
              title="Still loading"
              description="If you keep seeing this message longer then 10 seconds, please reload the page."
            />
          )
        }

        return children
      })()}
    </AuthenticationContext.Provider>
  );
}

export {
  AuthenticationContext,
  AuthenticationContextProvider
}