import styles from './Point.module.scss';
import { useState } from 'react';
import { Button, Icon, Intent } from '@blueprintjs/core';
import { Logo, Text, Title } from '@clipcap/ui';

import { YoutubeContainer } from '../../../Extension/components/YoutubeContainer';
import { Ellipse } from '../../../../ui/Ellipse/Ellipse';

import type { TPoint } from './types';

export const Point = ({
  title,
  description,
  videoUrl,
  thumbnailUrl,
  summary,
  odd,
}: TPoint) => {
  const [play, setPlay] = useState(false);
  const className = [styles.container];

  const handlePlay = () => setPlay(true);

  if (odd) className.push(styles['container--odd']);
  else className.push(styles['container--even']);

  return (
    <div className={styles.wrapper}>
      <div className={className.join(' ')}>
        <div className={`${styles.section} ${styles['section-ellipse']}`}>
          <Ellipse green />
        </div>
        <div className={`${styles.section} ${styles['section-title']}`}>
          <Title semibold level={2} size={30}>
            {title}
          </Title>
        </div>
        <div className={`${styles.section} ${styles['section-description']}`}>
          <Text light size={20}>
            {description}
          </Text>
        </div>
        <div className={`${styles.section} ${styles['section-video']}`}>
          {(() => {
            if (!play) {
              return (
                <div className={styles.thumbnail} onClick={handlePlay}>
                  <img
                    className={styles['thumbnail__src']}
                    src={thumbnailUrl}
                    alt={`Summary of ${videoUrl} - ClipCap`}
                  />
                  <div className={styles['thumbnail__overlay']}>
                    <div className={styles['thumbnail__icon']}>
                      <Icon size={40} icon="play" />
                    </div>
                  </div>
                </div>
              );
            }
            const embedVideoUrl = videoUrl.replace('watch?v=', 'embed/');

            return (
              <iframe
                className={styles.frame}
                src={`${embedVideoUrl}?autoplay=1&rel=0&showinfo=0&autohide=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            );
          })()}
        </div>
        <div className={`${styles.section} ${styles['section-summary']}`}>
          <div className={styles.summary}>
            <div
              className={`${styles['summary__section']} ${styles['summary__section-header']}`}
            >
              <div className={styles['summary__header']}>
                <div
                  className={`${styles['summary__header__section']} ${styles['summary__header__section-logo']}`}
                >
                  <Logo green/>
                </div>
              </div>
            </div>
            <div
              className={`${styles['summary__section']} ${styles['summary__section-content']}`}
            >
              <YoutubeContainer summary={summary} />
            </div>
            <div className={styles['summary__section']}>
              <Button
                fill
                icon="duplicate"
                text="Копировать"
                intent={Intent.SUCCESS}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
