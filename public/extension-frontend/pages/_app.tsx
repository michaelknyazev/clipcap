import '@clipcap/extension-frontend/styles/globals.scss';

import { GlobalLayout as DefaultGlobalLayout } from '../components/layouts/GlobalLayout';

import { AuthenticationContextProvider } from '@clipcap/contexts';

import type { TApplication } from '@clipcap/types';
import { useEffect, useRef } from 'react';
import { debug } from '@clipcap/helpers';

const App = ({ Component, pageProps }: TApplication) => {
  const appRootRef = useRef<HTMLDivElement>()
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
      <AuthenticationContextProvider>
        <GlobalLayout>
          <GlobalLayout.Section>
            <Component {...pageProps} />
          </GlobalLayout.Section>
        </GlobalLayout>
      </AuthenticationContextProvider>
    </div>
  );
};

export default App;
