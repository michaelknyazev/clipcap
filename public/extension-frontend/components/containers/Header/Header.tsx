import styles from './Header.module.scss';

import { Button, ControlGroup, Intent, Menu, MenuDivider, MenuItem, Popover, Position, Tooltip } from '@blueprintjs/core';
import { Logo } from '../Logo';
import { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '@clipcap/contexts';
import { useRouter } from 'next/router';
import { FactsService } from '@clipcap/services';
import { debug } from '@clipcap/helpers';

import type { THeaderFactsState } from './types';
import { TFacts } from '@clipcap/types';

export const Header = () => {
  const router = useRouter();
  const { GetAccessToken, LogOut } = useContext(AuthenticationContext);
  const [facts, setFacts] = useState<THeaderFactsState>({
    loading: true,
    data: {
      current_month: 0,
      available: 0
    }
  });
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

  const handleLoadFacts = async (): Promise<TFacts> => {
    try {
      const { success, result, event } = await FactsService.GetCurrent(GetAccessToken());
      if (!success) throw new Error(event);

      return result;

    } catch (err) {
      debug(err);

      return {
        current_month: 0,
        available: 0
      }
    }
  }

  useEffect(() => {
    handleLoadFacts().then(data => {
      setFacts({ loading: false, data });
    }).catch(() => {
      setFacts({ ...facts, loading: false });
    })
  }, []);

  const { available, current_month } = facts.data;
  const summariesLeft = available - current_month;
  const left = summariesLeft < 0 ? 0 : summariesLeft;

  return (
    <div className={styles.container}>
      <div className={`${styles['section']}`}>
        <Logo />
      </div>
      <div className={`${styles.section} ${styles['section-actions']}`}>
        <ControlGroup>
          <Tooltip
            content={`Осталось ${left} бесплатных моментов`}
          >
            <Button loading={facts.loading} small minimal rightIcon="predictive-analysis">
              {left}
            </Button>
          </Tooltip>
          <Popover
            onClose={handleCloseMenu}
            isOpen={isMenuOpen}
            position={Position.BOTTOM_LEFT}
            content={(
              <Menu>
                <MenuItem icon="dollar" text="Подписка" />
                <MenuDivider />
                <MenuItem onClick={handleLogOut} intent={Intent.DANGER} icon="log-out" text='Выйти' />
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