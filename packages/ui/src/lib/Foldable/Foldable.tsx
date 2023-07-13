import styles from './Foldable.module.scss';
import { Children, useState } from 'react';

import Icon from '@clipcap/icons';

import type { TFoldable, TFoldableGroup } from './types';

/**
 * A foldable component that can be used to hide and reveal content, similar to an Accordion component in other UI kits.
 *
 * @component
 * @param {Object} props - The props for the Foldable component.
 * @param {string} props.title - The title of the foldable section.
 * @param {React.ReactNode} props.closedDescription - The description displayed when the foldable section is closed.
 * @param {boolean} [props.toggle=true] - Enable or disable the toggle functionality.
 * @param {boolean} [props.isOpen=false] - The initial open state of the foldable section.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the foldable section.
 * @param {() => void} [props.onOpen] - The callback function to be executed when the foldable section is opened.
 * @param {() => void} [props.onClose] - The callback function to be executed when the foldable section is closed.
 * @returns {React.ReactElement} The rendered Foldable component.
 */
const Foldable = ({ 
  title,
  closedDescription,
  toggle = true,
  children,
  isOpen = false,
  onOpen,
  onClose
}: TFoldable): React.ReactElement => {
  const className = [
    styles.container
  ];

  if (isOpen) className.push(styles['container--opened'])
  else className.push(styles['container--closed'])

  const handleToggle = () => {
    if (isOpen) {
      if (onClose) onClose();
      
      return
    }

    if (onOpen) onOpen();
  }

  return (
    <div className={className.join(' ')}>
      <div className={`${styles.section} ${styles['section-title']}`} onClick={handleToggle}>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={`${styles.section} ${styles['section-description']}`} onClick={handleToggle}>
        <span className={styles.description}>{closedDescription}</span>
      </div>
      {toggle ? (
        <div className={`${styles.section} ${styles['section-toggle']}`} onClick={handleToggle}>
          <div className={styles.toggle}>
            <Icon name={isOpen ? "outlined-arrow-up" : "outlined-arrow-down"} />
          </div>
        </div>
      ) : ""}
      <div className={`${styles.section} ${styles['section-content']}`}>
        {children}
      </div>
    </div>
  )
}

/**
 * A group of Foldable components.
 *
 * @component
 * @param {Object} props - The props for the Foldable.Group component.
 * @param {Array<React.ReactElement<TFoldable>>} props.children - The children to be rendered as a group of Foldable components.
 * @returns {React.ReactElement} The rendered Foldable.Group component.
 */
Foldable.Group = ({ children }: TFoldableGroup): React.ReactElement => {
  const [opened, setOpened] = useState<number | null>(null);

  const handleClose = () => setOpened(null);

  return (
    <div className={styles.group}>
      {Children.map(children, (child, i) => {
        const handleOpen = () => setOpened(i);
        const isToggleDisabled = child.props.toggle === false
        const __controlled = {
          ...child
        };

        if (!isToggleDisabled) {
          __controlled.props = {
            ...child.props,
            onOpen: handleOpen,
            onClose: handleClose,
            isOpen: opened === i
          }
        }
      
        return (
          <div className={styles['group__item']}>
            {__controlled}
          </div>
        );
      })}
    </div>
  )
}

export { Foldable }