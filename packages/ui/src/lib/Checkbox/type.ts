/**
 * @typedef {Object} TCheckbox
 * @property {boolean} [checked=false] - Indicates whether the checkbox is checked or not.
 * @property {boolean} [disabled=false] - Indicates whether the checkbox is disabled or not.
 * @property {React.ReactNode} [children] - The content to be displayed next to the checkbox.
 * @property {(checked: boolean) => void} [onChange] - The function to call when the checkbox is clicked.
 */
export type TCheckbox = {
  checked?: boolean,
  disabled?: boolean,
  children?: React.ReactNode,
  onChange?: (checked: boolean) => void
}