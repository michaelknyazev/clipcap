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
          Upgrade to <Tag intent={Intent.SUCCESS}>PRO</Tag> for as low as $3.99
          </div>
        ) : ""}
        <Collapse isOpen={open}>
          <NonIdealState
            className={styles.banner}
            layout='horizontal'
            icon={<Icon icon="predictive-analysis" iconSize={40} className={styles.brain} />}
            title="Unlimited insights"
            description={(
              <>
                <div style={{ margin: "0 0 10px 0" }}>
                  Unlock unlimited insights and summaries 
                  <br/>for your favourite Youtube videos 
                  <br/>for as low as $3.99 per month
                </div>
                <Button intent={Intent.SUCCESS} large icon="credit-card">Pay $3.99</Button>
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
