import { createContext, useEffect, useState } from "react";

import type { TUserAgentContext, TUserAgentContextProvider } from "./types";
import { detectUserAgent } from "@clipcap/helpers";

const UserAgentContext = createContext<TUserAgentContext>({
  GetBrowser: () => "",
  ToString: () => ""
});

const UserAgentContextProvider = ({ children }: TUserAgentContextProvider) => {
  const [userAgent, setUserAgent] = useState<string>("");


  useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, []);

  const Methods = {
    GetBrowser: () => detectUserAgent(userAgent),
    ToString: () => userAgent
  }

  return (
    <UserAgentContext.Provider value={Methods}>
      {children}
    </UserAgentContext.Provider>
  );
}

export {
  UserAgentContext,
  UserAgentContextProvider
};