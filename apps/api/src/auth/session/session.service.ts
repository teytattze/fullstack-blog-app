import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import { randomBytes } from 'crypto';
import { SessionsRepository } from '../../repositories/sessions.repository';
import {
  CSRF_BYTES,
  CSRF_TOKEN_TTL,
  REFRESH_TOKEN_BYTES,
  REFRESH_TOKEN_TTL,
} from './session.const';
import { AuthErrors } from '../auth.error';
import { getExpiresTime, checkExpiration } from '../auth.helper';

@Injectable()
export class SessionService {
  constructor(private readonly sessionsRepository: SessionsRepository) {}

  async createSession(
    userId: string,
  ): Promise<{ csrfToken: string; refreshToken: string }> {
    const csrfTokenData = this.generateSessionToken(CSRF_BYTES, CSRF_TOKEN_TTL);
    const refreshTokenData = this.generateSessionToken(
      REFRESH_TOKEN_BYTES,
      REFRESH_TOKEN_TTL,
    );

    const sessionTokenDetails: Prisma.SessionUpdateInput = {
      csrfToken: csrfTokenData.token,
      csrfTokenExpires: csrfTokenData.expires,
      refreshToken: refreshTokenData.token,
      refreshTokenExpires: refreshTokenData.expires,
    };

    const session = await this.sessionsRepository.updateSession(
      userId,
      sessionTokenDetails,
    );

    return {
      csrfToken: session.csrfToken,
      refreshToken: session.refreshToken,
    };
  }

  async updateCsrfToken(userId: string): Promise<string> {
    const csrfTokenData = this.generateSessionToken(CSRF_BYTES, CSRF_TOKEN_TTL);

    const sessionTokenDetails: Prisma.SessionUpdateInput = {
      csrfToken: csrfTokenData.token,
      csrfTokenExpires: csrfTokenData.expires,
    };

    const session = await this.sessionsRepository.updateSession(
      userId,
      sessionTokenDetails,
    );
    return session.csrfToken;
  }

  async invalidateSession(userId: string): Promise<Session> {
    const session = await this.sessionsRepository.invalidateSession(userId);
    if (!session) {
      throw new UnauthorizedException(AuthErrors.SESSION_ERROR);
    }
    return session;
  }

  validateRefreshToken(token: string, session: Session): boolean {
    const isExpired = checkExpiration(session.refreshTokenExpires);
    const isValid = session.refreshToken === token;
    if (!isValid) {
      throw new UnauthorizedException(AuthErrors.REFRESH_TOKEN_ERROR);
    }
    return isExpired;
  }

  validateCsrfToken(token: string, session: Session): boolean {
    const isExpired = checkExpiration(session.csrfTokenExpires);
    const isValid = session.csrfToken === token;
    if (!isValid) {
      throw new UnauthorizedException(AuthErrors.CSRF_TOKEN_ERROR);
    }
    return isExpired;
  }

  async validateSessionUser(userId: string): Promise<Session> {
    const session = await this.sessionsRepository.findSession(userId);
    if (
      !session ||
      session?.csrfToken === null ||
      session?.refreshToken === null
    ) {
      throw new UnauthorizedException(AuthErrors.SESSION_ERROR);
    }
    return session;
  }

  async checkSessionState(userId: string): Promise<Session> {
    const session = await this.sessionsRepository.findSession(userId);
    if (!session || session?.refreshToken === null) {
      return null;
    }
    const isExpired = checkExpiration(session.refreshTokenExpires);
    if (isExpired) {
      await this.invalidateSession(userId);
      return null;
    }
    return session;
  }

  private generateSessionToken(
    bytes: number,
    duration: number,
  ): { token: string; expires: string } {
    const token = randomBytes(bytes).toString('hex');
    const expires = getExpiresTime(duration).toString();
    return { token, expires };
  }
}
