import { useMutation } from 'react-query';
import { AjaxError } from 'src/lib/ajax';
import { login, logout } from 'src/services/api-auth.service';
import {
  ILoginSuccess,
  ILoginValue,
} from 'src/shared/interfaces/auth.interface';

export const useLogin = () => {
  return useMutation<ILoginSuccess, AjaxError, ILoginValue>(
    (data: ILoginValue) => login(data),
  );
};

export const useLogout = () => {
  return useMutation(() => logout());
};
