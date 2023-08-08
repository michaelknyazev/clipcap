import styles from './Summary.module.scss';
import { Text, H5, Tag, Intent, H6 } from '@blueprintjs/core';
import { parseDate } from '@clipcap/helpers';

import type { TSummary } from '@clipcap/types';

export const Summary = ({ emoji, title, content, start, moment = false }: TSummary) => {
  const handleStampClick = () => {
    console.log(start);

    window.parent.postMessage(
      {
        action: 'navigate',
        stamp: start,
      },
      '*'
    );
  };

  let formattedEmoji = emoji;

  if (formattedEmoji.length > 2) {
    formattedEmoji = emoji.split('')[0];
  }

  const _startTs = parseDate(start * 1000);

  let readable = _startTs.utc_readable_time;

  if (start / 60 / 60 >= 1) readable = _startTs.utc_readable_time_hh;

  const className = [
    styles.container
  ]

  if (moment) className.push(styles['container-moment'])

  return (
    <div className={className.join(' ')} onClick={handleStampClick}>
      <div className={`${styles.section} ${styles['section-graphic']}`}>
        <div className={styles.graphic}>
          <div className={`${styles['graphic__section']}`}>
            <span className={styles.emoji}>{emoji} </span>
          </div>
        </div>
      </div>
      <div className={`${styles['section']} ${styles['section-content']}`}>
        <div className={styles.content}>
          <div className={styles['content__section']}>
            <H6>
              <span className={styles.highlight}>{readable}</span>
              {title}
            </H6>
          </div>
          {!moment ? (
            <div className={styles['content__section']}>
              <Text>{content}</Text>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
