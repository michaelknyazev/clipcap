import styles from './Popover.module.scss';

import { useEffect, useRef } from 'react';

import type { TPopover, TPopoverGroup, TPopoverGroupItem } from './type';
import { useState } from 'react';

const POSITION_TOP_RIGHT = styles['popover-top-right'];
const POSITION_BOTTOM_LEFT = styles['popover-bottom-left'];
const POSITION_BOTTOM_RIGHT = styles['popover-bottom-right'];

/**
 * A popover component to display additional content.
 *
 * @component
 * @param {Object} props - The props for the Popover component.
 * @param {React.ReactNode} props.children - The trigger element for the popover.
 * @param {boolean} [props.show=false] - Whether the popover is visible or not.
 * @param {boolean} [props.inline=false] - Set to true to display the popover inline with other elements.
 * @param {React.ReactNode} props.content - The content to be displayed inside the popover.
 * @param {string} [props.position] - The position of the popover relative to the trigger element.
 * @param {Function} [props.onClose] - The callback function to be executed when the popover is closed.
 * @returns {React.ReactElement} The rendered Popover component.
 */
const Popover = ({
  children,
  show = false,
  inline = false,
  content,
  position,
  onClose,
}: TPopover): React.ReactElement => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const className = [
    styles.popover
  ];

  if (show) className.push(styles['popover-show']);
  if (position) className.push(position);
  else className.push(POSITION_BOTTOM_RIGHT)

  useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      const [minX, maxX] = (() => {
        let min = 0;
        let max = 0;

        if (popoverRef.current) {
          const rect = popoverRef.current.getBoundingClientRect();

          min = rect.left;
          max = min + rect.width;
        }

        return [min, max];
      })()

      const [minY, maxY] = (() => {
        let min = 0;
        let max = 0;

        if (popoverRef.current) {
          const rect = popoverRef.current.getBoundingClientRect();

          min = rect.top;
          max = min + rect.height;
        }

        return [min, max];
      })()

      const isX = event.clientX < minX - 50 || event.clientX > maxX + 50;
      const isY = event.clientY < minY - 50 || event.clientY > maxY + 50;

      if (isX || isY) {
        if (show && onClose) return onClose();
      }
    }

    if (show && onClose) {
      document.addEventListener('click', handleClose);
    }

    return () => {
      document.removeEventListener('click', handleClose);
    }
  }, [show]);

  return (
    <div className={`${styles.container} ${inline ? styles['container-inline'] : ""}`}>
      {children}
      <div className={className.join(' ')} ref={popoverRef}>
        {content}
      </div>
    </div>
  )
}

/**
 * A group of Popover components.
 *
 * @component
 * @param {Object} props - The props for the Popover.Group component.
 * @param {Array<TPopoverGroupItem>} props.children - The children to be rendered as a group of Popover components.
 * @returns {React.ReactElement} The rendered Popover.Group component.
 */
Popover.Group = ({ children }: TPopoverGroup): React.ReactElement => {
  const [opened, setOpened] = useState<number | null>()
 
  const handleClose = () => setOpened(null)

  return (
    <div className={styles.group}>
      {children.map((child, i) => {
        const show = opened === i;
        const handleToggle = () => {
          if (show) return handleClose()
          
          setOpened(i)
        }
    
        return (
          <div key={`popover__group__${i}`} className={styles['group__item']}>
            {child({ handleClose, handleToggle, show })}
          </div>
        )
      })}
    </div>
  )
}

Popover.POSITION_TOP_RIGHT = POSITION_TOP_RIGHT
Popover.POSITION_BOTTOM_LEFT = POSITION_BOTTOM_LEFT
Popover.POSITION_BOTTOM_RIGHT = POSITION_BOTTOM_RIGHT

export { Popover };