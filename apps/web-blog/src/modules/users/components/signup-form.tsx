import {
  Button,
  Box,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  ClickAwayListener,
  Alert,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import * as React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { LoadingWrapper, PageTitle } from 'src/components';
import { useSnackbar } from 'src/hooks/use-snackbar';
import { IUserRegistrationValue } from 'src/shared/interfaces/users.interface';
import {
  defaultUserRegistrationValue,
  userRegistrationValidation,
} from '../users.form';
import { useUserRegister } from '../users.queries';

export function SignUpForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IUserRegistrationValue>();
  const { mutate: userRegister, isLoading: registrationLoading } =
    useUserRegister();

  const { enqueueSnackbar } = useSnackbar();

  const [errMessage, setErrMessage] = React.useState<string>('');

  return (
    <Paper sx={{ p: 5, mx: 'auto', width: '100%', maxWidth: '500px' }}>
      <PageTitle title="Sign Up" />
      <LoadingWrapper loading={registrationLoading}>
        <form
          onSubmit={handleSubmit((data: IUserRegistrationValue) =>
            userRegister(data, {
              onSuccess: (res) => {
                enqueueSnackbar('Register successfully', 'success');
                reset(defaultUserRegistrationValue);
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
                defaultValue={defaultUserRegistrationValue.username}
                rules={userRegistrationValidation.username}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    variant="outlined"
                    helperText={errors.username?.message}
                    error={Boolean(errors.username)}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue={defaultUserRegistrationValue.email}
                rules={userRegistrationValidation.email}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    helperText={errors.email?.message}
                    error={Boolean(errors.email)}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue={defaultUserRegistrationValue.password}
                rules={userRegistrationValidation.password}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    variant="outlined"
                    helperText={errors.password?.message}
                    error={Boolean(errors.password)}
                  />
                )}
              />
            </Stack>
          </Box>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={registrationLoading}
            fullWidth
            disableElevation
          >
            Sign Up
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
          OR
        </Divider>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ color: 'text.secondary' }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Image
              src="/images/google.svg"
              alt="Google icon"
              width={24}
              height={24}
            />
            <Typography variant="body2">Sign In with Google</Typography>
          </Stack>
        </Button>
        <Divider
          sx={{
            my: 2.5,
            color: 'text.disabled',
            fontWeight: 500,
            fontSize: 'caption.fontSize',
          }}
        >
          HAVE ACCOUNT?
        </Divider>
        <NextLink href="/sign-in" passHref>
          <Button
            variant="text"
            endIcon={<ArrowForwardIcon />}
            fullWidth
            disableElevation
          >
            Sign In Now
          </Button>
        </NextLink>
      </LoadingWrapper>
    </Paper>
  );
}
