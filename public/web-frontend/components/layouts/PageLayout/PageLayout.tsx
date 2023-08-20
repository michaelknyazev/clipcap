import styles from './PageLayout.module.scss';

import type { TLayout, TSection } from '@clipcap/types';

const PageLayout = ({ children }: TLayout) => {
  return <div className={styles.container}>{children}</div>;
};

const PageLayoutSection = ({ children }: TSection) => {
  const className = [styles.section];

  return <div className={className.join(' ')}>{children}</div>;
};

PageLayout.Section = PageLayoutSection;

export { PageLayout };
