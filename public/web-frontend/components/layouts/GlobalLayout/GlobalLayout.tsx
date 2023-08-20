import styles from './GlobalLayout.module.scss';

import { Header } from '../../containers/Header';
import { Footer } from '../../containers/Footer';

import type { TGlobalLayout, TGlobalLayoutSection } from './types';

const GlobalLayout = ({ children }: TGlobalLayout) => {
  return (
    <div className={styles.container}>
      <GlobalLayout.Section header>
        <Header />
      </GlobalLayout.Section>
      <GlobalLayout.Section content>{children}</GlobalLayout.Section>
      <GlobalLayout.Section footer>
        <Footer />
      </GlobalLayout.Section>
    </div>
  );
};

const GlobalLayoutSection = ({
  children,
  header = false,
  footer = false,
  content = false,
}: TGlobalLayoutSection) => {
  const className = [styles.section];

  if (content) {
    className.push(styles['section-content']);
  } else if (header) {
    className.push(styles['section-header']);
  } else if (footer) {
    className.push(styles['section-footer']);
  }

  return <div className={className.join(' ')}>{children}</div>;
};

GlobalLayout.Section = GlobalLayoutSection;

export { GlobalLayout };
