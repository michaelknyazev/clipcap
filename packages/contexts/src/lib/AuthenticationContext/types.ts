export type TAuthenticationContextProvider = {
  children?: React.ReactNode
}

export type TAuthenticationContext = {
  Refresh: () => Promise<string | void>,
  LogOut: () => Promise<string | void>
}

export type TQueryWithRedirectUri = {
  redirect_uri?: string
}