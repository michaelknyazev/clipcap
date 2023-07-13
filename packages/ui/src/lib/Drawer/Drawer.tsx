import styles from './Drawer.module.scss';
import { Children, useEffect } from 'react';

import Icon from '@clipcap/icons';

import type { TDrawer, TDrawerHeader, TDrawerBody, TDrawerAction, TDrawerPreHeader } from './types'

/**
 * @function Drawer
 * @param {TDrawer} props - The properties of the Drawer component.
 * @returns {JSX.Element} The Drawer component.
 *
 * This component acts as a container for other components and provides a side sliding container.
 */
const Drawer = ({ onCrossButtonClick, children }: TDrawer): JSX.Element => {
  const className = [
    styles.container,
    styles['container-default']
  ];
  const actions = [];

  if (onCrossButtonClick) {
    actions.push(<Drawer.Action onAction={onCrossButtonClick} icon="outlined-cross" label="Esc" />)
  }
  
  return (
    <div className={className.join(' ')}>
      {(() => {
        if (onCrossButtonClick) {
          return <Drawer.PreHeader actions={actions} />;
        }
      })()}
      {children}
    </div>
  );
}

Drawer.Action = ({ onAction, label, icon }: TDrawerAction) => {
  return (
    <div className={styles.action} onClick={onAction}>
      <div className={styles['action__section']}>
        <div className={styles.icon}>
          <div className={styles['icon__src']}>
            <Icon name={icon} />
          </div>
        </div>
      </div>
      <div className={styles['action__section']}>
        {label}
      </div>
    </div>
  );
}

Drawer.PreHeader = ({ children, actions }: TDrawerPreHeader) => {
  // TODO: Key Press Handlers in Use Effect for Actions
  return (
    <div className={`${styles.section} ${styles['section-preheader']}`}>
      <div className={styles.preheader}>
        <div className={styles['preheader__section']}>
          <div className={styles.actions}>
            {actions ? Children.map(actions, child => {
              return (
                <div className={styles['actions__section']}>
                  {child}
                </div>
              );
            }): ""}
          </div>
        </div>
        <div className={styles['preheader__section']}>
          {children}
        </div>
      </div>
    </div>
  );
}

Drawer.Header = ({ children }: TDrawerHeader) => {
  return (
    <div className={`${styles.section} ${styles['section-header']}`}>
      {children}
    </div>
  )
}

Drawer.Body = ({ children }: TDrawerBody) => {
  return (
    <div className={`${styles.section} ${styles['section-body']}`}>
      {children}
    </div>
  )
}

export { Drawer }