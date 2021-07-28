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
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Image from 'next/image';
import NextLink from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { PageTitle } from 'src/components';
import { login } from 'src/services/api-auth.service';
import { ILoginDto } from 'src/shared/interfaces/auth.interface';

export function SignInForm() {
  const { handleSubmit, control } = useForm<ILoginDto>();

  return (
    <Paper sx={{ p: 5, mx: 'auto', width: '100%', maxWidth: '500px' }}>
      <PageTitle title="Sign In" />
      <form onSubmit={handleSubmit((data: ILoginDto) => login(data))}>
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
        <Button type="submit" variant="contained" fullWidth disableElevation>
          Sign In
        </Button>
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
          <Image src="/images/google.svg" width={24} height={24} />
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
