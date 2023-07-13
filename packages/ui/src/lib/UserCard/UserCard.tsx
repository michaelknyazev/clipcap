import styles from './UserCard.module.scss';

import type { TUserCard } from './types';

export const UserCard = ({ name, description, image, current }: TUserCard) => {
  /**
   * Renders the users's image. If the `image` prop is given, it's used as the source for an img element.
   * If no `image` prop is provided, the first letter of the `name` prop is used, or "A" if no `name` is provided.
   * @type {JSX.Element}
   */
  const ImageElement: JSX.Element = (() => {
    if (image) {
      return <img className={styles.image} src={image} alt={name} />;
    }

    const letters = name?.split("");

    return (
      <span className={`${styles.image} ${styles['image--empty']}`}>
        {letters ? letters[0] : "A"}
      </span>
    );
  })()

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        {ImageElement}
      </div>
      <div className={`${styles.section} ${styles['section-user']}`}>
        <span className={styles.name}>{name}</span>
        {current ? (
          <span className={styles.current}>(You)</span>
        ) : ""}
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
}