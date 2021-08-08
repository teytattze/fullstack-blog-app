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
