import { createContext, useEffect, useState } from "react";
import type { TIdentityContext, TIdentityContextProvider, TIdentityContextUserState } from "./types";

import { UserService } from '@clipcap/services';

import { Splash } from "@clipcap/ui";
import Icon from '@clipcap/icons';

const IdentityContext = createContext<TIdentityContext>({
  User: () => undefined,
  Authorized: () => false,
});
const IdentityContextProvider = ({ children }: TIdentityContextProvider) => {
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
        const { success, result, event } = await UserService.Identify();

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
      <Splash hide={!user.loading} content={<Icon name="loading" />} />
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