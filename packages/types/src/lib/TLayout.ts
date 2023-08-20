import { ComponentType, Children, ReactElement, ReactNode } from "react"
/**
 * @typedef {Object} TSection
 * @property {React.ReactNode} [children] - The content to be rendered inside the Section component.
 */
export type TSection = {
  children?: ReactNode
}
/**
 * @template SectionType
 * @typedef {Object} TLayout
 * @property {ReactElement<SectionType> | ReactElement<SectionType>[]} [children] - The content to be rendered inside the Layout component.
 */
export type TLayout<SectionType = TSection> = {
  children?: (ReactElement<SectionType> | ReactElement<SectionType>[])[]
}
/**
 * @typedef {Object} TLayoutComponentType
 * @property {Function} - A function that takes TLayout props and returns a ReactElement.
 * @property {ComponentType<TSection>} Section - A reusable section component within the layout.
 */
export type TLayoutComponentType = {
  (props: TLayout): ReactElement;
  Section: ComponentType<TSection>
}