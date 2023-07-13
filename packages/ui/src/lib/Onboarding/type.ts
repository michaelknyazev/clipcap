/**
 * @typedef {Object} TOnboarding
 * @property {string | React.ReactNode} [icon] - The icon of the Onboarding component.
 * @property {string} [text] - The text of the Onboarding component.
 * @property {string} title - The title of the Onboarding component.
 * @property {React.ReactNode} [action] - The action of the Onboarding component.
 * @property {boolean} [yellow] - Flag indicating whether the Onboarding component has yellow theme.
 */
export type TOnboarding = {
  icon?: string | React.ReactNode,
  text?: string,
  title: string,
  action?: React.ReactNode,
  yellow?: boolean
}