import { Request } from 'express';
import { User } from '@prisma/client';

export interface RequestWithUser extends Request {
  user: User;
}

export interface ITokens {
  accessToken: string;
  csrfToken: string;
  refreshToken: string;
}

export enum Token {
  ACCESS_TOKEN = 'access-token',
  CSRF_TOKEN = 'csrf-token',
  REFRESH_TOKEN = 'refresh-token',
}
