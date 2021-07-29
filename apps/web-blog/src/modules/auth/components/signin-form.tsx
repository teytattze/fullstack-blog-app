import {
  Button,
  Box,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useTheme } from '@material-ui/core/styles';
import Image from 'next/image';
import NextLink from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { PageTitle } from 'src/components';
import { ILoginDto } from 'src/shared/interfaces/auth.interface';
import { useLogin } from '../auth.queries';
import { useAuth } from 'src/hooks/use-auth';
import * as _ from 'lodash';

export function SignInForm() {
  const theme = useTheme();

  const { handleSubmit, control, reset } = useForm<ILoginDto>();
  const { mutate: login, isLoading: loginLoading } = useLogin();
  const { setLoginState } = useAuth();

  return (
    <Paper
      sx={{
        p: 5,
        mx: 'auto',
        width: '100%',
        maxWidth: '500px',
        pointerEvents: loginLoading ? 'none' : 'auto',
        opacity: loginLoading && 1 - theme.palette.action.disabledOpacity,
      }}
    >
      <PageTitle title="Sign In" />
      <form
        onSubmit={handleSubmit((data: ILoginDto) =>
          login(data, {
            onSuccess: ({ data }) => {
              if (!_.has(data, 'errorCode')) {
                setLoginState();
                reset({ username: '', password: '' });
                return;
              }
            },
          }),
        )}
      >
        <Box sx={{ my: 5 }}>
          <Stack direction="column" spacing={2.5}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Username" variant="outlined" />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  variant="outlined"
                />
              )}
            />
          </Stack>
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
              }}
            >
              Forgot Password?
            </Link>
          </NextLink>
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
        OR
      </Divider>
      <LoadingButton
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ color: 'text.secondary' }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Image
            src="/images/google.svg"
            alt="Google logo"
            width={24}
            height={24}
          />
          <Typography variant="body2">Sign In with Google</Typography>
        </Stack>
      </LoadingButton>
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
    </Paper>
  );
}
