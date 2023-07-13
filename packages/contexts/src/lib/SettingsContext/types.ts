export type TSettingsContextProvider = {
  children?: React.ReactNode
}

export type TSettingsContext = {
  Get: (label: string) => any,
  Set: (label: string, value: any) => any
}

export type TSettingsContextParam = {
  label: string,
  value: any
}

export type TSettingsContextState = {
  loading: boolean,
  data: TSettingsContextParam[]
}