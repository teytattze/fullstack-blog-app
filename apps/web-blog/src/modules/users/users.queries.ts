import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { register } from 'src/services/api-users.service';
import {
  IUser,
  IUserRegistrationValue,
} from 'src/shared/interfaces/users.interface';

export const useUserRegister = () => {
  return useMutation<IUser, AxiosError, IUserRegistrationValue>(
    ({ username, email, password }: IUserRegistrationValue) =>
      register({ username, email, password }),
  );
};
