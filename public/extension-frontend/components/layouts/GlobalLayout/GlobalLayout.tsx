import styles from './GlobalLayout.module.scss';

import { Header } from '@clipcap/extension-frontend/components/containers/Header'

import type { TGlobalLayout, TGlobalLayoutSection } from './types';

const GlobalLayout = ({ children }: TGlobalLayout) => {
  return (
    <div className={styles.container}>
      <GlobalLayout.Section header>
        <Header />
      </GlobalLayout.Section>
      <GlobalLayout.Section content>
        {children}
      </GlobalLayout.Section>
    </div>
  );
}

GlobalLayout.Section = ({
  children,
  aside = false,
  header = false,
  main = false,
  content = false,
  isOpen = false
}: TGlobalLayoutSection) => {
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

export { GlobalLayout };  