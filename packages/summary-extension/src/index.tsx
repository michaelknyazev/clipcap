import { AuthenticationContextProvider } from './lib/contexts/AuthenticationContext'

import { ExtensionContainer } from './lib/components/ExtensionContainer'
import { TAuthorization } from '@clipcap/types'
import { ExtensionWrapper } from './lib/components/ExtensionWrapper'

type TSummaryExtension = {
  onAuthorizationRequest: () => Promise<TAuthorization>
  onAuthorizationRefresh: (data: TAuthorization) => Promise<TAuthorization>
}

export const SummaryExtension = () => {
  return (
    <ExtensionContainer />
  )
}