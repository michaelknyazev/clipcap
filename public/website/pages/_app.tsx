import '@clipcap/website/styles/globals.scss'

import { EventContextProvider, AuthenticationContextProvider, IdentityContextProvider, SettingsContextProvider } from '@clipcap/contexts'

import { GlobalLayout as DefaultGlobalLayout } from '../components/layouts/GlobalLayout';

import type { TApplication } from '@clipcap/types';

const App = ({ Component, pageProps }: TApplication) => {
  const GlobalLayout = Component.GlobalLayout || DefaultGlobalLayout;

  return (
    <>
      <EventContextProvider>
        <AuthenticationContextProvider>
          <IdentityContextProvider>
            <SettingsContextProvider>
              <GlobalLayout>
                <GlobalLayout.Section>
                  <Component {...pageProps} />
                </GlobalLayout.Section>
              </GlobalLayout>
            </SettingsContextProvider>
          </IdentityContextProvider>
        </AuthenticationContextProvider>
      </EventContextProvider>
    </>
  )
}


export default App;