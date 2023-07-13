/**
 * @typedef TTabs
 * @property {React.ReactElement<TTab>[]} children - An array of child tab elements.
 * @property {TTabID} active - The currently active tab identifier.
 * @property {boolean} vertical - Switches the tab render mode to vertical
 * @property {(tab: TTab) => void} [onTabChange] - Callback function for when the active tab changes.
 */
export type TTabs = {
  children: React.ReactElement<TTab>[],
  active: TTabID,
  vertical?: boolean,
  onTabChange?: (tab: TTab) => void
}
/**
 * @typedef TTabID
 * @type {string | number}
 * @description Unique identifier for a tab.
 */
export type TTabID = string | number
/**
 * @typedef TTab
 * @property {TTabID} id - Unique identifier for the tab.
 * @property {string} title - Title of the tab.
 * @property {React.ReactNode} [children] - Child elements of the tab.
 * @property {boolean} [active] - Whether the tab is currently active.
 * @property {(tab: TTab) => void} [onFocus] - Callback function for when the tab gains focus.
 * @property {(tab: TTab) => void} [onBlur] - Callback function for when the tab loses focus.
 */
export type TTab = {
  id: TTabID,
  title: string,
  children?: React.ReactNode,
  active?: boolean,
  onFocus?: (tab: TTab) => void,
  onBlur?: (tab: TTab) => void
}