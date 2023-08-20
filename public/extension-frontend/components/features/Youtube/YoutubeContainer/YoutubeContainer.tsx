import styles from './YoutubeContainer.module.scss';

import {
  Button,
  ButtonGroup,
  Icon,
  Intent,
  NonIdealState,
  Spinner,
  Tab,
  Tabs,
} from '@blueprintjs/core';

import { Summary } from '@clipcap/extension-frontend/components/containers/Summary';
import { TSummary } from '@clipcap/types';
import { useState } from 'react';

import type { TYoutubeContainer } from './types';

export const YoutubeContainer = ({
  summary,
  loading,
  onSummarizeButtonClick,
}: TYoutubeContainer) => {
  const [activeTab, setActiveTab] = useState<string>('moments');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSummaryTabClick = () => {
    handleTabChange('summary');
  };

  const handleMomentsTabClick = () => {
    handleTabChange('moments');
  };

  return (
    <div className={styles.container}>
      {(() => {
        if (loading) {
          return (
            <div className={`${styles.section} ${styles['section-empty']}`}>
              <NonIdealState
                icon={<Spinner />}
                title="Резюмируем"
                description={
                  'Смотрим видео чтобы рассказать Вам о чем оно и выделить его ключевыe моменты.'
                }
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
                  title="Кликни чтобы резюмировать"
                  description="Нажми на кнопку снизу чтобы получить краткое резюме видео и ключевые моменты в нем."
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
                  Резюмировать!
                </Button>
              </div>
            </>
          );
        }

        return (
          <>
            <div className={`${styles.section} ${styles['section-setting']}`}>
              <ButtonGroup fill>
                <Button
                  icon="predictive-analysis"
                  minimal={activeTab !== 'moments'}
                  intent={
                    activeTab !== 'moments' ? Intent.NONE : Intent.SUCCESS
                  }
                  onClick={handleMomentsTabClick}
                >
                  Моменты
                </Button>
                <Button
                  minimal={activeTab !== 'summary'}
                  intent={
                    activeTab !== 'summary' ? Intent.NONE : Intent.SUCCESS
                  }
                  icon="manually-entered-data"
                  onClick={handleSummaryTabClick}
                >
                  Краткое содержание
                </Button>
              </ButtonGroup>
            </div>
            <div className={`${styles.section} ${styles['section-summary']}`}>
              {(() => {
                if (activeTab === 'moments') {
                  return (
                    <div className={styles.summary}>
                      {summary.map((item: TSummary) => {
                        return (
                          <div
                            key={item._id}
                            className={`${styles['summary__section']}`}
                          >
                            <Summary moment {...item} />
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                if (activeTab === 'summary') {
                  return (
                    <div
                      className={`${styles.summary} ${styles['summary-moments']}`}
                    >
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
                  );
                }
              })()}
            </div>
          </>
        );
      })()}
    </div>
  );
};
