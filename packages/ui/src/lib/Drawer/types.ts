import type { TCollection } from "@clipcap/icons"
import type { TKeyboardKey } from "@clipcap/ui/types/keyboard"
/**
 * @typedef {Object} TDrawer
 * @property {() => void} [onCrossButtonClick] - The function to call when the cross button is clicked.
 * @property {React.ReactElement<TDrawerSection> | React.ReactElement<TDrawerSection>[]} children - The content to be displayed inside the drawer.
 */
export type TDrawer = {
  onCrossButtonClick?: () => void
  children: React.ReactElement<TDrawerSection> | React.ReactElement<TDrawerSection>[]
}
/**
 * @typedef {Object} TDrawerSection
 * @property {React.ReactNode} [children] - The content to be displayed inside the drawer section.
 */
export type TDrawerSection = {
  children?: React.ReactNode
}
/**
 * @typedef {Object} TDrawerAction
 * @property {() => void} onAction - The function to call when the action is triggered.
 * @property {string} label - The label to be displayed for the action.
 * @property {keyof TCollection} icon - The icon to be displayed for the action.
 * @property {TKeyboardKey} [key] - The keyboard key that triggers the action.
 */
export type TDrawerAction = {
  onAction: () => void,
  label: string,
  icon: keyof TCollection,
  key?: TKeyboardKey
}
/**
 * @typedef {Object} TDrawerPreHeader
 * @property {React.ReactElement<TDrawerAction> | React.ReactElement<TDrawerAction>[]} [actions] - The actions to be displayed in the preheader.
 *
 * @augments TDrawerSection
 */
export type TDrawerPreHeader = TDrawerSection & {
  actions?: React.ReactElement<TDrawerAction> | React.ReactElement<TDrawerAction>[]
}
/**
 * @typedef {Object} TDrawerHeader
 *
 * @augments TDrawerSection
 */
export type TDrawerHeader = TDrawerSection & {

}
/**
 * @typedef {Object} TDrawerBody
 *
 * @augments TDrawerSection
 */
export type TDrawerBody = TDrawerSection & {
  
}