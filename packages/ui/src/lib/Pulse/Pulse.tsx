import styles from './Pulse.module.scss';

export const Pulse = () => {
  return (
    <svg className={styles.pulse} viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <g transform="translate(40,40)">
        <circle className={styles.core} cx="0" cy="0" r="6"></circle>
        <circle className={styles.radar} cx="0" cy="0" r="6"></circle>
      </g>
    </svg>
  )
}