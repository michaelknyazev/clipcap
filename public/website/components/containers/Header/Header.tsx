import styles from './Header.module.scss';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';

import { IdentityContext, AuthenticationContext } from '@clipcap/contexts';
import Icon from '@clipcap/icons'
import { Avatar, Portal, Modal, Textarea, Popover, Dropdown, Button, Input, Logo, Text } from '@clipcap/ui';
import { delay } from '@clipcap/helpers';

import type { TIdentityContext, TAuthenticationContext } from '@clipcap/contexts';
import type { TUser } from '@clipcap/types';
import type { THeader } from './types';

export const Header = ({ onSettingsIconClick }: THeader) => {
  /**
   * Context for user identity.
   * @type {TIdentityContext}
   */
  const Identity: TIdentityContext = useContext(IdentityContext);
  /**
   * Context for user authentication. Provides the LogOut function.
   * @type {TAuthenticationContext}
   */
  const { LogOut }: TAuthenticationContext = useContext(AuthenticationContext);
  /**
   * The Next.js Router object.
   * @type {NextRouter}
   */
  const router: NextRouter = useRouter();
  /**
   * State for the search query.
   * @type {string}
   */
  const [query, setQuery] = useState("");
  /**
   * State for managing the visibility of the connect modal.
   * @type {boolean}
   */
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  /**
   * State for managing the open/close status of the menu.
   * @type {boolean}
   */
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  /**
   * State for managing the loading status of the connect button.
   * @type {boolean}
   */
  const [isConnectButtonLoading, setIsConnectButtonLoading] = useState<boolean>(false)
  /**
   * State for storing the Zoom link.
   * @type {string}
   */
  const [zoomLink, setZoomLink] = useState<string>("");
  /**
   * The user object retrieved from the identity context.
   * @type {TUser}
   */
  const user: TUser = Identity.User();
  /**
   * Function to open the connect modal.
   * @returns {void}
   */
  const handleOpenConnectModal = (): void => setIsConnectModalOpen(true);
  /**
   * Function to close the connect modal.
   * @returns {void}
   */
  const handleCloseConnectModal = (): void => setIsConnectModalOpen(false);
  /**
   * Function to handle changes in the search input.
   *
   * @param {string} str - The new search query.
   * @returns {void}
   */
  const handleSearchInputChange = (str: string): void => {
    return setQuery(str);
  }
  /**
   * Function to toggle the menu open/closed status.
   * 
   * @returns {void}
   */
  const handleToggleMenu = (): void => setIsMenuOpened(!isMenuOpened);
  /**
   * Function to close the menu.
   * 
   * @returns {void}
   */
  const handleCloseMenu = (): void => setIsMenuOpened(false);
  /**
   * Function to handle user logout. 
   * Logs out the user and then redirects to a specific URI if provided.
   */
  const handleLogout = () => {
    return LogOut().then((redirect_uri => {
      if (redirect_uri) router.push(redirect_uri);
    }))
  }
  /**
   * Function to handle changes in the Zoom link.
   *
   * @param {string} str - The new Zoom link.
   * @returns {void}
   */
  const handleChange = (str: string): void => {
    setZoomLink(str);
  }
  /**
   * Mock Function to handle the connect action. 
   * Sets the connect button to loading, waits for a delay, 
   * then resets the Zoom link and closes the connect modal.
   */
  const handleConnect = () => {
    setIsConnectButtonLoading(true);

    return delay(1000).then(() => {
      setIsConnectButtonLoading(false);
      setZoomLink("");
      return handleCloseConnectModal();
    });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.section} ${styles['section-logo']}`}>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className={`${styles.section} ${styles['section-button']}`}>
          {/*
            <Button fill small outlined onClick={handleOpenConnectModal}>Connect to Live Interview</Button>
          */}
        </div>
        <div className={`${styles.section} ${styles['section-search']}`}>
          {/*
          <Input value={query} onChange={handleSearchInputChange} small invisible before={<Icon name="outlined-search" />} placeholder="Start search here (Cmd+/)" />
          */}
        </div>
        <div className={`${styles.section} ${styles['section-actions']}`}>
          <div className={styles.actions}>
            <div className={styles['actions__section']}>
              <div className={styles.action}>
                {/*
                <Icon name="outlined-bell" />
                */}
              </div> 
            </div>
            <div className={styles['actions__section']}>
              <div className={styles.action} onClick={onSettingsIconClick}>
                <Icon name="outlined-settings-alt" />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.section} ${styles['section-profile']}`}>
          <Popover
            show={isMenuOpened}
            onClose={handleCloseMenu}
            content={(
              <Dropdown title="Profile">
                <Dropdown.Item before={<Icon name="outlined-settings-alt" />} onClick={onSettingsIconClick} label="Settings" />
                <Dropdown.Item onClick={handleLogout} before={<Icon name="outlined-sign-out" />} error label="Log Out" />
              </Dropdown>
            )}
          >
            <div className={styles.profile} onClick={handleToggleMenu}>
              <div className={`${styles['profile__section']} ${styles['profile__section-data']}`}>
                <div className={styles['profile__data']}>
                  <div className={styles['profile__data__section']}>
                    <Text semibold size={16}>{user?.name}</Text>
                  </div>
                  <div className={styles['profile__data__section']}>
                    <Text size={12}>{user?.email}</Text>
                  </div>
                </div>
              </div>
              <div className={styles['profile__section']}>
                <Avatar large image={user?.photo} name={user?.name} onlyPhoto />
              </div>
            </div>
          </Popover>
        </div>
      </div>
      <Portal isOpen={isConnectModalOpen} onClose={handleCloseConnectModal}>
        <Modal onCrossClick={handleCloseConnectModal} title="Connect to Live Interview">
          <Textarea placeholder="Paste Zoom link or invite here" value={zoomLink} onChange={handleChange} />
          <Button loading={isConnectButtonLoading} onClick={handleConnect} fill>Connect</Button>
        </Modal>
      </Portal>
    </>
  )
}