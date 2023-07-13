export type TTag = {
  children: React.ReactNode,
  label?: string,
  large?: boolean,
  medium?: boolean,
  small?: boolean,
  plain?: boolean,
  before?: React.ReactNode,
  after?: React.ReactNode,
  onClick?: () => void,
  success?: boolean,
  purple?: boolean,
  outlined?: boolean,
  fill?: boolean,
  value?: string
}

export type TTagOptions = {
  children: React.ReactElement<TTag>[],
  value: string,
  onChange: (value: TTagOption) => void
}

export type TTagOption = {
  label: string,
  value: string
}