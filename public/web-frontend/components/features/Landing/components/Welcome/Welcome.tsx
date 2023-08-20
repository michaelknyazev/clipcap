import styles from './Welcome.module.scss';

import { Button, Card, Elevation, InputGroup, Intent } from '@blueprintjs/core';
import { Text, Title } from '@clipcap/ui';

import { Highlight } from '../../../../ui/Highlight';
import { Ellipse } from '../../../../ui/Ellipse/Ellipse';

export const Welcome = () => {
  const _examples = [
    {
      id: 'first',
      thumbnail: './_assets/landing/thumbnails/first.png',
      link: '',
      title: 'How to cut a fish',
    },
    {
      id: 'second',
      thumbnail: './_assets/landing/thumbnails/second.png',
      link: '',
      title: 'Oppenheimer',
    },
    {
      id: 'third',
      thumbnail: './_assets/landing/thumbnails/third.png',
      link: '',
      title: 'How to catch a fish',
    },
    {
      id: 'forth',
      thumbnail: './_assets/landing/thumbnails/forth.png',
      link: '',
      title: 'Aliens are here',
    },
  ];

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.section} ${styles['section-title']}`}>
        <Title bold level={1} size={60}>
          Видео в двух словах: <Highlight>мгновенный доступ к сути</Highlight>{' '}
          контента на Youtube.
        </Title>
      </div>
      <div className={`${styles.section} ${styles['section-field']}`}>
        <InputGroup
          large
          fill
          placeholder='Вставьте ссылку на youtube видео'
          leftIcon="link"
          rightElement={(
            <Button icon="search" minimal />
          )}
        />
      </div>
      <div className={`${styles.section} ${styles['section-examples']}`}>
        <Card elevation={Elevation.ONE} className={styles.examples}>
          <div className={`${styles['examples__section']} ${styles['examples__section-title']}`}>
            <Text size={16}>Или выберите один из роликов</Text>
          </div>
          <div className={styles['examples__section']}></div>
          {_examples.map((item) => {
            return (
              <div
                key={item.id}
                className={`${styles['examples__section']} ${styles['examples__section-item']}`}
              >
                <div className={styles.thumbnail}>
                  <div className={styles['thumbnail__image']}>
                    <img className={styles['thumbnail__image__src']} src={item.thumbnail} alt={item.title} />
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
      <div className={`${styles.section} ${styles['section-action']}`}>
        <Button intent={Intent.PRIMARY} large icon="download">Установить расширение Chrome</Button>
      </div>
      <div className={`${styles.section} ${styles['section-ellipse']} ${styles['section-ellipse--blue']}`}>
        <Ellipse blue />
      </div>
      <div className={`${styles.section} ${styles['section-ellipse']} ${styles['section-ellipse--green']}`}>
        <Ellipse green />
      </div>
    </div>
  );
};
