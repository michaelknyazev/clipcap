/**
 * @typedef TDropdown
 * @type {Object}
 * @property {React.ReactNode} [children] - Optional children elements for the Dropdown component.
 * @property {string} [title] - Optional title to be displayed at the top of the dropdown.
 */
export type TDropdown = {
  children?: React.ReactNode,
  title?: string
}
/**
 * @typedef TDropdownItem
 * @type {Object}
 * @property {React.ReactNode} [before] - Optional content to be rendered before the item label.
 * @property {React.ReactNode} [after] - Optional content to be rendered after the item label.
 * @property {React.ReactNode} [label] - Item label to be displayed.
 * @property {boolean} [error] - Optional flag to indicate whether the item should be displayed with an error style.
 * @property {() => void} [onClick] - Optional callback function to handle click events on the item.
 */
export type TDropdownItem = {
  before?: React.ReactNode,
  after?: React.ReactNode,
  label?: React.ReactNode,
  error?: boolean,
  onClick?: () => void,
  children?: React.ReactElement<TDropdown>
}