import { ComponentType, ReactElement, ReactNode } from "react"
import { TFeature } from "./TApplication"
import { NextComponentType } from "next"
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
 * @property {ReactElement<SectionType> | Iterable<ReactElement<SectionType>>} - The content to be rendered inside the Layout component.
 * 
 * TODO: Figure how tf we can control the children type here. ReactNode makes the first two types absolete.
 */
export type TLayout<SectionType = TSection> = {
  children?: ReactElement<SectionType> | Iterable<ReactElement<SectionType>> | ReactNode
}
/**
 * @typedef {Object} TLayoutComponentType
 * @property {Function} - A function that takes TLayout props and returns a ReactElement.
 * @property {ComponentType<TSection>} Section - A reusable section component within the layout.
 */
export type TLayoutComponentType = {
  (props: TLayout): ReactElement<TSection> | Iterable<ReactElement<TSection>>;
  Section: ComponentType<TSection>
}