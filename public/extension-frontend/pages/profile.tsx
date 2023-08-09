import { NonIdealState } from '@blueprintjs/core';
import { ProfileBootstrap } from '../components/features/Profile/bootstrap/ProfileBootstrap/ProfileBootstrap';
import { GlobalLayoutNoFooter } from '../components/layouts/GlobalLayoutNoFooter/GlobalLayoutNoFooter';
import { TFeature } from '@clipcap/types';
import { PageLayout } from '../components/layouts/PageLayout';

const ProfilePage: TFeature = () => {
  return (
    <PageLayout>
      <PageLayout.Section>
        <NonIdealState
          layout="horizontal"
          icon="person"
          title="Sign In"
          description={
            <>
              Please Sign In to ClipCap
              <br /> using the extension on the page
            </>
          }
        />
      </PageLayout.Section>
    </PageLayout>
  );
};

ProfilePage.GlobalLayout = GlobalLayoutNoFooter;
ProfilePage.Bootstrap = ProfileBootstrap;

export default ProfilePage;
