import styles from './Highlight.module.scss'

import type { THighlight } from './types'

export const Highlight = ({ children, red = false }: THighlight) => {
  const className = [
    styles.highlight
  ];

  if (red) className.push(styles['highlight--red']);

  return <span className={className.join(' ')}>{children}</span>
}