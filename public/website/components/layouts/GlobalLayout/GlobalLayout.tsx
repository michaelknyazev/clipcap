import styles from './GlobalLayout.module.scss';
import { useContext, useState } from 'react';

import { SettingsContext } from '@clipcap/contexts';

import Navigation from '@clipcap/website/components/containers/Navigation';
import { Header } from '@clipcap/website/components/containers/Header';
import type { TGlobalLayout, TGlobalLayoutSection } from './types';

const GlobalLayout = ({ children }: TGlobalLayout) => {
  const Settings = useContext(SettingsContext);
  const [isOpen, setIsOpen] = useState(Settings.Get("is_menu_open") || false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    Settings.Set("is_menu_open", !isOpen);
  }

  const handleCloseSettings = () => setIsSettingsOpen(false);
  const handleOpenSettings = () => setIsSettingsOpen(true);

  return (
    <div className={styles.container}>
      <GlobalLayout.Section aside isOpen={isOpen}>
        <Navigation isOpen={isOpen} onOpen={handleOpen} />
      </GlobalLayout.Section>
      <GlobalLayout.Section main>
        <GlobalLayout.Section header isOpen={isOpen}>
          <Header onSettingsIconClick={handleOpenSettings} />
        </GlobalLayout.Section>
        <GlobalLayout.Section content>
          {children}
        </GlobalLayout.Section>
      </GlobalLayout.Section>
    </div>
  );
}

GlobalLayout.Section = ({
  children,
  aside = false,
  header = false,
  main = false,
  content = false,
  isOpen = false
}: TGlobalLayoutSection) => {
  const className = [
    styles.section
  ]

  if (aside) {
    className.push(styles['section-aside']);

    if (isOpen) className.push(styles['section-aside-opened'])
    else className.push(styles['section-aside-closed'])
  } else if (main) {
    className.push(styles['section-main'])
  } else if (header) {
    className.push(styles['section-header'])

    if (isOpen) className.push(styles['section-header-opened'])
    else className.push(styles['section-header-closed'])
  } else if (content) {
    className.push(styles['section-content'])
  }

  return (
    <div className={className.join(' ')}>
      {children}
    </div>
  )
}

export { GlobalLayout };  