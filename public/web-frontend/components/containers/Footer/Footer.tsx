import { Logo, Text } from '@clipcap/ui';
import { Icon } from '@clipcap/icons';
import styles from './Footer.module.scss';

const Footer = () => {
  const _date = new Date();
  const year = _date.getFullYear();

  const _sitemap = [
    {
      id: 'categories',
      title: 'Категории',
      content: [
        {
          id: 'health',
          name: 'Здоровье',
        },
        {
          id: 'tech',
          name: 'Технологии',
        },
        {
          id: 'science',
          name: 'Наука',
        },
        {
          id: 'games',
          name: 'Игры',
        },
        {
          id: 'entertainment',
          name: 'Развлечения',
        },
        {
          id: 'education',
          name: 'Образование',
        },
        {
          id: 'career',
          name: 'Карьера',
        },
      ],
    },
    {
      id: 'content',
      content: [
        {
          id: 'sports',
          name: 'Спорт',
        },
        {
          id: 'politics',
          name: 'Политика',
        },
      ],
    },
    {
      id: 'extensions',
      title: 'Расширения',
      content: [
        {
          id: 'chrome',
          name: 'Google Chrome',
        },
        {
          id: 'safari',
          name: 'Safari',
        },
        {
          id: 'firefox',
          name: 'Firefox',
        },
        {
          id: 'yandex-browser',
          name: 'Yandex Browser',
        },
        {
          id: 'vivaldi',
          name: 'Vivaldi',
        },
        {
          id: 'brave',
          name: 'Brave',
        },
      ],
    },
    {
      id: 'about',
      title: 'О проекте',
      content: [
        {
          id: 'team',
          name: 'Команда',
        },
        {
          id: 'blog',
          name: 'Блог',
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles['section-about']}`}>
        <div className={styles.about}>
          <div
            className={`${styles['about__section']} ${styles['about__section-logo']}`}
          >
            <Logo text white />
          </div>
          <div
            className={`${styles['about__section']} ${styles['about__section-text']}`}
          >
            <Text size={25}>— краткий пересказ контента на базе GPT</Text>
          </div>
          <div
            className={`${styles['about__section']} ${styles['about__section-social']}`}
          >
            <nav className={styles.social}>
              <a
                className={`${styles['social__item']} ${styles['social__item-discord']}`}
                target="_blank"
                rel="nofollow,noreferrer"
                href="https://discord.com/clipcapapp"
              >
                <Icon name="discord-simple" />
              </a>
              <a
                className={`${styles['social__item']} ${styles['social__item-instagram']}`}
                target="_blank"
                rel="nofollow,noreferrer"
                href="https://instagram.com/clipcapapp"
              >
                <Icon name="instagram" />
              </a>
              <a
                className={`${styles['social__item']} ${styles['social__item-facebook']}`}
                target="_blank"
                rel="nofollow,noreferrer"
                href="https://facebook.com/clipcapapp"
              >
                <Icon name="facebook" />
              </a>
              <a
                className={`${styles['social__item']} ${styles['social__item-telegram']}`}
                target="_blank"
                rel="nofollow,noreferrer"
                href="https://t.me/clipcapapp"
              >
                <Icon name="telegram" />
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className={`${styles.section} ${styles['section-sitemap']}`}>
        <div className={styles.sitemap}>
          {_sitemap.map((section) => {
            return (
              <div key={section.id} className={styles['sitemap__section']}>
                <nav className={styles.navigation}>
                  {section.title ? (
                    <span
                      className={`${styles['navigation__item']} ${styles['navigation__item-title']}`}
                    >
                      {section.title}
                    </span>
                  ) : (
                    ''
                  )}
                  {section.content.map((item) => {
                    return (
                      <a key={item.id} className={styles['navigation__item']}>
                        {item.name}
                      </a>
                    );
                  })}
                </nav>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${styles.section} ${styles['section-legal']}`}>
        <div className={styles.legal}>
          <div className={styles['legal__section']}>
            &copy; {year} Все права защищены
          </div>
          <div
            className={`${styles['legal__section']} ${styles['legal__section-company']}`}
          >
            <span className={styles.crib}>
              ИП Князев Михаил Валерьевич ОГРНИП: 316774600180112 ИНН:
              772078496092
            </span>
          </div>
          <div className={styles['legal__section']}>
            <a
              className={`${styles.link} ${styles['link--email']}`}
              href="mailto:hello@clipcap.app"
            >
              hello@clipcap.app
            </a>
            <span className={styles.crib}>поддержка</span>
          </div>
          <div className={styles['legal__section']}>
            <a className={styles.link} href="https://d.clipcap.app/privacy.pdf">
              Политика конфиденциальности
            </a>
          </div>
          <div className={styles['legal__section']}>
            <a className={styles.link} href="https://d.clipcap.app/privacy.pdf">
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
