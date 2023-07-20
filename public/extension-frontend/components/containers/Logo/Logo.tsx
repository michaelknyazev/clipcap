import styles from './Logo.module.scss'

export const Logo = () => {
  return (
    <div className={styles.logo}>
      CLIP<span className={styles.highlight}>CAP</span>
    </div>
  )
}
