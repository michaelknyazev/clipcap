/**
 * @typedef {Object} TCallout
 * @property {string} [children] - The content to be displayed inside the callout.
 * @property {boolean} [success=false] - A flag to control whether the callout should be displayed with success styling.
 * @property {boolean} [yellow=false] - A flag to control whether the callout should be displayed with yellow styling.
 */
export type TCallout = {
  children?: string,
  success?: boolean,
  yellow?: boolean
}