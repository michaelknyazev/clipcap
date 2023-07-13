import styles from './Checkbox.module.scss';

import type { TCheckbox } from './type';
import Icon from '@clipcap/icons';
/**
 * @function Checkbox
 * @param {TCheckbox} props - The properties of the Checkbox component.
 * @returns {JSX.Element} The Checkbox component.
 *
 * This component renders a checkbox with a label. It has properties to control whether it's checked or disabled.
 * An optional onChange function can be provided to handle changes to the checkbox's checked state.
 */
const Checkbox = ({ 
  children,
  checked = false, 
  disabled = false,
  onChange = () => {}
}: TCheckbox): JSX.Element => {
  const className = [
    styles.container
  ];

  if (checked) className.push(styles[`container-checked`]);
  if (disabled) className.push(styles['container--disabled']);

  const handleChange = () => {
    return onChange(!checked);
  }
  
  return (
    <div className={className.join(' ')} onClick={handleChange}>
      <div className={styles.checkbox}>
        <Icon name="outlined-checkmark" />
      </div>
      <div className={styles.label}>
        {children}
      </div>
    </div>
  );
}

export { Checkbox };