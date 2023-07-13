import styles from './NonIdealState.module.scss';

import type { TNonIdealState } from './type';
/**
 * A NonIdealState component, used to provide feedback to users when something isn't quite right.
 *
 * @component
 * @param {TNonIdealState} props - The props for the NonIdealState component.
 * @returns {JSX.Element} The rendered NonIdealState component.
 */
export const NonIdealState = ({
  icon,
  title,
  description,
  action,
  large = false,
}: TNonIdealState): JSX.Element => {
  const className = [
    styles.container
  ]

  if (large) className.push(styles['container-large'])
  
  return (
    <div className={className.join(' ')}>
      <div className={`${styles.section} ${styles['section-icon']}`}>
        <div className={styles.icon}>
          {icon}
        </div>
      </div>
      <div className={styles.section}>
        <h4 className={styles.title}>
          {title}
        </h4>
      </div>
      <div className={`${styles.section} ${styles['section-description']}`}>
        <p className={styles.text}>
          {description}
        </p>
      </div>
      {(() => {
        if (action) {
          return (
            <div className={styles.section}>
              {action}
            </div>
          );
        }
      })()}
    </div>
  );
}