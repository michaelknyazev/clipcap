import styles from './Modal.module.scss';

import { Children, useEffect } from 'react';
import { Title } from '@clipcap/ui';
import Icon from '@clipcap/icons';

import type { TModal } from './type'

/**
 * A customizable Modal component with optional title and large style.
 *
 * @component
 * @param {TModal} props - The props for the Modal component.
 * @returns {JSX.Element} The rendered Modal component.
 */
export const Modal = ({ 
  children, 
  title, 
  large = false, 
  onCrossClick 
}: TModal): JSX.Element => {
  const className = [
    styles.container
  ];

  if (large) className.push(styles['container--large']);

  return (
    <div className={className.join(' ')}>
      {onCrossClick ? (
        <div className={`${styles.section} ${styles['section-cross']}`}>
          <span className={styles.close} onClick={onCrossClick}>
            <Icon name="outlined-cross" />
          </span>
        </div>
      ) : ""}
      {title ? (
        <div className={`${styles.section}`}>
          <Title level={3} size={24}>{title}</Title>
        </div>
      ) : ""}
      {Children.map(children, child => {
        return (
          <div className={styles.section}>
            {child}
          </div>
        )
      })}
    </div>
  );
}