import * as React from 'react';
import { Snackbar } from 'src/components';
import { ICookiesUser } from 'src/shared/interfaces/users.interface';
import { checkAuthentication } from './auth.helpers';

const initialUser: ICookiesUser = {
  id: '',
  username: '',
  email: '',
  emailVerified: false,
  role: null,
};

type AuthContextState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: ICookiesUser;
  setUser: (user: ICookiesUser) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setLoginState: () => void;
  setLogoutState: () => void;
};

export const AuthContext = React.createContext<AuthContextState>({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  user: initialUser,
  setUser: () => null,
  isLoading: true,
  setIsLoading: () => null,
  setLoginState: () => null,
  setLogoutState: () => null,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<ICookiesUser>(initialUser);

  const [snackbar, setSnackbar] = React.useState({
    login: false,
    logout: false,
  });

  const handleLoginSnackbar = () => {
    setSnackbar({
      ...snackbar,
      login: !snackbar.login,
    });
  };

  const handleLogoutSnackbar = () => {
    setSnackbar({
      ...snackbar,
      logout: !snackbar.logout,
    });
  };

  React.useEffect(() => {
    const initialState = () => {
      setIsLoading(true);
      const { result, data } = checkAuthentication();
      if (result && data) {
        setUser({
          id: data.id,
          username: data.username,
          email: data.email,
          emailVerified: data.emailVerified,
          role: data.role,
        });
        setIsAuthenticated(true);
      } else {
        setUser(initialUser);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    initialState();
  }, [isAuthenticated]);

  const setLoginState = () => {
    setIsAuthenticated(true);
    handleLoginSnackbar();
  };

  const setLogoutState = () => {
    setUser(initialUser);
    setIsAuthenticated(false);
    handleLogoutSnackbar();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        isLoading,
        setIsLoading,
        setLoginState,
        setLogoutState,
      }}
    >
      {children}
      <Snackbar
        open={snackbar.login}
        handleClose={handleLoginSnackbar}
        type="success"
        message="Login successfully!"
      />
      <Snackbar
        open={snackbar.logout}
        handleClose={handleLogoutSnackbar}
        type="success"
        message="Logout successfully!"
      />
    </AuthContext.Provider>
  );
}
