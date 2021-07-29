import * as React from 'react';
import {
  Button,
  ButtonProps,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Divider,
  Link,
  Stack,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ArticleIcon from '@material-ui/icons/Article';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';
import { useAuth } from 'src/hooks/use-auth';
import { useLogout } from 'src/modules/auth/auth.queries';
import * as _ from 'lodash';

export function Navbar() {
  const theme = useTheme();
  const isDefault = useMediaQuery(theme.breakpoints.up('md'));

  const { isAuthenticated } = useAuth();

  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        height: '5rem',
        backgroundColor: 'white',
        position: 'fixed',
        top: 0,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Logo />
        <DefaultLinks isDefault={isDefault} isAuthenticated={isAuthenticated} />
      </Container>
      {!isDefault && isAuthenticated && <BottomLinks />}
    </Box>
  );
}

export function Logo() {
  return (
    <NextLink href="/" passHref>
      <Link
        variant="h6"
        sx={{
          cursor: 'pointer',
          color: 'text.primary',
          fontFamily: 'fontTitle',
          fontWeight: 'bold',
          ':hover': {
            textDecoration: 'none',
          },
        }}
      >
        MyBlog
      </Link>
    </NextLink>
  );
}

type DefaultLinksProps = {
  isDefault: boolean;
  isAuthenticated: boolean;
};

export function DefaultLinks({
  isDefault,
  isAuthenticated,
}: DefaultLinksProps) {
  const { mutate: logout } = useLogout();
  const { setLogoutState } = useAuth();
  const router = useRouter();

  const checkPath = (pathname: string) => {
    if (router.pathname === '/' && pathname === '/') return true;
    if (pathname !== '/') {
      const isActive =
        router.pathname === pathname || router.pathname.indexOf(pathname) === 0;
      return isActive;
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Stack direction="row" spacing={3}>
          {isDefault && (
            <>
              <Stack direction="row" spacing={1.5}>
                <DefaultNavLink
                  variant="text"
                  color="inherit"
                  href="/"
                  isActive={checkPath('/')}
                >
                  Home
                </DefaultNavLink>
                <DefaultNavLink
                  variant="text"
                  color="inherit"
                  href="/posts"
                  isActive={checkPath('/posts')}
                >
                  My Post
                </DefaultNavLink>
                <DefaultNavLink
                  variant="text"
                  color="inherit"
                  href="/account"
                  isActive={checkPath('/account')}
                >
                  Account
                </DefaultNavLink>
              </Stack>
              <Divider orientation="vertical" flexItem />
            </>
          )}
          <Button
            onClick={() => {
              logout(null, {
                onSuccess: (res) => {
                  if (!_.has(res.data, 'errorCode')) {
                    setLogoutState();
                  }
                },
              });
              setLogoutState();
            }}
            variant="outlined"
            size={isDefault ? 'medium' : 'small'}
          >
            Logout
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            size={isDefault ? 'medium' : 'small'}
            href="/sign-in"
            disableElevation
          >
            Login
          </Button>
          <Button
            variant="outlined"
            size={isDefault ? 'medium' : 'small'}
            href="/sign-up"
          >
            Sign Up
          </Button>
        </Stack>
      )}
    </>
  );
}

export function BottomLinks() {
  const router = useRouter();
  const [value, setValue] = React.useState(router.pathname);

  const handleChange = (ev: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: '100%', position: 'fixed', zIndex: 'appBar', bottom: 0 }}
      value={value}
      onChange={handleChange}
      showLabels
    >
      <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
      <BottomNavigationAction
        label="Post"
        value="/posts"
        icon={<ArticleIcon />}
      />
      <BottomNavigationAction
        label="Account"
        value="/account"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
}

type DefaultNavLinkProps = {
  children: React.ReactNode;
  href: string | UrlObject;
  isActive?: boolean;
} & Omit<ButtonProps, 'href' | 'children'>;

export function DefaultNavLink({
  children,
  href,
  isActive = false,
  ...props
}: DefaultNavLinkProps) {
  return (
    <NextLink href={href} passHref>
      <Button
        {...props}
        sx={{
          backgroundColor: isActive ? 'grey.100' : 'inherit',
        }}
      >
        {children}
      </Button>
    </NextLink>
  );
}
