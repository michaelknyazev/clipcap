import styles from './Header.module.scss';

import { Button, ControlGroup, Intent, Menu, MenuDivider, MenuItem, Popover, Position, Tooltip } from '@blueprintjs/core';
import { Logo } from '../Logo';
import { useContext, useState } from 'react';
import { AuthenticationContext } from '@clipcap/contexts';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();
  const { LogOut } = useContext(AuthenticationContext);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleLogOut = () => {
    return LogOut().then(() => {
      router.push('/auth')
    })
  }

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  }

  const left = 1;

  return (
    <div className={styles.container}>
      <div className={`${styles['section']}`}>
        <Logo />
      </div>
      <div className={`${styles.section} ${styles['section-actions']}`}>
        <ControlGroup>
          <Tooltip
            content={`${left} free summaries left`}
          >
            <Button small minimal rightIcon="predictive-analysis">
              {left}
            </Button>
          </Tooltip>
          <Popover
            onClose={handleCloseMenu}
            isOpen={isMenuOpen}
            position={Position.BOTTOM_LEFT}
            content={(
              <Menu>
                <MenuItem icon="dollar" text="My plan" />
                <MenuDivider />
                <MenuItem onClick={handleLogOut} intent={Intent.DANGER} icon="log-out" text='Log Out' />
              </Menu>
            )}
          >
            <Button onClick={handleToggleMenu} small minimal icon="menu" />
          </Popover>
        </ControlGroup>
      </div>
    </div>
  )
}