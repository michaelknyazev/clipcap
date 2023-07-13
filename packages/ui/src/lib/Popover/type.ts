import type { ReactElement } from "react"
/**
 * @typedef TPopover
 * @type {Object}
 * @property {React.ReactNode} [children] - The trigger element for the popover.
 * @property {boolean} [show] - Indicates whether the popover is initially shown (default is false).
 * @property {boolean} [inline] - Indicates whether the popover is displayed as an inline element (default is false).
 * @property {() => void} [onClose] - The handler for the popover close event.
 * @property {React.ReactNode} [content] - The content to be displayed inside the popover.
 * @property {string} [position] - The position of the popover relative to the trigger element (default is 'top').
 */
export type TPopover = {
  children?: React.ReactNode,
  show?: boolean,
  inline?: boolean,
  onClose?: () => void,
  content?: React.ReactNode,
  position?: string
}
/**
 * @typedef TPopoverGroup
 * @type {Object}
 * @property {Array<TPopoverGroupItem>} children - The array of popover group items.
 */
export type TPopoverGroup = {
  children: TPopoverGroupItem[]
}
/**
 * @typedef TPopoverGroupItemProps
 * @type {Object}
 * @property {() => void} handleClose - The handler for closing the popover group item.
 * @property {() => void} handleToggle - The handler for toggling the popover group item.
 * @property {boolean} [show] - Indicates whether the popover group item is initially shown (default is false).
 */
export type TPopoverGroupItemProps = {
  handleClose:() => void,
  handleToggle:() => void,
  show?: boolean
}
/**
 * @typedef TPopoverGroupItem
 * @type {Object}
 * @property {(props: TPopoverGroupItemProps) => ReactElement<TPopover>} - A function that accepts TPopoverGroupItemProps and returns a ReactElement of type TPopover.
 */
export type TPopoverGroupItem = (props: TPopoverGroupItemProps) => ReactElement<TPopover>