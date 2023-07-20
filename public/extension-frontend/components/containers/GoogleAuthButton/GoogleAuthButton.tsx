import styles from './GoogleAuthButton.module.scss';
import { TGoogleAuthButton } from './types';

export const GoogleAuthButton = ({ children, onClick }: TGoogleAuthButton) => {
  return (
    <button type="button" className="bp5-button bp5-large bp5-fill" onClick={onClick}>
      <img className={styles.icon} src="/static/social/btn_google_light_normal_ios.svg" />
      <span className="bp5-button-text">
        {children}
      </span>
    </button>
  );
}
