import styles from './Toggle.module.scss'
import type { TToggle } from './types';

export const Toggle = ({ checked, label, onChange }: TToggle) => {

  const handleChange = () => {
    if (onChange) {
      onChange(!checked)
    }
  }

  const className = [
    styles.toggle
  ]

  if (checked) className.push(styles['toggle--checked']);

  return (
    <div className={styles.container} onClick={handleChange}>
      <div className={styles.section}>
        <div className={className.join(' ')} />
      </div>
      {(() => {
        if (label) {
          return (
            <div className={styles.section}>
              <label className={styles.label}>{label}</label>
            </div>
          )
        }
      })()}
    </div>
  );
}