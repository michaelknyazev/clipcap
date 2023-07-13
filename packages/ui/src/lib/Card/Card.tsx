import styles from './Card.module.scss';

import type { TCard } from './type';
/**
 * @function Card
 * @param {TCard} props - The properties of the Card component.
 * @returns {JSX.Element} The Card component.
 *
 * This component renders a card, which can be used as a container for other content. 
 * It has an optional tabs property, which, when set to true, can be used to display tabs within the card.
 */
const Card = ({ children }: TCard) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}


export { Card }