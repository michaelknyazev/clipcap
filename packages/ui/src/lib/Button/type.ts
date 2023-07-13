/**
 * @typedef {Object} TButton
 * @property {React.ReactNode} [children] - The content to be displayed inside the button.
 * @property {(props: any | undefined | null) => any} [onClick] - The function to execute when the button is clicked.
 * @property {React.ReactNode} [before] - The element to be displayed before the button text.
 * @property {React.ReactNode} [after] - The element to be displayed after the button text.
 * @property {boolean} [fill=false] - A flag to control whether the button should take up all available space.
 * @property {boolean} [loading=false] - A flag to control whether a loading state should be displayed.
 * @property {boolean} [tag=false] - A flag to control whether the button should be displayed as a tag.
 * @property {boolean} [xsmall=false] - A flag to control whether the button should be displayed with extra small size.
 * @property {boolean} [small=false] - A flag to control whether the button should be displayed with small size.
 * @property {boolean} [large=false] - A flag to control whether the button should be displayed with large size.
 * @property {boolean} [minimal=false] - A flag to control whether the button should have minimal styling.
 * @property {boolean} [outlined=false] - A flag to control whether the button should be displayed as outlined.
 * @property {boolean} [disabled=false] - A flag to control whether the button should be disabled.
 * @property {boolean} [secondary=false] - A flag to control whether the button should be displayed with secondary styling.
 * @property {boolean} [service=false] - A flag to control whether the button should be displayed with service styling.
 */
export type TButton = {
  children?: React.ReactNode,
  onClick?: (props: any | undefined | null) => any,
  before?: React.ReactNode,
  after?: React.ReactNode,
  fill?: boolean,
  loading?: boolean,
  tag?: boolean,
  xsmall?: boolean,
  small?: boolean,
  large?: boolean,
  minimal?: boolean,
  outlined?: boolean,
  disabled?: boolean,
  secondary?: boolean,
  service?: boolean
}