export type TRadio = {
  label: string,
  value: string,
  checked?: boolean,
  onClick?: (value: string) => void 
}

export type TRadioGroup = {
  children: React.ReactElement<TRadio>[]
  defaultValue: string,
  onChange?: (value: string) => void
}