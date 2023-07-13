import { Children, useEffect } from 'react'
import styles from './Tabs.module.scss'


import type { TTab, TTabs } from './types'

const Tabs = ({ children, vertical = false, active, onTabChange }: TTabs) => {
  const TabHeader = children.map((child, i) => {
    const { title, id, onFocus, onBlur } = child.props

    const handleFocus = () => {
      if (onFocus) onFocus(child.props)
    }
    const handleBlur = () => {
      if (onBlur) onBlur(child.props)
    }

    const handleTabHeaderClick = () => {
      if (active === i) handleBlur()
      if (onTabChange) onTabChange(child.props);

      handleFocus()
    }

    return {
      index: i,
      key: `tab-header-${id}`,
      title: title,
      active: id === active,
      onClick: handleTabHeaderClick
    }
  })

  const className = [
    styles.container
  ]

  if (vertical) className.push(styles['container--vertical']);

  return (
    <div className={className.join(' ')}>
      <div className={`${styles.section} ${styles['section-header']}`}>
        <div className={styles.header}>
          {TabHeader.map(item => {
            return (
              <div key={item.key} className={styles['header__section']}>
                <div onClick={item.onClick} className={`${styles.button} ${styles[`button-${vertical ? "vertical" : "default"}`]} ${styles[`button--${item.active ? "active" : "default"}`]}`}>
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${styles.section} ${styles['section-content']}`}>
        {Children.map(children, child => {
          const { id } = child.props;
          const isTabActive = active === id;

          return {
            ...child,
            props: {
              ...child.props,
              active: isTabActive
            }
          }
        })}
      </div>
    </div>
  )
}

Tabs.Tab = ({ children, active = false }: TTab) => {
  const className = [
    styles.tab
  ];

  if (active) className.push(styles['tab--active'])

  return (
    <div className={className.join(' ')}>
      {children}
    </div>
  );
}

export { Tabs }