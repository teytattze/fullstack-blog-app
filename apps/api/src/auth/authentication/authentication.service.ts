import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../../repositories/users.repository';
import { UserLoginDto } from './authentication.dto';
import { ITokens } from './authentication.interface';
import { IJwtPayload } from '../jwt/jwt.interface';
import { JwtService } from '../jwt/jwt.service';
import { SessionService } from '../session/session.service';
import { AuthErrors } from '../auth.error';
import { removePassword } from 'src/lib/remove-password.util';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
  ) {}

  async login(data: UserLoginDto) {
    const user = await this.checkCredentials(data);
    removePassword(user);

    const jwtPayload: IJwtPayload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
    };

    const accessToken = await this.jwtService.generateJwtToken(jwtPayload);
    const currSession = await this.sessionService.checkSessionState(user.id);

    if (!currSession) {
      const newSession = await this.sessionService.createSession(user.id);
      return {
        accessToken,
        csrfToken: newSession.csrfToken,
        refreshToken: newSession.refreshToken,
        ...jwtPayload,
      };
    }
    return {
      accessToken,
      csrfToken: currSession.csrfToken,
      refreshToken: currSession.refreshToken,
      jwtPayload,
    };
  }

  async logout(userId: string) {
    const res = await this.sessionService.invalidateSession(userId);
    if (!res) {
      throw new UnauthorizedException(AuthErrors.SESSION_ERROR);
    }
    return { message: 'Logout successfully' };
  }

  async refreshAccessToken(tokens: ITokens) {
    const payload = await this.jwtService.validateJwtToken(tokens.accessToken);
    const session = await this.sessionService.validateSessionUser(
      payload.userId,
    );
    const isCsrfExpired = await this.sessionService.validateCsrfToken(
      tokens.csrfToken,
      session,
    );
    const isRefreshExpired = await this.sessionService.validateRefreshToken(
      tokens.refreshToken,
      session,
    );

    if (isCsrfExpired && isRefreshExpired) {
      throw new UnauthorizedException(AuthErrors.SESSION_EXPIRES);
    } else if (isCsrfExpired) {
      throw new UnauthorizedException(AuthErrors.CSRF_TOKEN_EXPIRES);
    } else if (isRefreshExpired) {
      throw new UnauthorizedException(AuthErrors.REFRESH_TOKEN_EXPIRES);
    }

    const jwtPayload: IJwtPayload = {
      userId: payload.userId,
      username: payload.username,
      email: payload.email,
      emailVerified: payload.emailVerified,
      role: payload.role,
    };

    return this.jwtService.generateJwtToken(jwtPayload);
  }

  async refreshCsrfToken(tokens: ITokens) {
    const payload = await this.jwtService.validateJwtToken(tokens.accessToken);
    const session = await this.sessionService.validateSessionUser(
      payload.userId,
    );
    await this.sessionService.validateCsrfToken(tokens.csrfToken, session);
    const isRefreshExpired = await this.sessionService.validateRefreshToken(
      tokens.refreshToken,
      session,
    );

    if (payload.isExpired && isRefreshExpired) {
      throw new UnauthorizedException(AuthErrors.SESSION_EXPIRES);
    } else if (payload.isExpired) {
      throw new UnauthorizedException(AuthErrors.ACCESS_TOKEN_EXPIRES);
    } else if (isRefreshExpired) {
      throw new UnauthorizedException(AuthErrors.REFRESH_TOKEN_EXPIRES);
    }

    return await this.sessionService.updateCsrfToken(payload.userId);
  }

  private async checkCredentials(data: UserLoginDto): Promise<User> {
    const user = await this.checkUserByUsername(data.username);
    await this.checkPassword(data.password, user);
    return user;
  }

  private async checkUserByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException(AuthErrors.CREDENTIALS_ERROR);
    }
    return user;
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new UnauthorizedException(AuthErrors.CREDENTIALS_ERROR);
    }
    return true;
  }
}
