import styles from './VideoCard.module.scss';

import Icon from '@clipcap/icons';

import type { TVideoCard } from './types';

export const VideoCard = ({ title, description }: TVideoCard) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles['section-meta']}`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={`${styles.section} ${styles['section-image']}`}>
        <div className={styles.image}>
          <div className={styles['image__icon']}>
            <Icon name="solid-user" />
          </div>
        </div>
      </div>
    </div>
  )
}