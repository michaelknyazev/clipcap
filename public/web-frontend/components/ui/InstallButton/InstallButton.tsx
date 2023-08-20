import { Text } from '@clipcap/ui';
import styles from './InstallButton.module.scss';

import { Card } from '@blueprintjs/core';

import type { TInstallButton } from './types';

export const InstallButton = ({ href, logo, text }: TInstallButton) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <Card interactive className={styles.container}>
        <div className={`${styles.section} ${styles['section-logo']}`}>
          {logo}
        </div>
        <div className={`${styles.section} ${styles['section-text']}`}>
          <Text size={30}>{text}</Text>
        </div>
      </Card>
    </a>
  );
};
