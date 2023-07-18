import { useEffect, useState } from 'react';
import styles from './ExtensionWrapper.module.scss';
import { TExtensionWrapper } from './types';

export const ExtensionWrapper = ({ children }: TExtensionWrapper) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}