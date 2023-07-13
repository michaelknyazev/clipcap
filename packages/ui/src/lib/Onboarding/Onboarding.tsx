import styles from './Onboarding.module.scss';

import type { TOnboarding } from './type';

import { Title, Text } from '@clipcap/ui';
/**
 * An Onboarding component, which provides UI for onboarding users.
 *
 * @component
 * @param {TOnboarding} props - The props for the Onboarding component.
 * @returns {React.ReactElement} The rendered Onboarding component.
 */
export const Onboarding = ({ icon, yellow = false, title, text, action }: TOnboarding) => {
  const className = [
    styles.container
  ];

  if (yellow) className.push(styles['container--yellow']);
  else className.push(styles['container--default']);

  return (
    <div className={className.join(' ')}>
      {icon ? (
        <div className={`${styles.section} ${styles['section-icon']}`}>
          <span className={styles.icon}>
          {icon}
          </span>
        </div>
      ) : ""}
      <div className={`${styles.section} ${styles['section-title']}`}>
        <Title level={3} size={20}>{title}</Title>
      </div>
      {text ? (
        <div className={`${styles.section} ${styles['section-text']}`}>
          <Text size={16}>{text}</Text>
        </div>
      ) : ""}
      {action ? (
        <div className={`${styles.section} ${styles['section-action']}`}>
          {action}
        </div>
      ) : ""}
    </div>
  );
}