/**
 * @typedef {Object} TInput
 * @property {JSX.Element} [before] - Element to be rendered before the input.
 * @property {JSX.Element} [after] - Element to be rendered after the input.
 * @property {string} [actionButtonTitle="Copy"] - The title of action button. Default value is Copy
 * @property {(value: string) => string | void} [onChange] - Function to call when the input value changes.
 * @property {(value: string) => string | void} [onAction] - Function to call when action button is Pressed. Can be used for copy value func.
 * @property {() => void} [onClear] - Function to call when the input is cleared.
 * @property {() => void} [onEnterPress] - Function to call when the Enter key is pressed.
 * @property {() => void} [onEscPress] - Function to call when the Escape key is pressed.
 * @property {() => void} [onBlur] - Function to call when the input loses focus.
 * @property {() => void} [onFocus] - Function to call when the input gains focus.
 * @property {string} [type] - The type of the input.
 * @property {string} [placeholder] - The placeholder text for the input.
 * @property {string} [label] - The label for the input.
 * @property {string} [defaultValue] - The default value of the input.
 * @property {string} [value] - The controlled value of the input.
 * @property {boolean} [fill] - Whether the input should take up the full width of its container.
 * @property {boolean} [inline] - Whether the input should be displayed inline.
 * @property {boolean} [small] - Whether the input should be rendered in a smaller size.
 * @property {boolean} [invisible] - Whether the input should be invisible.
 * @property {boolean} [disabled] - Whether the input should be disabled.
 * @property {boolean} [error] - Whether the input is currently in an error state.
 * @property {boolean} [initialFocus] - Whether the input should be focused initially.
 */
export type TInput = {
  before?: JSX.Element,
  after?: JSX.Element,
  actionButtonTitle?: string,
  onChange?: (value: string) => string | void,
  onAction?: (currentValue: string) => string | void,
  onClear?: () => void,
  onEnterPress?: () => void,
  onEscPress?: () => void,
  onBlur?: () => void,
  onFocus?: () => void,
  type?: string,
  placeholder?: string,
  label?: string,
  defaultValue?: string,
  value?: string,
  fill?: boolean,
  inline?: boolean,
  small?: boolean,
  invisible?: boolean,
  disabled?: boolean,
  error?: boolean,
  initialFocus?: boolean
}