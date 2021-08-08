import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { sign, verify, decode } from 'jsonwebtoken';
import { ConfigService } from '../../../common/config/config.service';
import { UsersRepository } from '../../../repositories/users.repository';
import { IJwtPayload } from './jwt.interface';
import { AUDIENCE, ISSUER } from './jwt.const';
import { getCurrentUnixTime, checkExpiration } from '../auth.helper';
import { AuthErrors } from '../auth.error';

// TODO: add jwt token secret key rotation

@Injectable()
export class JwtService {
  private readonly publicKey: string;
  private readonly privateKey: string;
  private readonly jwtTtl: number | string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UsersRepository,
  ) {
    this.publicKey = this.configService.jwtPublicKey;
    this.privateKey = this.configService.jwtPrivateKey;
    this.jwtTtl = this.configService.jwtTtl;
  }

  generateJwtToken(payload: IJwtPayload): string {
    const options = { expiresIn: this.jwtTtl };
    const currentTime = getCurrentUnixTime();
    const jwtPayload: IJwtPayload = {
      ...payload,
      iss: ISSUER,
      aud: AUDIENCE,
      iat: currentTime,
    };
    return sign(jwtPayload, this.privateKey, {
      ...options,
      algorithm: 'RS256',
    });
  }

  async validateJwtToken(
    token: string,
  ): Promise<{ isExpired: boolean } & IJwtPayload> {
    try {
      const decoded = verify(token, this.publicKey, {
        ignoreExpiration: true,
        audience: AUDIENCE,
        issuer: ISSUER,
        algorithms: ['RS256'],
      }) as IJwtPayload;

      const user = await this.validateJwtUser(token);
      const isExpired = checkExpiration(decoded.exp);

      if (
        user.username !== decoded.username ||
        user.email !== decoded.email ||
        user.role !== decoded.role
      ) {
        throw new UnauthorizedException(AuthErrors.ACCESS_TOKEN_ERROR);
      }
      return { ...decoded, isExpired };
    } catch (err) {
      throw new UnauthorizedException(AuthErrors.ACCESS_TOKEN_ERROR);
    }
  }

  private async validateJwtUser(token: string): Promise<User> {
    const decoded = decode(token) as IJwtPayload;
    const user = this.userRepository.findUserById(decoded.userId);
    if (!user) {
      throw new UnauthorizedException(AuthErrors.ACCESS_TOKEN_ERROR);
    }
    return user;
  }
}
