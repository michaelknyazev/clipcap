/**
 * @typedef {Object} TModal
 * @property {React.ReactNode} children - The content to be rendered inside the Modal component.
 * @property {string} [title] - The title of the Modal.
 * @property {boolean} [large] - Flag indicating whether the Modal is large.
 * @property {function} [onCrossClick] - Function to be called when the close button is clicked.
 */
export type TModal = {
  children: React.ReactNode,
  title?: string,
  large?: boolean,
  onCrossClick?: () => void
}