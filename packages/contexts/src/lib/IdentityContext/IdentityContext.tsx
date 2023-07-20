import { createContext, useContext, useEffect, useState } from "react";
import type { TIdentityContext, TIdentityContextProvider, TIdentityContextUserState } from "./types";

import { UserService } from '@clipcap/services';

import { AuthenticationContext } from "../AuthenticationContext";
import { Spinner } from "@blueprintjs/core";

const IdentityContext = createContext<TIdentityContext>({
  User: () => undefined,
  Authorized: () => false,
});
const IdentityContextProvider = ({ children }: TIdentityContextProvider) => {
  const { GetAccessToken } = useContext(AuthenticationContext);
  const [user, setUser] = useState<TIdentityContextUserState>({
    loading: true,
    data: undefined
  });

  useEffect(() => {
    Methods.Identify();
  }, []);

  const Methods = {
    Identify: async () => {
      let data;
      try {
        const access_token = GetAccessToken()
        const { success, result, event } = await UserService.Identify(access_token);

        if (!success) throw new Error(event);

        data = result;
      } catch (err) {
        console.log(err);
      }

      setUser({ loading: false, data });
    },
    User: () => {
      return user.data
    },
    Authorized: () => {
      return !!user.data
    }
  }

  return (
    <IdentityContext.Provider value={Methods}>
      <Spinner />
      {(() => {
        if (!user.loading) return children;
      })()}
    </IdentityContext.Provider>
  );
}

export {
  IdentityContext,
  IdentityContextProvider
};