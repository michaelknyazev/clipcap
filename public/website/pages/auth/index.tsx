import { AuthGlobalLayout } from '@clipcap/website/components/features/Authentication/layouts/AuthGlobalLayout';
import { AuthPageLayout } from '@clipcap/website/components/features/Authentication/layouts/AuthPageLayout';

import { LogInForm } from '@clipcap/website/components/features/Authentication/components/LogInForm';

const LogInPage = () => {
  return (
    <AuthPageLayout>
      <AuthPageLayout.Section>
        <LogInForm />
      </AuthPageLayout.Section>
    </AuthPageLayout>
  );
}

LogInPage.GlobalLayout = AuthGlobalLayout

export default LogInPage;