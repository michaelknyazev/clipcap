import { PageLayout } from '@clipcap/extension-frontend/components/layouts/PageLayout';
import Icon from '@clipcap/icons';
import { Button, NonIdealState } from '@clipcap/ui';
import { useContext, useState } from "react";
import { AuthenticationContext } from '@clipcap/contexts';
import { useRouter } from 'next/router';

const AuthPage = () => {
  const router = useRouter()
  const [isGoogleButtonLoading, setIsGoogleButtonLoading] = useState<boolean>(false);
  const Authentication = useContext(AuthenticationContext);

  const handleGoogleButtonClick = async () => {
    setIsGoogleButtonLoading(true);

    try {
      const [_, redirect_uri] = await Authentication.Google();

      router.push(redirect_uri);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <PageLayout>
      <NonIdealState
        icon={<Icon name="solid-user" />}
        title="Sign In"
        description="Sign in with Google to get video summary"
        action={(
          <Button onClick={handleGoogleButtonClick} loading={isGoogleButtonLoading} before={<Icon name="google" />}>
            Sign in
          </Button>
        )}
      />
    </PageLayout>
  );
};

export default AuthPage;
