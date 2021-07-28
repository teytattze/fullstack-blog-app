import { HttpStatus } from '@nestjs/common';
import { ErrorCodePrefix, UserErrorCode } from 'src/errors/errors.interface';
import { getErrorCode } from 'src/errors/errors';

export enum UserRepositoryErrorType {
  USERNAME_UNIQUE = 'username_unique',
  EMAIL_UNIQUE = 'email_unique',
}

export const UserErrors = {
  USER_INVALID_ERROR: {
    message: 'Invalid user',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(ErrorCodePrefix.USER, UserErrorCode.USER_INVALID),
  },
  USER_NOT_FOUND_ERROR: {
    message: 'User not found',
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: getErrorCode(ErrorCodePrefix.USER, UserErrorCode.USER_NOT_FOUND),
  },
  USER_CREATE_ERROR: {
    message: 'Failed to create user account',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(
      ErrorCodePrefix.USER,
      UserErrorCode.USER_CREATE_FAIL,
    ),
  },
  USER_UPDATE_ERROR: {
    message: 'Failed to update user account',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(
      ErrorCodePrefix.USER,
      UserErrorCode.USER_UPDATE_FAIL,
    ),
  },
  USER_DELETE_ERROR: {
    message: 'Failed to delete user account',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(
      ErrorCodePrefix.USER,
      UserErrorCode.USER_DELETE_FAIL,
    ),
  },
  REGISTRATION_EMAIL_UNIQUE_ERROR: {
    message: 'Email has been taken',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(
      ErrorCodePrefix.USER,
      UserErrorCode.REGISTRATION_EMAIL_UNIQUE,
    ),
  },
  REGISTRATION_USERNAME_UNIQUE_ERROR: {
    message: 'Username has been taken',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(
      ErrorCodePrefix.USER,
      UserErrorCode.REGISTRATION_USERNAME_UNIQUE,
    ),
  },
};
