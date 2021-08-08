import { AxiosError } from 'axios';
import { useQuery, useMutation } from 'react-query';
import { register, verifyUserEmail } from 'src/services/api-users.service';
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

export const useEmailVerification = () => {
  return useMutation<IUser, AxiosError, { userId: string }>(
    ({ userId }: { userId: string }) => verifyUserEmail(userId),
    { retry: false },
  );
};
