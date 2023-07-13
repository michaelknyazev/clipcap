import styles from './Center.module.scss';
import { TCenter } from './types';
/**
 * @function Center
 * @param {TCenter} props - The properties of the Center component.
 * @returns {JSX.Element} The Center component.
 *
 * This component centers its children. It can be used as a wrapper to center any content.
 */
export const Center = ({ children }: TCenter): JSX.Element => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}