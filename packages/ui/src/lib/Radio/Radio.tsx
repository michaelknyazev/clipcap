import { Children, useState } from 'react'
import styles from './Radio.module.scss'

import type { TRadio, TRadioGroup } from './types'

const Radio = ({ label, value, checked, onClick }: TRadio) => {
  const className = [
    styles.radio
  ]

  if (checked) className.push(styles['radio--checked'])

  const handleClick = () => {
    if (onClick) onClick(value)
  }

  return (
    <div className={className.join(' ')} onClick={handleClick}>
      <div className={styles.circle} />
      <div className={styles.label}>
        {label}
      </div>
    </div>
  );
}

Radio.Group = ({ children, defaultValue, onChange }: TRadioGroup) => {
  const [selected, setSelected] = useState<string>(defaultValue)

  const handleClick = (value: string) => {
    setSelected(value)

    if (onChange) {
      onChange(value)
    }
  } 

  return (
    <div className={styles.container}>
      {Children.map(children, child => {
        return (
          <div className={styles.section}>
            {{
              ...child,
              props: {
                ...child.props,
                checked: selected === child.props.value,
                onClick: () => handleClick(child.props.value)
              }
            }}
          </div>
        )
      })}
    </div>
  )
}

export { Radio }