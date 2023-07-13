/**
 * @typedef TToasterProps
 * @type {Object}
 * @property {number} [duration] - The duration in milliseconds for which the toast is displayed.
 */
export type TToasterProps = {
  duration?: number
}
/**
 * @typedef TToast
 * @type {Object}
 * @property {number} [id] - The unique identifier of the toast.
 * @property {string} [template] - The template name for styling the toast.
 * @property {string} [message] - The message to be displayed within the toast.
 */
export type TToast = {
  id?: number,
  template?: string,
  message?: string
}
/**
 * @typedef TToasterState
 * @type {Object}
 * @property {Array<TToast>} toasts - The list of toasts currently managed by the Toaster component.
 */
export type TToasterState = {
  toasts: TToast[]
}