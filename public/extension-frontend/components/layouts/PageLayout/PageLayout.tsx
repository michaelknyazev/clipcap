import styles from './PageLayout.module.scss';

import type { TLayout } from '@clipcap/ui'

const PageLayout = ({ children }: TLayout) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

PageLayout.Section = ({ children }) => {
  return (
    <div className={styles.section}>
      {children}
    </div>
  )
}

export { PageLayout }; 