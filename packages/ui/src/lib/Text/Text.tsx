import styles from './Text.module.scss';
import type { TText } from './type';

export const Text = ({ size = 20, medium = false, semibold = false, bold = false, children }: TText) => {
  const className = [
    styles.text,
    styles[`text-${size}`]
  ];

  if (bold) className.push(styles['text--bold']);
  else if (semibold) className.push(styles['text--semibold']);
  else if (medium) className.push(styles['text--medium']);
  else className.push(styles['text--regular']);

  return (
    <p className={className.join(' ')}>
      {children}
    </p>
  );
}
