import { UserAgentContextProvider } from '@clipcap/contexts'

import type { TBootstrap } from '@clipcap/types';

export const DefaultBootstrap = ({ ssrProps, children }: TBootstrap) => {
  const { userAgent } = ssrProps;

  return (
    <UserAgentContextProvider userAgent={userAgent}>
      {children}
    </UserAgentContextProvider>
  )
};
