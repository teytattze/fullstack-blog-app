import { HttpStatus } from '@nestjs/common';
import { ErrorCodePrefix, PostErrorCode } from 'src/errors/errors.interface';
import { getErrorCode } from 'src/errors/errors';

export enum PostRepositoryErrorType {}

export const PostErrors = {
  POST_INVALID_ERROR: {
    message: 'Invalid post',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(ErrorCodePrefix.POST, PostErrorCode.POST_INVALID),
  },
  POST_NOT_FOUND_ERROR: {
    message: 'Post not found',
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: getErrorCode(ErrorCodePrefix.POST, PostErrorCode.POST_NOT_FOUND),
  },
  POST_CREATE_ERROR: {
    message: 'Fail to create post',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(
      ErrorCodePrefix.POST,
      PostErrorCode.POST_CREATE_FAIL,
    ),
  },
  POST_UPDATE_ERROR: {
    message: 'Fail to update post',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(
      ErrorCodePrefix.POST,
      PostErrorCode.POST_UPDATE_FAIL,
    ),
  },
  POST_DELETE_ERROR: {
    message: 'Fail to delete post',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(
      ErrorCodePrefix.POST,
      PostErrorCode.POST_DELETE_FAIL,
    ),
  },
};
