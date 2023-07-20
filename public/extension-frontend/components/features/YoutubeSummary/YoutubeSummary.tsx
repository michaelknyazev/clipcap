import styles from './YoutubeSummary.module.scss';

import { Button, NonIdealState, Text, Title } from '@clipcap/ui';
import Icon from '@clipcap/icons';

import type { TYoutubeSummary } from './types';

export const YoutubeSummary = ({
  summary,
  loading,
  onSummarizeButtonClick,
}: TYoutubeSummary) => {
  return (
    <div className={styles.container}>
      {(() => {
        if (loading) {
          return (
            <div className={`${styles.section} ${styles['section-summary']}`}>
              <NonIdealState
                icon={<Icon name="loading" />}
                title="Loading"
                description={'Loading summary for the video'}
              />
            </div>
          );
        }

        if (!summary.length) {
          return (
            <div className={`${styles.section} ${styles['section-summary']}`}>
              <NonIdealState
                icon={<Icon name="lightning" />}
                title="Click to Summarize"
                description="Click the button to get video summary"
                action={
                  <Button
                    loading={loading}
                    large
                    fill
                    onClick={onSummarizeButtonClick}
                  >
                    Summarize!
                  </Button>
                }
              />
            </div>
          );
        }

        return (
          <div className={`${styles.section} ${styles['section-summary']}`}>
            <div className={styles.summary}>
              {summary.map((item) => {
                return (
                  <div key={item._id} className={styles['summary__section']}>
                    <div className={styles.item}>
                      <div
                        className={`${styles['item__section']} ${styles['item__section-emoji']}`}
                      >
                        <span className={styles.emoji}>{item.emoji}</span>
                      </div>
                      <div
                        className={`${styles['item__section']} ${styles['item__section-title']}`}
                      >
                        <Title semibold level={2} size={18}>
                          {item.title}
                        </Title>
                      </div>
                      <div
                        className={`${styles['item__section']} ${styles['item__section-content']}`}
                      >
                        <Text size={14}>{item.content}</Text>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
};
