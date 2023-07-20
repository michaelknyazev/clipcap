import styles from './Header.module.scss';

import { Button, ControlGroup } from '@blueprintjs/core';
import Icon from '@clipcap/icons';
import { Logo } from '../Logo';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles['section']}`}>
        <Logo />
      </div>
      <div className={`${styles.section} ${styles['section-actions']}`}>
        <ControlGroup>
          <Button small minimal icon="settings" />
          <Button small minimal icon="link" />
          <Button small minimal icon="menu" />
        </ControlGroup>
      </div>
    </div>
  )
}