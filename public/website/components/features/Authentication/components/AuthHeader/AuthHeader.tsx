import styles from './AuthHeader.module.scss';

import { Logo } from '@clipcap/ui';
import type { TAuthHeader } from './types';

const AuthHeader = ({ children }: TAuthHeader) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles['section-logo']}`}>
        <Logo />
      </div>
      {(() => {
        if (children) {
          return (
            <div className={`${styles.section} ${styles['section-button']}`}>
              {children}
            </div>
          );
        }
      })()}

    </div>
  );
}

export { AuthHeader };