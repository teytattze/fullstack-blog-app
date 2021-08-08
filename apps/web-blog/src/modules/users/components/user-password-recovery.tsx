import { Paper } from '@material-ui/core';
import { LoadingWrapper, PageTitle } from 'src/components';

export function UserPasswordRecovery() {
  return (
    <Paper sx={{ p: 5, mx: 'auto', width: '100%', maxWidth: '500px' }}>
      <PageTitle title="Password Recovery" />
      <LoadingWrapper>
        <form></form>
      </LoadingWrapper>
    </Paper>
  );
}
