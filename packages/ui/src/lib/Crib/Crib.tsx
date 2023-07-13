import styles from './Crib.module.scss';

import type { TCrib } from './type';
/**
 * @function Crib
 * @param {TCrib} props - The properties of the Crib component.
 * @returns {JSX.Element} The Crib component.
 *
 * This component acts as a container for other components and provides an optional click handler.
 */
export const Crib = ({ before, after, children, onClick }: TCrib) => {
  const handleClick = () => {
    if (onClick) onClick();
  }

  const className = [
    styles.container,
    styles['container-default']
  ]

  return (
    <div className={className.join(' ')} onClick={handleClick}>
      {(() => {
        if (before) {
          return (
            <div className={`${styles.section} ${styles['section-before']}`}>
              {before}
            </div>
          );
        }
      })()}
      {(() => {
        if (children) {
          return (
            <div className={`${styles.section} ${styles['section-content']}`}>
              {children}
            </div>
          );
        }
      })()}
      {(() => {
        if (after) {
          return (
            <div className={`${styles.section} ${styles['section-after']}`}>
              {after}
            </div>
          );
        }
      })()}
    </div>
  )
}
