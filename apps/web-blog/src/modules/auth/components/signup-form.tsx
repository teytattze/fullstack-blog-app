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
import { PageTitle } from 'src/components';

export function SignUpForm() {
  return (
    <Paper sx={{ p: 5, mx: 'auto', width: '100%', maxWidth: '500px' }}>
      <PageTitle title="Sign Up" />
      <Box sx={{ my: 5 }}>
        <Stack direction="column" spacing={2.5}>
          <TextField variant="outlined" label="Username" />
          <TextField variant="outlined" label="Email" />
          <TextField variant="outlined" label="Password" />
        </Stack>
      </Box>
      <Button variant="contained" fullWidth disableElevation>
        Sign Up
      </Button>
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
    </Paper>
  );
}
