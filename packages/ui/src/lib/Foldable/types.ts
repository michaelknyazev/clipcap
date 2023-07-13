import { ReactElement } from "react"
/**
 * @typedef TFoldable
 * @type {Object}
 * @property {string} title - The title of the foldable section.
 * @property {React.ReactNode} closedDescription - The description to be displayed when the foldable section is closed.
 * @property {boolean} [toggle] - Indicates whether the foldable section can be toggled open and closed (default is true).
 * @property {boolean} [isOpen] - Indicates whether the foldable section is initially open (default is false).
 * @property {React.ReactNode} [children] - The content to be displayed inside the foldable section.
 * @property {() => void} [onOpen] - The handler for the foldable section open event.
 * @property {() => void} [onClose] - The handler for the foldable section close event.
 */
export type TFoldable = {
  title: string,
  closedDescription: React.ReactNode,
  toggle?: boolean,
  isOpen?: boolean,
  children?: React.ReactNode,
  onOpen?: () => void,
  onClose?: () => void
}

/**
 * @typedef TFoldableGroup
 * @type {Object}
 * @property {Array<ReactElement<TFoldable>>} children - The array of foldable section elements.
 */
export type TFoldableGroup = {
  children: ReactElement<TFoldable>[]
}