import { TUser } from "@clipcap/types"

export type TIdentityContextProvider = {
  children?: React.ReactNode
}

export type TIdentityContext = {
  User: () => TUser | undefined,
  Authorized: () => boolean,
}

export type TIdentityContextUserState = {
  loading: boolean,
  data: TUser | undefined
}