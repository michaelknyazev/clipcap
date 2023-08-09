import styles from './GlobalLayoutNoFooter.module.scss';

import { Header } from '@clipcap/extension-frontend/components/containers/Header'

import type { TGlobalLayoutNoFooter, TGlobalLayoutNoFooterSection } from './types';

const GlobalLayoutNoFooter = ({ children }: TGlobalLayoutNoFooter) => {
  return (
    <div className={styles.container}>
      <GlobalLayoutNoFooter.Section header>
        <Header noactions/>
      </GlobalLayoutNoFooter.Section>
      <GlobalLayoutNoFooter.Section content>
        {children}
      </GlobalLayoutNoFooter.Section>
    </div>
  );
}

GlobalLayoutNoFooter.Section = ({
  children,
  header = false,
  content = false,
}: TGlobalLayoutNoFooterSection) => {
  const className = [
    styles.section
  ]

  if (content) {
    className.push(styles['section-content'])
  } else if (header) {
    className.push(styles['section-header'])
  }
  return (
    <div className={className.join(' ')}>
      {children}
    </div>
  )
}

export { GlobalLayoutNoFooter };  