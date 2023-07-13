import styles from './Menu.module.scss';

import { Children, useState } from 'react';
import Icon from '@clipcap/icons';

import type { TMenu, TMenuItem } from './type';

/**
 * A customizable Menu component with optional minimize style.
 *
 * @component
 * @param {Object} props - The props for the Menu component.
 * @param {React.ReactNode} [props.children] - The child elements of the menu.
 * @param {boolean} [props.minimize=false] - Set to true for a minimize style menu.
 * @returns {React.ReactElement} The rendered Menu component.
 */
const Menu = ({ children, minimize = false }: TMenu) => {
  const className = [
    styles.container,
    styles[`container-${minimize ? "minimize" : "default"}`]
  ];

  return (
    <nav className={className.join(' ')}>
      {Children.map(children, child => {
        return (
          <div className={styles.section}>
            {child}
          </div>
        );
      })}
    </nav>
  );
}
/**
 * Divider component to separate items in the Menu.
 *
 * @component
 * @returns {JSX.Element} Rendered Divider component.
 */
Menu.Divider = () => {
  return (
    <div className={styles.divider} />
  );
}
/**
 * A customizable Menu Item component with optional before, after, and children elements.
 *
 * @component
 * @param {TMenuItem} props - The props for the Menu.Item component.
 * @returns {React.ReactElement} The rendered Menu.Item component.
 */
Menu.Item = ({ before, label, active, children, after }: TMenuItem) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    if (children) {
      setIsOpen(!isOpen)
    }
  }

  const className = [
    styles.item
  ];

  if (after && children) className.push(styles['item--after-children']);
  else if (after) className.push(styles['item--after']);
  else if (children) className.push(styles['item--children'])

  if (active) className.push(styles['item-active']);

  return (
    <div className={className.join(' ')} onClick={handleClick}>
      {(() => {
        if (children) {
          return (
            <div className={`${styles['item__section']} ${styles['item__section-chevron']}`}>
              <span className={`${styles.chevron} ${isOpen ? styles['chevron-rotated'] : ""}`}>
                <Icon name="outlined-arrow-right" />
              </span>
            </div>
          );
        }
      })()}
      <div className={`${styles['item__section']} ${styles['item__section-before']}`}>
        {(() => {
          if (before) {
            return (
              <span className={styles.before}>
                {before}
              </span>
            )
          }
        })()}
      </div>
      <div className={`${styles['item__section']} ${styles['item__section-label']}`}>
        {(() => {
          if (label) return label;
        })()}
      </div>
      {(() => {
        if (after) {
          return (
            <div className={`${styles['item__section']} ${styles['item__section-after']}`}>
              {after}
            </div>
          )
        }
      })()}
      {(() => {
        if (children) {
          return (
            <div className={`${styles['item__section']} ${styles['item__section-children']} ${styles[`item__section-${isOpen ? 'children-show' : 'children-hide'}`]}`}>
              <Menu>
                {children}
              </Menu>
            </div>
          );
        }
      })()}
    </div>
  );
}

export { Menu }
