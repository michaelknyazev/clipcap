import { useContext, useEffect, useState } from 'react';
import styles from './ExtensionContainer.module.scss';

import { TExtensionContainerState } from './types';
import { SummarizeService } from '@clipcap/services';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { TSummary } from '@clipcap/types';
import { Button, Title, Text, NonIdealState } from '@clipcap/ui';
import { Loader } from '../Loader';
import Icon from '@clipcap/icons';

export const ExtensionContainer = () => {
  const { GetAccessToken } = useContext(AuthenticationContext);
  const [videoId, setVideoId] = useState<string>("");
  const [summary, setSummary] = useState<TExtensionContainerState>({
    loading: false,
    data: [],
  });

  const handleSummarize = async (targetVideoId: string) => {
    console.log(`Summarizing ${targetVideoId}`);

    setSummary({ loading: true, data: [] });

    let summary: TSummary[] = [];

    try {
      const access_token = await GetAccessToken();
      if (access_token === '') throw new Error('Unauthorized');

      const { success, event, result } = await SummarizeService.Youtube(
        access_token,
        targetVideoId
      );
      if (!success) throw new Error(event);

      summary = result;
    } catch (err) {
      console.log(err);
    }

    setSummary({ loading: false, data: summary });
  };

  const handleClickSummaryButton = () => {
    const videoPage = new URL(window.location.href);
    const newVideoId = videoPage.searchParams.get('v');

    if (newVideoId && newVideoId !== null) {
      setVideoId(newVideoId);

      return handleSummarize(newVideoId);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles['section-title']}`}>
        <Title level={1} size={32}>
          Summary
        </Title>
      </div>
      {(() => {
        if (summary.loading) {
          return (
            <div className={`${styles.section} ${styles['section-summary']}`}>
              <Loader />
            </div>
          );
        }

        if (!summary.data.length) {
          return (
            <div className={`${styles.section} ${styles['section-summary']}`}>
              <NonIdealState
                icon={<Icon name="lightning" />}
                title="Click to Summarize"
                description="Click the button to get video summary"
                action={
                  <Button
                    loading={summary.loading}
                    large
                    fill
                    onClick={handleClickSummaryButton}
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
              {summary.data.map((item) => {
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
                        <Title level={2} size={16}>
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
