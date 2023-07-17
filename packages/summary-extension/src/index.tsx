import { AuthenticationContextProvider } from './lib/contexts/AuthenticationContext'

import { ExtensionContainer } from './lib/components/ExtensionContainer'
import { TAuthorization } from '@clipcap/types'
import { ExtensionWrapper } from './lib/components/ExtensionWrapper'

type TSummaryExtension = {
  access_token: string,
  refresh_token: string,
  onAuthorizationRefresh: (data: TAuthorization) => Promise<TAuthorization>
}

export const SummaryExtension = ({
  access_token,
  refresh_token,
  onAuthorizationRefresh
}: TSummaryExtension) => {
  return (
    <ExtensionWrapper>
      <AuthenticationContextProvider 
        access_token={access_token} 
        refresh_token={refresh_token} 
        onAuthorizationRefresh={onAuthorizationRefresh}
      >
        <ExtensionContainer />
      </AuthenticationContextProvider>
    </ExtensionWrapper>
  )
}