/**
 * @typedef TPortal
 * @type {Object}
 * @property {React.ReactNode} children - The content to be rendered inside the portal.
 * @property {boolean} [isOpen] - Indicates whether the portal is initially open (default is false).
 * @property {() => void} [onClose] - The handler for the portal close event.
 */
export type TPortal = {
  children: React.ReactNode,
  isOpen?: boolean,
  onClose?: () => void,
  left?: boolean,
  right?: boolean
}