/**
 * @typedef {Object} TPageHeader
 * @property {React.ReactNode} [children] - The content to be rendered inside the PageHeader component.
 * @property {string} [layoutModifier] - The modifier for the layout of the PageHeader component.
 */
export type TPageHeader = {
  children?: React.ReactNode,
  layoutModifier?: string
}
/**
 * @typedef {Object} TPageHeaderSection
 * @property {React.ReactNode} [children] - The content to be rendered inside the PageHeaderSection component.
 */
export type TPageHeaderSection = {
  children?: React.ReactNode
}