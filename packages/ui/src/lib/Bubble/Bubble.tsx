import styles from './Bubble.module.scss';

import type { TBubble } from './type';
import { useEffect, useRef } from 'react';
/**
 * @function Bubble
 * @param {TBubble} props - The properties of the Bubble component.
 * @returns {JSX.Element} The Bubble component.
 *
 * This component creates a bubble-like element, which can be used as a tooltip, popover, etc.
 * The bubble can be customized with different templates, titles, and contents.
 * The bubble's visibility can be controlled with the 'show' prop.
 * 
 * @example
 * <Bubble template='error' show={isBubblePopped} title="Bubble Title" content="A text inside bubble">
 *   // a JSX.Element to wrap the bubble around                  
 * </Bubble>
 */
export const Bubble = ({
  children,
  show = false,
  template = 'default',
  title,
  content
}: TBubble): JSX.Element => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const className = [
    styles.bubble,
    styles[`bubble--${template}`]
  ];

  if (show) className.push(styles['bubble-show']);

  useEffect(() => {
    if (bubbleRef.current) {
      const calculatedWidth = bubbleRef.current.offsetWidth / 19.2;
      const padding = 32 / 19.2;

      bubbleRef.current.style.left = `-${calculatedWidth + padding}rem`;
    }
  }, [show]);

  return (
    <div className={styles.container}>
      {children}
      <div className={className.join(' ')} ref={bubbleRef}>
        {(() => {
          if (title) {
            return (
              <div className={styles['bubble__section']}>
                <span className={styles.title}>{title}</span>
              </div>
            )
          }
        })()}
        {(() => {
          if (content) {
            return (
              <div className={styles['bubble__section']}>
                {content}
              </div>
            );
          }
        })()}
      </div>
    </div>
  )
}