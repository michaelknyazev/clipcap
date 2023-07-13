/**
 * @typedef {Object} TCounter
 * @property {string} [label] - The label to be displayed below the counter.
 * @property {React.ReactNode} [children=0] - The counter's current value.
 * @property {boolean} [empty=false] - If true, displays an empty counter.
 */
export type TCounter = {
  label?: string,
  children?: React.ReactNode,
  empty?: boolean
}