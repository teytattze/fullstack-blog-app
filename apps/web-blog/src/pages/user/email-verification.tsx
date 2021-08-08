import { PageContainer } from 'src/components';
import { UserEmailVerification } from 'src/modules/users';

function EmailVerification() {
  return (
    <PageContainer title="Email Verification">
      <UserEmailVerification />
    </PageContainer>
  );
}

export default EmailVerification;
