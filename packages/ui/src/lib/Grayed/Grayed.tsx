import styles from './Grayed.module.scss';

import { Children } from 'react';
import type { TGrayed } from './type';
/**
 * Grayed component.
 *
 * @param {TGrayed} props - The properties of the Grayed component.
 * @returns {JSX.Element} The rendered Grayed component.
 */
export const Grayed = ({ children }: TGrayed): JSX.Element => {
  return (
    <>
    {Children.map(children, child => {
    return (
      <span className={styles.container}>
        {child}
      </span>
    )
  })}
    </>
  )
}
