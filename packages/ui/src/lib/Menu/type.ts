/**
 * @typedef {Object} TMenu
 * @property {React.ReactNode} [children] - The content to be rendered inside the Menu component.
 * @property {boolean} [minimize] - Flag indicating whether to minimize the Menu.
 */
export type TMenu = {
  children?: React.ReactNode,
  minimize?: boolean
}
/**
 * @typedef {Object} TMenuItem
 * @property {React.ReactNode} [before] - Content to be displayed before the item label.
 * @property {React.ReactNode} [after] - Content to be displayed after the item label.
 * @property {string} [label] - The label of the MenuItem.
 * @property {boolean} [active] - Flag indicating whether the MenuItem is active.
 * @property {React.ReactNode} [children] - The content to be rendered inside the MenuItem component.
 */
export type TMenuItem = {
  before?: React.ReactNode,
  after?: React.ReactNode,
  label?: string,
  active?: boolean,
  children?: React.ReactNode
}