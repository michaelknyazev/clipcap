export type TTextarea = {
  value?: string,
  placeholder?: string,
  onChange?: (value: string) => void,
  onBlur?: () => void,
  onFocus?: () => void,
  onEnterPress?: () => void,
  onEscPress?: () => void
}