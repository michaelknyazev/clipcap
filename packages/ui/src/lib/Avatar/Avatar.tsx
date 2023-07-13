import styles from './Avatar.module.scss';

import type { TAvatar } from './type'
/**
 * @function Avatar
 * @param {TAvatar} props - Properties to configure the avatar.
 * @returns {JSX.Element} The Avatar component.
 * 
 * @example
 * ```jsx
 * <Avatar image="http://example.com/my-avatar.png" name="John Doe" large dark />
 * ```
 * 
 * This component renders an avatar, optionally with a name displayed alongside it.
 * The avatar can be customized in size (small or large), theme (dark or light), 
 * and whether to display only the photo or also the name.
 */
export const Avatar = ({ image, name, small = false, large = false, dark = false, onlyPhoto = false }: TAvatar) => {
  /**
   * Dynamically sets the classes for the avatar container based on the given props.
   * @type {string[]}
   */
  const className: string[] = [
    styles.container
  ];
  /**
   * Size
   */
  if (small) className.push(styles['container-small']);
  else if (large) className.push(styles['container-large']);
  else className.push(styles['container-default']);
  /**
   * Appearance
   */
  if (dark) className.push(styles['container--dark']);
  else className.push(styles['container--default']);
  /**
   * Renders the avatar's image. If the `image` prop is given, it's used as the source for an img element.
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
    <div className={className.join(' ')}>
      <div className={`${styles.section} ${styles['section-image']}`}>
        {ImageElement}
      </div>
      {!onlyPhoto ? (
        <div className={styles.section}>
          <div className={styles.name}>{name}</div>
        </div>
      ) : ""}
    </div>
  );
}