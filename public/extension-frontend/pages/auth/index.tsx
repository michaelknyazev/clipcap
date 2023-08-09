import { PageLayout } from '@clipcap/extension-frontend/components/layouts/PageLayout';
import { Button, Icon, NonIdealState } from '@blueprintjs/core';
import { useContext, useState } from 'react';
import { AuthenticationContext } from '@clipcap/contexts';
import { useRouter } from 'next/router';
import { GoogleAuthButton } from '@clipcap/extension-frontend/components/containers/GoogleAuthButton';
import { GlobalLayoutNoFooter } from '@clipcap/extension-frontend/components/layouts/GlobalLayoutNoFooter/GlobalLayoutNoFooter';

import type { TFeature } from '@clipcap/types';

const AuthPage: TFeature = () => {
  const router = useRouter();
  const Authentication = useContext(AuthenticationContext);

  const handleGoogleButtonClick = async () => {
    try {
      const [_, redirect_uri] = await Authentication.Google();

      if (redirect_uri === "") return router.push('/');

      router.push(redirect_uri);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageLayout>
      <PageLayout.Section empty>
        <NonIdealState
          icon={<Icon size={45} icon="user" />}
          title="Sign In"
          description={(
            <>
            Sign in with Google to start generating <br/> AI video summaries
            </>
          )}
        />
      </PageLayout.Section>
      <PageLayout.Section>
        <GoogleAuthButton
          onClick={handleGoogleButtonClick}
        >
          Continue with Google
        </GoogleAuthButton>
      </PageLayout.Section>
    </PageLayout>
  );
};

AuthPage.GlobalLayout = GlobalLayoutNoFooter

export default AuthPage;
