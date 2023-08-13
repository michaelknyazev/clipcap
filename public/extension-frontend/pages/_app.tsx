import '@clipcap/extension-frontend/styles/globals.scss';
import { useEffect, useRef } from 'react';

import { GlobalLayout as DefaultGlobalLayout } from '../components/layouts/GlobalLayout';
import { DefaultBootstrap } from '../components/bootstrap/DefaultBootstrap';

import type { TApplication } from '@clipcap/types';

const App = ({ Component, pageProps }: TApplication) => {
  const appRootRef = useRef<HTMLDivElement>()

  const Bootstrap = Component.Bootstrap || DefaultBootstrap;
  const GlobalLayout = Component.GlobalLayout || DefaultGlobalLayout;

  useEffect(() => {
    const _heightInterval = setInterval(() => {
      const _Rect = document.body.getBoundingClientRect()
      window.parent.postMessage(
        {
          height: _Rect.height
        },
        '*'
      );
    }, 100);

    return () => {
      clearInterval(_heightInterval);
    }
  },[]);

  return (
    <div ref={appRootRef}>
      <Bootstrap>
        <GlobalLayout>
          <GlobalLayout.Section>
            <Component {...pageProps} />
          </GlobalLayout.Section>
        </GlobalLayout>
      </Bootstrap>
    </div>
  );
};

export default App;
