import styles from './YoutubeContainer.module.scss';

import { Button, ButtonGroup, Icon, Intent, NonIdealState, Spinner, Tab, Tabs } from '@blueprintjs/core';

import type { TYoutubeContainer } from './types';
import { Summary } from '@clipcap/extension-frontend/components/containers/Summary';
import { TSummary } from '@clipcap/types';

export const YoutubeContainer = ({
  summary,
  loading,
  onSummarizeButtonClick,
}: TYoutubeContainer) => {
  return (
    <div className={styles.container}>
      {(() => {
        if (loading) {
          return (
            <div className={`${styles.section} ${styles['section-empty']}`}>
              <NonIdealState
                icon={<Spinner />}
                title="Generating"
                description={'Generating a summary for your video. This process may take some time, but it typically completes in approximately 10 seconds.'}
              />
            </div>
          );
        }

        if (!summary.length) {
          return (
            <>
              <div className={`${styles.section} ${styles['section-empty']}`}>
                <NonIdealState
                  icon={<Icon size={48} icon="lightning" />}
                  title="Click to Summarize"
                  description="Please click the button below to generate your video summary."
                />
              </div>
              <div className={`${styles.section} ${styles['section-button']}`}>
                <Button
                  loading={loading}
                  fill
                  large
                  icon="lightning"
                  onClick={onSummarizeButtonClick}
                >
                  Summarize!
                </Button>
              </div>
            </>
          );
        }

        return (
          <>
            <div className={`${styles.section} ${styles['section-setting']}`}>
              <ButtonGroup fill>
                <Button icon="predictive-analysis" intent={Intent.SUCCESS}>Insights</Button>
                <Button disabled minimal icon="manually-entered-data">Summary</Button>
              </ButtonGroup>
            </div>
            <div className={`${styles.section} ${styles['section-summary']}`}>
              <div className={styles.summary}>
                {summary.map((item: TSummary) => {
                  return (
                    <div
                      key={item._id}
                      className={`${styles['summary__section']}`}
                    >
                      <Summary {...item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
};
