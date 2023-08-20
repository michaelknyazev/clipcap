import styles from './Header.module.scss';

import { Button, ButtonGroup, Intent } from '@blueprintjs/core';
import { Logo } from '@clipcap/ui'

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles['section-logo']}`}>
        <Logo />
      </div>
      <div className={`${styles.section} ${styles['section-actions']}`}>
        <ButtonGroup large fill>
          <Button intent={Intent.PRIMARY} icon="download">Установить расширение Chrome</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export { Header }