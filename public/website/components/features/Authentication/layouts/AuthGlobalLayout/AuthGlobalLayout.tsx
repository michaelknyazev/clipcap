import styles from './AuthGlobalLayout.module.scss';

import { Children } from 'react';

import { AuthHeader } from '../../components/AuthHeader';

import type { TAuthGlobalLayout, TAuthGlobalLayoutSection } from './types';

const AuthGlobalLayout = ({ children, button }: TAuthGlobalLayout) => {
  return (
    <div className={styles.container}>
      {Children.map(children, child => {
        return child
      })}
    </div>
  );
}

AuthGlobalLayout.Section = ({ children, header = false }: TAuthGlobalLayoutSection) => {
  const className = [
    styles.section
  ]

  if (header) className.push(styles['section-header']);
  else className.push(styles['section-default']);

  return (
    <div className={className.join(' ')}>
      {children}
    </div>
  );
}

export { AuthGlobalLayout };