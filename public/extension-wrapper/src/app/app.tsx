import styles from './app.module.scss'

import { useEffect, useState } from 'react';

export const App = () => {
  const [height, setHeight] = useState<number | null>(null)

  useEffect(() => {
    const _onMessage = (e: MessageEvent) => {
      const { height } = e.data;

      if (height) {
        setHeight(height);
      }
    }

    window.addEventListener('message', _onMessage);

    return () => {
      window.removeEventListener('message', _onMessage);
    }

  }, []);

  return (
    <div className={styles.container} style={{ height: `${height}px` }}>
      <iframe title="ClipCap Profile" src="https://localhost:3000/profile" className={styles.frame} />
    </div>
  );
}
