import { Children } from 'react'
import styles from './ControlGroup.module.scss'
import type { TControlGroup } from './types';
/**
 * @function ControlGroup
 * @param {TControlGroup} props - The properties of the ControlGroup component.
 * @returns {JSX.Element} The ControlGroup component.
 *
 * This component acts as a container for other components and provides style properties for their alignment and distribution.
 */
export const ControlGroup = ({ children }: TControlGroup) => {
  return (
    <div className={styles.container}>
      {Children.map(children, child => {
        return (
          <div className={styles.section}>
            {child}
          </div>
        )
      })}
    </div>
  );
}