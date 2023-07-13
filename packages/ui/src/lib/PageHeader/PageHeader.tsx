import styles from './PageHeader.module.scss';

import { Children } from 'react';

import type { TPageHeader, TPageHeaderSection } from './type';
/**
 * A PageHeader component, which provides UI for a page header.
 *
 * @component
 * @param {TPageHeader} props - The props for the PageHeader component.
 * @returns {JSX.Element} The rendered PageHeader component.
 */
const PageHeader = ({ children }: TPageHeader): JSX.Element => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
/**
 * A PageHeader.Left component, which provides UI for the left section of a page header.
 *
 * @component
 * @param {TPageHeaderSection} props - The props for the PageHeader.Left component.
 * @returns {JSX.Element} The rendered PageHeader.Left component.
 */
PageHeader.Left = ({ children }: TPageHeaderSection): JSX.Element => {
  return (
    <div className={`${styles.section} ${styles['section-left']}`}>
      <div className={styles.content}>
        {Children.map(children, child => {
          return (
            <div className={styles['content__section']}>
              {child}
            </div>
          )
        })}
      </div>
    </div>
  )
}
/**
 * A PageHeader.Right component, which provides UI for the right section of a page header.
 *
 * @component
 * @param {Object} props - The props for the PageHeader.Right component.
 * @returns {JSX.Element} The rendered PageHeader.Right component.
 */
PageHeader.Right = ({ children }: TPageHeaderSection): JSX.Element => {
  return (
    <div className={`${styles.section} ${styles['section-right']}`}>
      <div className={styles.content}>
        {Children.map(children, child => {
          return (
            <div className={styles['content__section']}>
              {child}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export { PageHeader }