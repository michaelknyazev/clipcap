import styles from './Highlight.module.scss'

import type { THighlight } from './types'

export const Highlight = ({ children }: THighlight) => {
  return <span className={styles.highlight}>{children}</span>
}