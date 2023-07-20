import styles from './Summary.module.scss';
import { Text, H5, Tag, Intent } from '@blueprintjs/core';
import { parseDate } from '@clipcap/helpers';

import type { TSummary } from '@clipcap/types';

export const Summary = ({ emoji, title, content, start }: TSummary) => {

  const handleStampClick = () => {
    console.log(start);

    window.parent.postMessage({
      action: "navigate",
      stamp: start
    }, "*");
  }

  let formattedEmoji = emoji;

  if (formattedEmoji.length > 2) {
    formattedEmoji = emoji.split('')[0]
  }

  const _startTs = parseDate(start * 1000);

  let readable = _startTs.utc_readable_time;

  if (start / 60 / 60 >= 1) readable = _startTs.utc_readable_time_hh;

  return (
    <div className={styles.container} onClick={handleStampClick}>
      <div className={`${styles.section} ${styles['section-emoji']}`}>
        <span className={styles.emoji}>{formattedEmoji}</span>
      </div>
      <div className={`${styles.section} ${styles['section-title']}`}>
        <H5>{title}</H5>
      </div>
      <div className={`${styles.section} ${styles['section-content']}`}>
        <Text>
          {content}
          <Tag style={{ marginLeft: "5px" }} minimal intent={Intent.SUCCESS}>{readable}</Tag>
        </Text>

      </div>
    </div>
  )
} 