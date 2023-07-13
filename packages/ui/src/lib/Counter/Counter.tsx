import styles from './Counter.module.scss';

import type { TCounter } from './type'
/**
 * @function Counter
 * @param {TCounter} props - The properties of the Counter component.
 * @returns {JSX.Element} The Counter component.
 *
 * This component displays a count and an optional label.
 */
export const Counter = ({ children = 0, empty = false, label }: TCounter) => {
  const className = [
    styles.container
  ]

  if (empty) className.push(styles['container--empty']);

  return (
    <div className={className.join(' ')}>
      <div className={`${styles.section} ${styles['section-content']}`}>
        {children}
      </div>
      <div className={`${styles.section} ${styles['section-label']}`}>
        {label}
      </div>
    </div>
  )
}
