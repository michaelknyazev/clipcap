import styles from './Welcome.module.scss';

import {
  Button,
  Card,
  Elevation,
  InputGroup,
  Intent,
  Position,
  Tooltip,
} from '@blueprintjs/core';
import { Text, Title } from '@clipcap/ui';

import { Highlight } from '../../../../ui/Highlight';
import { Ellipse } from '../../../../ui/Ellipse/Ellipse';

import type { TWelcome } from './types';

export const Welcome = ({
  onSignUpClick,
  onDownloadClick,
  downloadButtonTitle,
}: TWelcome) => {
  const handleDownloadClick = () => {
    if (onDownloadClick) {
      onDownloadClick();
    }
  };

  const handleSignUpClick = () => {
    if (onSignUpClick) {
      onSignUpClick();
    }
  };

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
          контента на <Highlight>YouTube</Highlight>.
        </Title>
      </div>
      <div className={`${styles.section} ${styles['section-field']}`}>
        <InputGroup
          round
          large
          fill
          placeholder="Вставьте ссылку на youtube видео"
          leftIcon="link"
          rightElement={
            <Tooltip
              position={Position.BOTTOM}
              content="Попробовать расширение"
            >
              <Button icon="play" minimal />
            </Tooltip>
          }
        />
      </div>
      <div className={`${styles.section} ${styles['section-examples']}`}>
        <Card elevation={Elevation.TWO} className={styles.examples}>
          <div
            className={`${styles['examples__section']} ${styles['examples__section-divider']}`}
          >
            <span className={styles.divider} />
          </div>
          <div
            className={`${styles['examples__section']} ${styles['examples__section-title']}`}
          >
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
                    <img
                      className={styles['thumbnail__image__src']}
                      src={item.thumbnail}
                      alt={item.title}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
      <div className={`${styles.section} ${styles['section-action']}`}>
        <div className={styles.actions}>
          <div className={styles['actions__section']}>
            <Button
              onClick={handleDownloadClick}
              intent={Intent.PRIMARY}
              large
              icon="download"
            >
              {downloadButtonTitle}
            </Button>
          </div>
          {/*
            <div className={styles['actions__section']}>
              <Button
                onClick={handleSignUpClick}
                intent={Intent.SUCCESS}
                large
                icon="user"
              >
                Создать аккаунт
              </Button>
            </div>
          */}
        </div>
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
  );
};
