export type TUserAgentContextProvider = {
  children?: React.ReactNode,
  userAgent: string
}

export type TUserAgentContext = {
  GetBrowser: () => string,
  ToString: () => string
}