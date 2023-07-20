import { Logo } from '@clipcap/ui';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles['section']}`}>
        <Logo />
      </div>
      <div className={`${styles.section} ${styles['section-actions']}`}>
        
      </div>
    </div>
  )
}