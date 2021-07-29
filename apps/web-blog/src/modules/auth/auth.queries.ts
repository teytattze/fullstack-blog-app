import { useMutation } from 'react-query';
import { login, logout } from 'src/services/api-auth.service';
import { ILoginDto } from 'src/shared/interfaces/auth.interface';

export const useLogin = () => {
  return useMutation(({ username, password }: ILoginDto) =>
    login({ username, password }),
  );
};

export const useLogout = () => {
  return useMutation(() => logout());
};
