import type { TAuthorization } from "@clipcap/types"

export type TAuthorizationContextMethods = {
  GetAccessToken: () => Promise<string>,
  GetRefreshToken: () => Promise<string>,
  Refresh: (data: TAuthorization) => Promise<TAuthorization>
}

export type TAuthenticationContextProviderProps = {
  children: React.ReactNode,
  access_token: string,
  refresh_token: string,
  onAuthorizationRefresh: (data: TAuthorization) => Promise<TAuthorization>
}