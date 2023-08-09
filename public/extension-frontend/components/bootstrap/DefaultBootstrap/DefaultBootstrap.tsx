import { AuthenticationContextProvider } from '@clipcap/contexts';

import type { TBootstrap } from '@clipcap/types';

export const DefaultBootstrap = ({ children }: TBootstrap) => {
  return (
    <AuthenticationContextProvider>
      {children}
    </AuthenticationContextProvider>
  );
};
