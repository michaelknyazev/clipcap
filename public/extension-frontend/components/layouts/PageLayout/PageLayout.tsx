import styles from './PageLayout.module.scss';

import type { TLayout } from '@clipcap/types'

const PageLayout = ({ children }: TLayout) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

PageLayout.Section = ({ children, empty = false }) => {
  const className = [
    styles.section
  ];
  if (empty) className.push(styles['section-empty']);
  
  return (
    <div className={className.join(' ')}>
      {children}
    </div>
  )
}

export { PageLayout }; 