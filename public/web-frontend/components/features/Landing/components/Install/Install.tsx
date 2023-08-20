import styles from './Install.module.scss';

import { Title } from '@clipcap/ui';

import { ChromeWebStoreLogo } from '../../../../ui/ChromeWebStoreLogo';

import { InstallButton } from '../../../../ui/InstallButton';
import { Ellipse } from '../../../../ui/Ellipse/Ellipse';
import { SafariLogo } from '../../../../ui/SafariLogo';
import { FirefoxLogo } from '../../../../ui/FirefoxLogo';

import type { TInstall } from './types';
import { detectUserAgent } from '@clipcap/helpers';

// UA is a User Agent Header string
const Install = ({ ua }: TInstall) => {
  let BrowserIcon;
  let storeName;
  let link;

  const _userAgent = detectUserAgent(ua);

  switch (_userAgent) {
    case 'Firefox':
      BrowserIcon = FirefoxLogo;
      storeName = "Firefox Browser Add-ons"
      link = "https://addons.mozilla.org/en-US/firefox/addon/clipcapapp/"
      break;
    case 'Safari':
      BrowserIcon = SafariLogo;
      storeName = "App Store Safari Extensions"
      link = "https://chrome.google.com/webstore/detail/clipcap-%D1%81%D1%83%D0%BC%D0%BC%D0%B0%D1%80%D0%B0%D0%B9%D0%B7%D0%B5%D1%80-%D0%BA%D0%BE%D0%BD%D1%82%D0%B5/gceiibiejfaikomdeaodmdibeejcbdkf?hl=en&authuser=0"
      break;
    default:
      BrowserIcon = ChromeWebStoreLogo;
      storeName = "магазине расширений Chrome"
      link = "https://chrome.google.com/webstore/detail/clipcap-%D1%81%D1%83%D0%BC%D0%BC%D0%B0%D1%80%D0%B0%D0%B9%D0%B7%D0%B5%D1%80-%D0%BA%D0%BE%D0%BD%D1%82%D0%B5/gceiibiejfaikomdeaodmdibeejcbdkf?hl=en&authuser=0"
      break;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={`${styles.section} ${styles['section-title']}`}>
          <Title level={3} size={30} semibold>
            Готовы попробовать?
          </Title>
        </div>
        <div className={`${styles.section} ${styles['section-install']}`}>
          <InstallButton
            href={link}
            logo={<BrowserIcon />}
            text={
              <>
                Доступно в
                <br />
                {storeName}
              </>
            }
          />
        </div>
        <div
          className={`${styles.section} ${styles['section-ellipse']} ${styles['section-ellipse--blue']}`}
        >
          <Ellipse blue />
        </div>
        <div
          className={`${styles.section} ${styles['section-ellipse']} ${styles['section-ellipse--green']}`}
        >
          <Ellipse green />
        </div>
      </div>
    </div>
  );
};

export { Install };
