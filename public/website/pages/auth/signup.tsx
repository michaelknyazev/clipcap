import { Children } from 'react';
import { useRouter } from 'next/router';
import { Button, TLayout } from '@clipcap/ui';

import { AuthGlobalLayout } from '@clipcap/website/components/features/Authentication/layouts/AuthGlobalLayout';
import { AuthPageLayout } from '@clipcap/website/components/features/Authentication/layouts/AuthPageLayout';

import { SignUpForm } from '@clipcap/website/components/features/Authentication/components/SignUpForm';

const SignUpPage = () => {
  return (
    <AuthPageLayout>
      <AuthPageLayout.Section>
        <SignUpForm />
      </AuthPageLayout.Section>
    </AuthPageLayout>
  );
}

const AuthGlobalLayoutWithLogInButton = ({ children }: TLayout) => {
  const router = useRouter();
  const handleGoToSignup = () => router.push('/auth/login');

  return (
    <AuthGlobalLayout button={<Button outlined large onClick={handleGoToSignup}>Log In</Button>}>
      {Children.map(children, child => {
        return (
          <AuthGlobalLayout.Section>
            {child}
          </AuthGlobalLayout.Section>
        )
      })}
    </AuthGlobalLayout>
  );
};

AuthGlobalLayoutWithLogInButton.Section = AuthGlobalLayout.Section
SignUpPage.GlobalLayout = AuthGlobalLayoutWithLogInButton

export default SignUpPage;


