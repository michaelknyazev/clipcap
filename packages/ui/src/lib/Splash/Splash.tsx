import styles from './Splash.module.scss';


import { useEffect, useState } from 'react';
import { Logo } from '@clipcap/ui';

import type { TSplash } from './type';

export const Splash = ({ content, icon, staticMode = false, hide = false }: TSplash) => {
  const [render, setRender] = useState(true);

  useEffect(() => {
    if (!hide) {
      setTimeout(() => {
        if (!staticMode) setRender(false);
      }, 1000)
    }
  }, [hide])

  if (render) {
    return (
      <div className={`${styles.container} ${hide ? styles[`container--hide`] : ""}`}>
        <div className={`${styles.section} ${styles['section-logo']}`}>
          <Logo />
        </div>
        {(() => {
          if (icon) {
            return (
              <div className={`${styles.section} ${styles['section-icon']}`}>
                {icon}
              </div>
            );
          }
        })()}
        {(() => {
          if (content) {
            return (
              <div className={`${styles.section} ${styles['section-loading']}`}>
                {content}
              </div>
            );
          }
        })()}

      </div>
    )
  }

  return <></>
}