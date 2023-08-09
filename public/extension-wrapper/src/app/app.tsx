import { useEffect, useState } from 'react';
import styles from './app.module.scss'
import { NonIdealState, Spinner } from '@blueprintjs/core';

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

  /*
  console.log(height)

  if (!height) {
    return (
      <NonIdealState
        title="Loading"
        icon={<Spinner />}
        description={`Loading the extension... ${height}`}
      />
    )
  }*/

  return (
    <div className={styles.container} style={{ height: `${height}px` }}>
      <iframe src="https://localhost:3000/profile" className={styles.frame} />
    </div>
  );
}
