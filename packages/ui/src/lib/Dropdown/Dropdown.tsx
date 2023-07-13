import styles from './Dropdown.module.scss';

import { Children, useState } from 'react';

import type { TDropdown, TDropdownItem } from './type';
import { Popover } from '../Popover';
/**
 * Dropdown component that displays a list of items with optional title.
 * 
 * @function Dropdown
 * @param {TDropdown} props - The properties of the Dropdown component.
 * @returns {JSX.Element} The Dropdown component.
 * @example
 * <Dropdown title="Sample Dropdown">
 *   <Dropdown.Item label="Item 1" onClick={() => console.log("Item 1 clicked")} />
 *   <Dropdown.Item label="Item 2" onClick={() => console.log("Item 2 clicked")} />
 * </Dropdown>
 */
const Dropdown = ({ children, title }: TDropdown): JSX.Element => {
  return (
    <div className={styles.container}>
      {(() => {
        if (title) {
          return (
            <div className={`${styles.section} ${styles['section-title']}`}>
              <span className={styles.title}>{title}</span>
            </div>
          );
        }
      })()}
      {Children.map(children, child => {
        return (
          <div className={styles.section}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
/**
 * Dropdown item component for use inside the Dropdown component.
 *
 * @component
 * @example
 * <Dropdown.Item
 *   label="Item 1"
 *   onClick={() => console.log("Item 1 clicked")}
 * />
 */
Dropdown.Item = ({ before, after, error = false, label, onClick, children }: TDropdownItem) => {
  const [isChildrenOpen, setIsChildrenOpen] = useState<boolean>(false);
  const handleClick = () => {
    console.log('te');
    if (children) return setIsChildrenOpen(!isChildrenOpen);
    if (onClick) onClick();
  }
  
  const className = [
    styles.item
  ]

  if (error) className.push(styles['item--error']);

  if (before && after) className.push(styles['item-before-after']);
  else if (before) className.push(styles['item-before'])
  else if (after) className.push(styles['item-after']);

  return (
    <Popover 
      show={isChildrenOpen}
      position={Popover.POSITION_TOP_RIGHT}
      content={children}
    >
      <div className={className.join(' ')} onClick={handleClick}>
        {(() => {
          if (before) {
            return (
              <div className={`${styles['item__section']} ${styles['item__section-before']}`}>
                {before}
              </div>
            );
          }
        })()}
        <div className={`${styles['item__section']} ${styles['item__section-label']}`}>
          <span className={styles.label}>{label}</span>
        </div>
        {(() => {
          if (after) {
            return (
              <div className={`${styles['item__section']} ${styles['item__section-after']}`}>
                {after}
              </div>
            );
          }
        })()}
      </div>
    </Popover>
  );
}

export { Dropdown }