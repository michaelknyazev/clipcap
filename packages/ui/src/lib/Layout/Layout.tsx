import styles from './Layout.module.scss';
import { Children } from 'react';

import type { TLayout, TSection } from './type';
/**
 * Layout component. It can contain multiple Section components.
 *
 * @param {TLayout} props - The properties of the Layout component.
 * @returns {JSX.Element} The rendered Layout component.
 */
const Layout = ({ children }: TLayout): JSX.Element => {
  return (
    <div className={styles.container}>
      {Children.map(children, child => {
        return child;
      })}
    </div>
  )
}
/**
 * Section component. It can be used within a Layout component.
 *
 * @param {TSection} props - The properties of the Section component.
 * @returns {JSX.Element} The rendered Section component.
 */
Layout.Section = ({ children }: TSection): JSX.Element => {
  return (
    <div className={styles.section}>
      {children}
    </div>
  )
}

export { Layout }