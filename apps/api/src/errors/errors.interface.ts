export interface IGeneralErrorResponse {
  statusCode: number;
  errorCode: string;
  message: string;
  description?: string | string[] | unknown;
}

export enum ErrorCodePrefix {
  AUTH = 'AUTH',
  USER = 'USER',
  EMAIL = 'EMAIL',
  POST = 'POST',
  GENERAL = 'GENERAL',
  UNKNOWN = 'UNKNOWN',
}

export enum GeneralErrorCode {
  UNKNOWN = '000',
  UNAUTHORIZED = '001',
  BAD_REQUEST = '002',
  NOT_FOUND = '003',
}

export enum AuthErrorCode {
  CREDENTIALS_INVALID = '000',
  ACCESS_TOKEN_INVALID = '001',
  ACCESS_TOKEN_EXPIRES = '002',
  CSRF_TOKEN_INVALID = '003',
  CSRF_TOKEN_EXPIRES = '004',
  REFRESH_TOKEN_INVALID = '005',
  REFRESH_TOKEN_EXPIRES = '006',
  SESSION_INVALID = '007',
  SESSION_EXPIRES = '008',
}

export enum UserErrorCode {
  USER_INVALID = '000',
  USER_NOT_FOUND = '001',
  USER_CREATE_FAIL = '002',
  USER_UPDATE_FAIL = '003',
  USER_DELETE_FAIL = '004',
  REGISTRATION_EMAIL_UNIQUE = '005',
  REGISTRATION_USERNAME_UNIQUE = '006',
}

export enum PostErrorCode {
  POST_INVALID = '000',
  POST_NOT_FOUND = '001',
  POST_CREATE_FAIL = '002',
  POST_UPDATE_FAIL = '003',
  POST_DELETE_FAIL = '004',
}
