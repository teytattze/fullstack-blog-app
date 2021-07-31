import * as React from 'react';
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
  loginSuccess: () => void;
  logoutSuccess: () => void;
};

export const AuthContext = React.createContext<AuthContextState>({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  user: initialUser,
  setUser: () => null,
  isLoading: true,
  setIsLoading: () => null,
  loginSuccess: () => null,
  logoutSuccess: () => null,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<ICookiesUser>(initialUser);

  React.useEffect(() => {
    const initialState = () => {
      setIsLoading(true);
      const { result, data } = checkAuthentication();
      if (result && data) {
        setUser({
          id: data.userId,
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

  const loginSuccess = () => {
    setIsAuthenticated(true);
  };

  const logoutSuccess = () => {
    setUser(initialUser);
    setIsAuthenticated(false);
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
        loginSuccess,
        logoutSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
