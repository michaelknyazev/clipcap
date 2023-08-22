import { Welcome } from '../components/features/Landing/components/Welcome';
import { PageLayout } from '../components/layouts/PageLayout';
import { Point } from '../components/features/Landing/components/Point/Point';
import { Install } from '../components/features/Landing/components/Install';

import type { TFeature } from '@clipcap/types';

import DataExamples from '../components/features/Landing/data-summary-examples.json';
import { useContext } from 'react';
import { UserAgentContext } from '@clipcap/contexts';

const LandingPage: TFeature = () => {
  const { GetBrowser } = useContext(UserAgentContext);
  const browser = GetBrowser();

  let downloadButtonTitle;

  switch (browser) {
    case 'Firefox':
      downloadButtonTitle = 'Добавить в Firefox';
      break;
    case 'Safari':
      downloadButtonTitle = 'Добавить в Safari';
      break;
    default:
      downloadButtonTitle = 'Добавить в Chrome';
      break;
  }

  const handleDownloadClick = () => {
    console.log('download');
  };

  const handleSignupClick = () => {
    console.log('sign up');
  };

  return (
    <PageLayout>
      <PageLayout.Section>
        <Welcome
          onDownloadClick={handleDownloadClick}
          onSignUpClick={handleSignupClick}
          downloadButtonTitle={downloadButtonTitle}
        />
      </PageLayout.Section>
      {DataExamples.map((item, i) => {
        return (
          <PageLayout.Section key={item.videoUrl}>
            <Point odd={i % 2 != 0} {...item} />
          </PageLayout.Section>
        );
      })}
      <PageLayout.Section>
        <Install browser={browser} />
      </PageLayout.Section>
    </PageLayout>
  );
};

export default LandingPage;
