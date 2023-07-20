import type { TAuthorization } from "@clipcap/types"

export type TAuthenticationContextProvider = {
  children?: React.ReactNode
}

export type TAuthenticationContext = {
  GetAccessToken: () => string,
  Google: () => Promise<[TAuthorization, string]>,
  LogOut: () => Promise<void>
}

export type TQueryWithRedirectUri = {
  redirect_uri?: string
}