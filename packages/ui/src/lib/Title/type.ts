export type TTitle = {
  children?: React.ReactNode,
  size?: number,
  level?: number,
  medium?: boolean,
  semibold?: boolean,
  bold?: boolean,
  editable?: boolean,
  onChange?: (value: string) => void
}