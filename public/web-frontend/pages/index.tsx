
import { Welcome } from '../components/features/Landing/components/Welcome';
import { PageLayout } from '../components/layouts/PageLayout';
import { Point } from '../components/features/Landing/components/Point/Point';
import { Install } from '../components/features/Landing/components/Install';

import type { TFeature } from '@clipcap/types';
import type { GetServerSideProps } from 'next';

import DataExamples from '../components/features/Landing/data-summary-examples.json';

type TLandingPageProps = {
  userAgent: string | null
}

export const getServerSideProps: GetServerSideProps<TLandingPageProps> = async (context) => {
  const { req } = context
  const userAgent = req.headers['user-agent'] || null;

  return { props: { userAgent } };
}

const LandingPage: TFeature<TLandingPageProps> = ({ userAgent }) => {
  return (
    <PageLayout>
      <PageLayout.Section>
        <Welcome />
      </PageLayout.Section>
      {DataExamples.map((item, i) => {
        return (
          <PageLayout.Section key={item.videoUrl}>
            <Point odd={i%2 != 0} {...item} />
          </PageLayout.Section>
        );
      })}
      <PageLayout.Section>
        <Install ua={userAgent}/>
      </PageLayout.Section>
    </PageLayout>
  );
};

export default LandingPage;
