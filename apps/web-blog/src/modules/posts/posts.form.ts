import { RegisterOptions } from 'react-hook-form';
import { ICreatePostValue } from 'src/shared/interfaces/posts.interface';

export const defaultCreatePostValue: ICreatePostValue = {
  title: '',
  content: '',
  published: false,
  authorId: '',
};

export const createPostValidation: Record<
  ICreatePostValue['title' | 'content'],
  RegisterOptions
> = {
  title: {
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
  content: {
    required: 'This field is required',
    minLength: {
      value: 10,
      message: 'The minimum characters is 10',
    },
  },
};
