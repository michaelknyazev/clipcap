import '../styles/globals.scss';

import { GlobalLayout as DefaultGlobalLayout } from '../components/layouts/GlobalLayout';
import { DefaultBootstrap } from '../components/bootstrap/DefaultBootstrap';

import type { TApplication } from '@clipcap/types';

const App = ({ Component, pageProps }: TApplication) => {
  const Bootstrap = Component.Bootstrap || DefaultBootstrap;
  const GlobalLayout = Component.GlobalLayout || DefaultGlobalLayout;

  return (
    <Bootstrap>
      <GlobalLayout>
        <GlobalLayout.Section>
          <Component {...pageProps} />
        </GlobalLayout.Section>
      </GlobalLayout>
    </Bootstrap>
  );
};

export default App;
