import styles from './AuthPageLayout.module.scss';
import type { TLayout, TSection } from '@clipcap/ui'

const AuthPageLayout = ({ children }: TLayout) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

AuthPageLayout.Section = ({ children }: TSection) => {
  return (
    <div className={styles.section}>
      {children}
    </div>
  )
};

export { AuthPageLayout };