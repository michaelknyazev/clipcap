/**
 * @typedef {Object} TDatePicker
 * @property {number} currentTimestamp - The current selected date in Unix timestamp format.
 * @property {() => void} onDateChange - The function to call when the selected date is changed.
 */
export type TDatePicker = {
  currentTimestamp: number,
  onDateChange: () => void
}