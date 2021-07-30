import { RegisterOptions } from 'react-hook-form';
import { IUserRegistrationValue } from 'src/shared/interfaces/users.interface';

export const defaultUserRegistrationValue = {
  username: '',
  email: '',
  password: '',
};

const emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const userRegistrationValidation: Record<
  IUserRegistrationValue['username' | 'email' | 'password'],
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
  email: {
    required: 'This field is required',
    pattern: {
      value: emailReg,
      message: 'Invalid email address',
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
