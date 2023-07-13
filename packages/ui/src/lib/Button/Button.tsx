import styles from './Button.module.scss';
import type { TButton } from './type';

import Icon from '@clipcap/icons';


/**
 * @function Button
 * @param {TButton} props - The properties of the Button component.
 * @returns {JSX.Element} The Button component.
 *
 * This component renders a button with various style options. It can be rendered in different sizes (large, small, extra small),
 * with different states (loading, disabled), and with different styles (filled, minimal, outlined, secondary, service). 
 * It can also display an element before or after the button text, and execute a function when the button is clicked.
 */
export const Button = ({ 
  children, 
  loading = false,
  fill = false, 
  minimal = false,
  outlined = false,
  disabled = false,
  xsmall = false, 
  small = false, 
  large = false, 
  secondary = false,
  service = false,
  tag = false,
  before,
  after,
  onClick 
}: TButton): JSX.Element => {
  const handleClick = (e: React.SyntheticEvent) => {
    if (onClick) {
      return onClick(e);
    }
  }

  const className = [
    styles.button
  ];

  if (large) className.push(styles['button-large']);
  else if (small) className.push(styles['button-small']);
  else if (xsmall) className.push(styles['button-xsmall']);
  else if (tag) className.push(styles['button-tag']);
  else className.push(styles['button-medium']);

  if (fill) className.push(styles['button-fill']);

  if (service) className.push(styles['button--service'])
  else if (secondary) className.push(styles['button--secondary']);
  else className.push(styles['button--primary']);

  if (disabled) className.push(styles['button-disabled'])
  else if (outlined) className.push(styles['button-outlined']);
  else if (minimal) className.push(styles['button-minimal']);
  else className.push(styles['button-regular']);

  if (loading) className.push(styles['button-loading']);

  if (!children) className.push(styles['button-nochildren']);

  return (
    <button className={className.join(' ')} onClick={handleClick}>
      {(() => {
        if (before) {
          return <span className={styles.before}>{before}</span>
        }
      })()}
      {(() => {
        if (children) {
          return <span className={styles.text}>{children}</span>
        }
      })()}
      {(() => {
        if (after) {
          return <span className={styles.after}>{after}</span>
        }
      })()}
      {(() => {
        if (loading) return (
          <span className={styles.loading}>
            <span className={styles['loading__icon']}>
              <Icon name="loading" />
            </span>
          </span>
        );
      })()}
    </button>
  );
}