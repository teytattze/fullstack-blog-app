import * as moment from 'moment';
import { Request } from 'express';
import { writeFileSync } from 'fs';
import { generateKeyPairSync } from 'crypto';
import { Token, ITokens } from './authentication/authentication.interface';
export const getCurrentUnixTime = (): number => {
  return moment().unix();
};

export const getExpiresTime = (duration: number): number => {
  return moment()
    .add(duration * 1000)
    .unix();
};

export const checkExpiration = (expires: number | string): boolean => {
  const currentTime = getCurrentUnixTime();
  if (typeof expires === 'string') {
    return currentTime >= parseInt(expires);
  }
  return currentTime >= expires;
};

export const generateRsaKeyPair = () => {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });
  writeFileSync(`${process.cwd()}/.secret/public.pem`, publicKey);
  writeFileSync(`${process.cwd()}/.secret/private.pem`, privateKey);
};

export const getAllTokens = (request: Request) => {
  const accessToken = request.cookies[Token.ACCESS_TOKEN];
  const csrfToken = request.headers[Token.CSRF_TOKEN] as string;
  const refreshToken = request.cookies[Token.REFRESH_TOKEN];

  const tokens: ITokens = {
    accessToken,
    csrfToken,
    refreshToken,
  };

  return tokens;
};
