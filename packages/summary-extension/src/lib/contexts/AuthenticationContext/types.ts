import type { TAuthorization } from "@clipcap/types"

export type TAuthorizationContextMethods = {
  GetAccessToken: () => Promise<string>,
  GetRefreshToken: () => Promise<string>,
  Refresh: (stored_refresh_token: string) => Promise<TAuthorization>
}

export type TAuthenticationContextProviderProps = {
  children: React.ReactNode,
  onAuthorizationRefresh: (data: TAuthorization) => Promise<TAuthorization>,
  onAuthorizationRequest: () => Promise<TAuthorization>
}