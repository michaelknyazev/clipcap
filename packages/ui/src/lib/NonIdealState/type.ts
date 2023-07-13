/**
 * @typedef {Object} TNonIdealState
 * @property {React.ReactNode} icon - The icon to be displayed in the NonIdealState component.
 * @property {string} title - The title of the NonIdealState.
 * @property {string} description - The description of the NonIdealState.
 * @property {React.ReactNode} [action] - The action to be performed in the NonIdealState.
 * @property {boolean} [large] - Flag indicating whether the NonIdealState is large.
 */
export type TNonIdealState = {
  icon: React.ReactNode,
  title: string,
  description: string,
  action?: React.ReactNode,
  large?:boolean
}
