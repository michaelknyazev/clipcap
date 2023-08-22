import styles from './Header.module.scss';

import { Button, ButtonGroup, Intent } from '@blueprintjs/core';
import { UserAgentContext } from '@clipcap/contexts';
import { Logo } from '@clipcap/ui'
import { useContext } from 'react';

const Header = () => {
  const { GetBrowser } = useContext(UserAgentContext);
  const browser = GetBrowser();
  
  let downloadButtonTitle;

  switch (browser) {
    case 'Firefox':
      downloadButtonTitle = 'Добавить в Firefox';
      break;
    case 'Safari':
      downloadButtonTitle = 'Добавить в Safari';
      break;
    default:
      downloadButtonTitle = 'Добавить в Chrome';
      break;
  }
  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles['section-logo']}`}>
        <Logo text />
      </div>
      <div className={`${styles.section} ${styles['section-actions']}`}>
        <ButtonGroup large fill>
          <Button intent={Intent.PRIMARY} icon="download">
            {downloadButtonTitle}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export { Header }