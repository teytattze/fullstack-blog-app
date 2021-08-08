import { Role } from '@prisma/client';

export interface IJwtPayload {
  userId: string;
  username: string;
  email: string;
  emailVerified: boolean;
  role: Role;
  iat?: number;
  exp?: number;
  jti?: string;
  nbf?: number;
  iss?: string;
  aud?: string;
}
