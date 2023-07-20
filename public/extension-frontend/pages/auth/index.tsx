import { PageLayout } from '@clipcap/extension-frontend/components/layouts/PageLayout';
import { Button, Icon, NonIdealState } from '@blueprintjs/core';
import { useContext, useState } from 'react';
import { AuthenticationContext } from '@clipcap/contexts';
import { useRouter } from 'next/router';

const AuthPage = () => {
  const router = useRouter();
  const [isGoogleButtonLoading, setIsGoogleButtonLoading] =
    useState<boolean>(false);
  const Authentication = useContext(AuthenticationContext);

  const handleGoogleButtonClick = async () => {
    setIsGoogleButtonLoading(true);

    try {
      const [_, redirect_uri] = await Authentication.Google();

      router.push(redirect_uri);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageLayout>
      <PageLayout.Section>
        <NonIdealState
          icon={<Icon size={45} icon="user" />}
          title="Sign In"
          description="Sign in with Google to start generating AI video summaries"
        />
      </PageLayout.Section>
      <PageLayout.Section>
        <Button
          fill
          large
          onClick={handleGoogleButtonClick}
          loading={isGoogleButtonLoading}
          icon="user"
        >
          Sign in
        </Button>
      </PageLayout.Section>
    </PageLayout>
  );
};

export default AuthPage;
