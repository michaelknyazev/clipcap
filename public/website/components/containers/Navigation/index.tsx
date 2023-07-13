import styles from './Navigation.module.scss';

import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { SettingsContext } from '@clipcap/contexts';

import { Menu, Tag } from '@clipcap/ui'
import Icon from '@clipcap/icons'

import type { TCollection } from '@clipcap/icons';
import type { TNavigation, TNavigationItem } from './types';

const Navigation = ({ onOpen, isOpen }: TNavigation) => {
  const router = useRouter();
  const Settings = useContext(SettingsContext);

  let _menu: TNavigationItem[] = [];

  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles['section-burger']}`}>
        <span className={styles.burger} onClick={onOpen}>
          {isOpen ? <Icon name="outlined-cross" /> : <Icon name="outlined-burger" />}
        </span>
      </div>
      <div className={`${styles.section} ${styles['section-menu']}`}>
        <Menu minimize={!isOpen}>
          <Link href='/'>
            <Menu.Item active={router.asPath === '/'} before={<Icon name="outlined-folders" />} label="All Projects" after={<Tag>1</Tag>} />
          </Link>
          <Menu.Divider />
          {_menu.map(item => {
            const isActive = router.asPath === item.href;
            const _icon = item.icon as keyof TCollection
            return (
              <Link key={item.href} href={item.href}>
                <Menu.Item active={isActive} before={<Icon name={_icon} />} label={item.label} />
              </Link>
            )
          })}
          <Menu.Item before={<Icon name="outlined-folder-add" />} label="Create new Project" />
        </Menu>
      </div>
    </div>
  );
}

export default Navigation;