import { useState, Children } from 'react';
import styles from './Tag.module.scss';

import type { TTag, TTagOption, TTagOptions } from './type';

const Tag = ({ 
  children, 
  large = false,
  medium = false, 
  small = false,
  plain = false,
  before,
  after,
  success = false,
  purple = false,
  outlined = false,
  fill = false,
  onClick =  () => {},
}: TTag) => {

  const handleClick = () => {
    return onClick();
  }
  
  const className = [
    styles.container
  ];

  if (large) className.push(styles['container-large']);
  else if (small) className.push(styles['container-small']);
  else if (medium) className.push(styles['container-medium']);

  if (plain) className.push(styles['container--plain']);
  else if (success) className.push(styles['container--success']);
  else if (purple) className.push(styles['container--purple']);
  else if (outlined) className.push(styles['container--outlined']);
  else if (fill) className.push(styles['container--fill'])
  else className.push(styles['container--default']);

  return (
    <div onClick={handleClick} className={className.join(' ')}>
      {(() => {
        if (before) {
          return (
            <span className={styles.before}>
              {before}
            </span>
          );
        }
      })()}
      <span className={styles.content}>
        {children}
      </span>
      {(() => {
        if (after) {
          return (
            <span className={styles.after}>
              {after}
            </span>
          );
        }
      })()}
    </div>
  );
}

Tag.Options = ({ children, value, onChange }: TTagOptions) => {
  const [selected, setSelected] = useState<string>(value);

  const handleSelect = ({ label, value }: TTagOption) => {
    setSelected(value);
    
    onChange({ label, value })
  }

  return (
    <div className={styles.options}>
      {Children.map(children, (child, i) => {
        const _label = child.props.label as string;
        const _value = child.props.value as string;
        
        const TagOption: TTagOption = {
          label: _label,
          value: _value
        };
        
        const __controlled = {
          ...child,
          props: {
            ...child.props,
            onClick: () => handleSelect(TagOption),
            fill: selected === TagOption.value,
            outlined: selected !== TagOption.value
          }
        }
        return (
          <div className={styles['options__section']}>
            {__controlled}
          </div>
        );
      })}
    </div>
  );
}


export { Tag }