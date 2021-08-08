import { HttpStatus } from '@nestjs/common';
import { ErrorCodePrefix, AuthErrorCode } from 'src/errors/errors.interface';
import { getErrorCode } from 'src/errors/errors';

export const AuthErrors = {
  CREDENTIALS_ERROR: {
    message: 'Invalid user credentials',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: getErrorCode(
      ErrorCodePrefix.AUTH,
      AuthErrorCode.CREDENTIALS_INVALID,
    ),
  },
  ACCESS_TOKEN_ERROR: {
    message: 'Invalid access token',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: getErrorCode(
      ErrorCodePrefix.AUTH,
      AuthErrorCode.ACCESS_TOKEN_INVALID,
    ),
  },
  ACCESS_TOKEN_EXPIRES: {
    message: 'Access token is expired',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: getErrorCode(
      ErrorCodePrefix.AUTH,
      AuthErrorCode.ACCESS_TOKEN_EXPIRES,
    ),
  },
  CSRF_TOKEN_ERROR: {
    message: 'Invalid csrf token',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: getErrorCode(
      ErrorCodePrefix.AUTH,
      AuthErrorCode.CSRF_TOKEN_INVALID,
    ),
  },
  CSRF_TOKEN_EXPIRES: {
    message: 'Csrf token is expired',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: getErrorCode(
      ErrorCodePrefix.AUTH,
      AuthErrorCode.CSRF_TOKEN_EXPIRES,
    ),
  },
  REFRESH_TOKEN_ERROR: {
    message: 'Invalid refresh token',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: getErrorCode(
      ErrorCodePrefix.AUTH,
      AuthErrorCode.REFRESH_TOKEN_INVALID,
    ),
  },
  REFRESH_TOKEN_EXPIRES: {
    message: 'Refresh token is expired',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: getErrorCode(
      ErrorCodePrefix.AUTH,
      AuthErrorCode.REFRESH_TOKEN_EXPIRES,
    ),
  },
  SESSION_ERROR: {
    message: 'Invalid user session',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: getErrorCode(
      ErrorCodePrefix.AUTH,
      AuthErrorCode.SESSION_INVALID,
    ),
  },
  SESSION_EXPIRES: {
    message: 'User session is expired',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: getErrorCode(
      ErrorCodePrefix.AUTH,
      AuthErrorCode.SESSION_INVALID,
    ),
  },
};
