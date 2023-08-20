import styles from './YoutubeContainer.module.scss';

import { Button, ButtonGroup, Intent } from '@blueprintjs/core';

import { Summary } from '../Summary';
import { TSummary } from '@clipcap/types';

import type { TYoutubeContainer } from './types';

export const YoutubeContainer = ({ summary }: TYoutubeContainer) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles['section-setting']}`}>
        <ButtonGroup fill>
          <Button
            icon="predictive-analysis"
            minimal
            intent={Intent.NONE}
            disabled
          >
            Моменты
          </Button>
          <Button intent={Intent.SUCCESS} icon="manually-entered-data">
            Краткое содержание
          </Button>
        </ButtonGroup>
      </div>
      <div className={`${styles.section} ${styles['section-summary']}`}>
        <div className={`${styles.summary} ${styles['summary-moments']}`}>
          {summary.map((item: TSummary) => {
            return (
              <div key={item._id} className={`${styles['summary__section']}`}>
                <Summary {...item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
