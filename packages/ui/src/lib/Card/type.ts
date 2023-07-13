/**
 * @typedef {Object} TCard
 * @property {React.ReactNode} [children] - The content to be displayed inside the card.
 * @property {boolean} [tabs=false] - A flag to control whether the card should contain tabs.
 */
export type TCard = {
  children?: React.ReactNode,
  tabs?: boolean
}