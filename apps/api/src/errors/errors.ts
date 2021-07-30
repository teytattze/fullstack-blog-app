import { HttpException, HttpStatus } from '@nestjs/common';
import {
  IGeneralErrorResponse,
  GeneralErrorCode,
  ErrorCodePrefix,
} from './errors.interface';

export const getErrorCode = (
  type: ErrorCodePrefix = ErrorCodePrefix.UNKNOWN,
  code: string = GeneralErrorCode.UNKNOWN,
) => {
  return `${type}_${code}`;
};

export const Errors = {
  GENERAL_UNAUTHORIZED_ERROR: {
    message: 'Unauthorized',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: getErrorCode(
      ErrorCodePrefix.AUTH,
      GeneralErrorCode.UNAUTHORIZED,
    ),
  },
  GENERAL_BAD_REQUEST_ERROR: {
    message: 'Bad request',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(
      ErrorCodePrefix.GENERAL,
      GeneralErrorCode.BAD_REQUEST,
    ),
  },
  GENERAL_NOT_FOUND_ERROR: {
    message: 'Not found',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(
      ErrorCodePrefix.GENERAL,
      GeneralErrorCode.NOT_FOUND,
    ),
  },
  UNKNOWN_ERROR: {
    message: 'Unknown error',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: getErrorCode(),
  },
};

export const createGeneralExceptionError = (
  error: any,
): IGeneralErrorResponse => {
  if (error instanceof HttpException) {
    const errorResponse = error.getResponse() as IGeneralErrorResponse;

    return {
      message: errorResponse.message,
      errorCode: errorResponse.errorCode || Errors.UNKNOWN_ERROR.errorCode,
      statusCode: error.getStatus(),
    };
  }

  return Errors.UNKNOWN_ERROR;
};
