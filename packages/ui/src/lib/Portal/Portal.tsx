import styles from './Portal.module.scss';

import { useEffect } from 'react';

import type { TPortal } from './type';

/**
 * A Portal component that provides an overlay and renders its children centered inside it.
 *
 * @component
 * @param {Object} props - The props for the Portal component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the portal.
 * @param {boolean} [props.isOpen=false] - Determines whether the portal is open or not.
 * @param {() => void} [props.onClose] - The callback function to execute when the portal is closed.
 * @returns {React.ReactElement} The rendered Portal component.
 */
export const Portal = ({ children, left = false, right = false, isOpen = false, onClose }: TPortal) => {
  const handleClose = () => {
    if (onClose) return onClose();
  }
  const className = [
    styles.container
  ];

  if (isOpen) className.push(styles['container--opened']);
  else className.push(styles['container--closed']);

  if (left) className.push(styles['container-left']);
  else if (right) className.push(styles['container-right']);
  else className.push(styles['container-center']);

  useEffect(() => {
    const handleEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscPress);
    
    if (isOpen && !document.body.classList.contains(styles['overflow-hidden'])) {
      document.body.classList.add(styles['overflow-hidden']);
    }

    return () => {
      document.removeEventListener('keydown', handleEscPress);
      document.body.classList.remove(styles['overflow-hidden']);
    }
  }, [isOpen]);

  return (
    <div className={className.join(' ')}>
      <div onClick={handleClose} className={`${styles.section} ${styles['section-overlay']}`} />
      <div className={`${styles.section} ${styles['section-content']}`}>
        {children}
      </div>
    </div>
  )
}