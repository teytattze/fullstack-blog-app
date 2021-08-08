import { Alert, Skeleton, Stack } from '@material-ui/core';
import * as React from 'react';
import { useRouter } from 'next/router';
import { useEmailVerification } from '../users.queries';
import { LoadingWrapper } from 'src/components';

export function UserEmailVerification() {
  const { query } = useRouter();
  const { mutate: verifyEmail, isLoading, isError } = useEmailVerification();

  React.useEffect(() => {
    verifyEmail({ userId: query.id as string });
  }, []);

  return (
    <LoadingWrapper
      loading={isLoading}
      type="skeleton"
      renderSkeleton={() => (
        <Stack direction="column" spacing={2}>
          <Skeleton variant="rectangular" height={24} />
          <Skeleton variant="rectangular" height={24} />
          <Skeleton variant="rectangular" height={188} />
        </Stack>
      )}
    >
      {isError ? (
        <Alert severity="error">
          Verification Failed! Please contact our support team.
        </Alert>
      ) : (
        <Alert severity="success">
          Your account has been verified successfully!
        </Alert>
      )}
    </LoadingWrapper>
  );
}
