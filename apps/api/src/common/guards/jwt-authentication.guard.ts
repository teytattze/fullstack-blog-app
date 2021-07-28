import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestWithUser } from '../../auth/authentication/authentication.interface';
import { JwtService } from '../../auth/jwt/jwt.service';
import { SessionService } from '../../auth/session/session.service';
import { AuthErrors } from '../../auth/auth.error';
import { getAllTokens } from 'src/auth/auth.helper';

@Injectable()
export class JwtAuthenticationGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<RequestWithUser>();
    const { accessToken, csrfToken } = getAllTokens(req);

    if (!accessToken && !csrfToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.validateJwtToken(accessToken);

    if (payload.isExpired) {
      throw new UnauthorizedException(AuthErrors.ACCESS_TOKEN_EXPIRES);
    }

    const session = await this.sessionService.validateSessionUser(
      payload.userId,
    );
    const isCsrfExpired = await this.sessionService.validateCsrfToken(
      csrfToken,
      session,
    );

    if (isCsrfExpired) {
      throw new UnauthorizedException(AuthErrors.CSRF_TOKEN_EXPIRES);
    }

    return true;
  }
}
