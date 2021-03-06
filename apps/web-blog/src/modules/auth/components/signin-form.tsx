import {
  Alert,
  Button,
  Box,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  ClickAwayListener,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { LoadingWrapper, PageTitle } from 'src/components';
import { ILoginValue } from 'src/shared/interfaces/auth.interface';
import { useAuth } from 'src/shared/hooks/use-auth';
import { useSnackbar } from 'src/shared/hooks/use-snackbar';
import { defaultLoginValue, loginValidation } from '../auth.form';
import { useLogin } from '../auth.queries';

export function SignInForm() {
  const { loginSuccess } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ILoginValue>();
  const { mutate: login, isLoading: loginLoading } = useLogin();

  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [errMessage, setErrMessage] = React.useState<string>('');

  return (
    <Paper
      sx={{
        p: 5,
        mx: 'auto',
        width: '100%',
        maxWidth: '500px',
      }}
    >
      <PageTitle title="Sign In" />
      <LoadingWrapper loading={loginLoading}>
        <form
          onSubmit={handleSubmit((data: ILoginValue) =>
            login(data, {
              onSuccess: (res) => {
                loginSuccess();
                enqueueSnackbar(res.message, 'success');
                reset(defaultLoginValue);
                push('/');
              },
              onError: (err) => {
                setErrMessage(err.response?.data.message);
              },
            }),
          )}
        >
          <Box sx={{ my: 5 }}>
            <Stack direction="column" spacing={2.5}>
              {Boolean(errMessage) && (
                <ClickAwayListener onClickAway={() => setErrMessage('')}>
                  <Alert severity="error">{errMessage}</Alert>
                </ClickAwayListener>
              )}
              <Controller
                name="username"
                control={control}
                defaultValue={defaultLoginValue.username}
                rules={loginValidation.username}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="username"
                    label="Username"
                    variant="outlined"
                    helperText={errors.username?.message}
                    error={Boolean(errors.username)}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue={defaultLoginValue.password}
                rules={loginValidation.password}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    helperText={errors.password?.message}
                    error={Boolean(errors.password)}
                  />
                )}
              />
            </Stack>
            <Box sx={{ textAlign: 'right' }}>
              <NextLink href="/forgot-password" passHref>
                <Link
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    p: 0.5,
                    cursor: 'pointer',
                    ':hover': {
                      color: 'text.primary',
                    },
                    textDecoration: 'none',
                  }}
                >
                  Forgot Password?
                </Link>
              </NextLink>
            </Box>
          </Box>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loginLoading}
            fullWidth
            disableElevation
          >
            Sign In
          </LoadingButton>
        </form>
        <Divider
          sx={{
            my: 2.5,
            color: 'text.disabled',
            fontWeight: 500,
            fontSize: 'caption.fontSize',
          }}
        >
          NO ACCOUNT?
        </Divider>
        <NextLink href="/sign-up" passHref>
          <Button
            variant="text"
            endIcon={<ArrowForwardIcon />}
            fullWidth
            disableElevation
          >
            Sign Up Now
          </Button>
        </NextLink>
      </LoadingWrapper>
    </Paper>
  );
}
