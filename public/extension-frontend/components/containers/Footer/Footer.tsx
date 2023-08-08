import { Button, Callout, Collapse, Icon, Intent, NonIdealState, Tag } from '@blueprintjs/core';
import styles from './Footer.module.scss';
import { useState } from 'react';

export const Footer = () => {
  const [open, setOpen] = useState<boolean>(true);

  const handleToggle = () => {
    setOpen(!open);
  }

  const className = [
    styles.container
  ]

  if (!open) className.push(styles['container-close']);

  return (
    <div className={className.join(' ')}>
      <div className={styles.section}>
        {!open ? (
          <div className={styles.offer} onClick={handleToggle}>
            Подписка <Tag intent={Intent.SUCCESS}>PRO</Tag> на моменты всего за 399р
          </div>
        ) : ""}
        <Collapse isOpen={open}>
          <NonIdealState
            className={styles.banner}
            layout='horizontal'
            icon={<Icon icon="predictive-analysis" iconSize={40} className={styles.brain} />}
            title="Безлимитная подписка"
            description={(
              <>
                <div style={{ margin: "0 0 10px 0" }}>
                  Откройте для себя Youtube заново!
                  <br/>Читайте Youtube видео как книгу
                  <br/>всего за 399р в месяц
                </div>
                <Button intent={Intent.SUCCESS} large icon="credit-card">Подписаться</Button>
              </>
            )}
          />
        </Collapse>
      </div>
      <div className={`${styles.section} ${styles['section-close']}`}>
        <Button icon={open ? "chevron-up" : "chevron-down"} onClick={handleToggle} />
      </div>
    </div>
  )
}
