import { useContext, useEffect, useState } from 'react';
import styles from './ExtensionContainer.module.scss';

import { TExtensionContainerState } from './types';
import { SummarizeService } from '@clipcap/services';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { TSummary } from '@clipcap/types';
import { Title } from '@clipcap/ui';

export const ExtensionContainer = () => {
  const { GetAccessToken } = useContext(AuthenticationContext);
  const videoPage = new URL(window.location.href);

  const [summary, setSummary] = useState<TExtensionContainerState>({
    loading: true,
    data: []
  })
  const [videoId, setVideoId] = useState<string | null>(videoPage.searchParams.get("v"));

  const handleSummarize = async (targetVideoId: string) => {
    let summary: TSummary[] = [];

    try {
      const access_token = await GetAccessToken();
      if (access_token === "") throw new Error("Unauthorized");

      const { success, event, result } = await SummarizeService.Youtube(access_token, targetVideoId);
      if (!success) throw new Error(event);

      summary = result;
    } catch(err) {
      console.log(err);
    }

    setSummary({ loading: false, data: summary });
  }

  useEffect(() => {
    if (videoId) handleSummarize(videoId)
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles['section-title']}`}>
        <Title level={1} size={32}>Summary</Title>
      </div>
      {(() => {
        if (summary.loading) {
          return (
            <div className={styles.section}>
              Loading...
            </div>
          )
        }

        if (!summary.data.length) {
          return (
            <div className={styles.error}>
              Error while loading summary for {videoId}
            </div>
          );
        }

        return summary.data.map(item => {
          return (
            <div key={item._id} className={styles.section}>
              <span>{item.emoji}</span>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
            </div>
          )
        })
      })()}
    </div>
  );
}