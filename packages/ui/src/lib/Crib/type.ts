/**
 * @typedef {Object} TCrib
 * @property {React.ReactNode} [before] - The content to be displayed before the main content.
 * @property {React.ReactNode} [after] - The content to be displayed after the main content.
 * @property {React.ReactNode} [children] - The main content.
 * @property {() => void} [onClick] - The function to call when the crib is clicked.
 */
export type TCrib = {
  before?: React.ReactNode,
  after?: React.ReactNode,
  children?: React.ReactNode,
  onClick?: () => void
}