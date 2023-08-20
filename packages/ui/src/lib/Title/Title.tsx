import styles from './Title.module.scss';

import type { TTitle } from './type';

export const Title = ({ 
  size = 20, 
  level = 4, 
  medium = false, 
  semibold = false, 
  bold = false, 
  children
}: TTitle) => {
  const className = [
    styles.title,
    styles[`title-${size}`]
  ];

  if (bold) className.push(styles['title--bold']);
  else if (semibold) className.push(styles['title--semibold']);
  else if (medium) className.push(styles['title--medium']);
  else className.push(styles['title--regular']);

  const params = {
    className: className.join(' ')
  }

  switch (level) {
    case 1:
      return <h1 {...params}>{children}</h1>;
    case 2:
      return <h2 {...params}>{children}</h2>;
    case 3:
      return <h3 {...params}>{children}</h3>;
    default:
    case 4:
      return <h4 {...params}>{children}</h4>;
    case 5:
      return <h5 {...params}>{children}</h5>;
    case 6:
      return <h6 {...params}>{children}</h6>;
  }
}