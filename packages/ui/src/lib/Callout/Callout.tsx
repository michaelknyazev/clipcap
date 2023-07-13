import styles from './Callout.module.scss';

import type { TCallout } from './type';
/**
 * @function Callout
 * @param {TCallout} props - The properties of the Callout component.
 * @returns {JSX.Element} The Callout component.
 *
 * This component renders a callout (a highlighted box with optional text) with various style options. 
 * It can be displayed in different colors (default, yellow, success), depending on the props. 
 */
export const Callout = ({ 
  success = false, 
  yellow = false, 
  children 
}: TCallout) => {
  const className = [
    styles.container
  ];

  if (success) className.push(styles['container--success']);
  else if (yellow) className.push(styles['container--yellow']);
  else className.push(styles['container--default']);

  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}