/**
 * @typedef {Object} TBubble
 * @property {React.ReactNode} children - The children nodes to be rendered inside the Bubble component.
 * @property {string} [template='default'] - The template of the bubble, which determines the look and feel of the bubble.
 * @property {boolean} [show=false] - A flag to control the visibility of the bubble.
 * @property {string} [title] - The title to be shown in the bubble.
 * @property {React.ReactNode} [content] - The content to be shown in the bubble.
 */
export type TBubble = {
  children: React.ReactNode,
  template?: string,
  show?: boolean,
  title?: string,
  content?: React.ReactNode
}