import { RegisterOptions } from 'react-hook-form';
import { ILoginValue } from 'src/shared/interfaces/auth.interface';

export const defaultLoginValue: ILoginValue = {
  username: '',
  password: '',
};

export const loginValidation: Record<
  ILoginValue['username' | 'password'],
  RegisterOptions
> = {
  username: {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'The minimum characters is 2',
    },
    maxLength: {
      value: 50,
      message: 'The maximum characters is 50',
    },
  },
  password: {
    required: 'This field is required',
    minLength: {
      value: 10,
      message: 'The minimum characters is 10',
    },
  },
};
