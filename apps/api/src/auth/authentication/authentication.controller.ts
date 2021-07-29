import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthenticationGuard } from '../../common/guards/jwt-authentication.guard';
import { UserLoginDto } from './authentication.dto';
import { AuthenticationService } from './authentication.service';
import { CSRF_TOKEN_TTL, REFRESH_TOKEN_TTL } from '../session/session.const';
import { Token } from './authentication.interface';
import { getAllTokens } from '../auth.helper';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authenticationService.login(body);

    const jwtData = await JSON.stringify(result.jwtPayload);

    res.cookie(Token.ACCESS_TOKEN, result.accessToken, {
      httpOnly: true,
    });
    res.cookie(Token.CSRF_TOKEN, result.csrfToken);
    res.cookie(Token.REFRESH_TOKEN, result.refreshToken, {
      httpOnly: true,
      maxAge: (REFRESH_TOKEN_TTL - 60) * 1000,
    });
    res.cookie('jwt-data', jwtData, {
      maxAge: (REFRESH_TOKEN_TTL - 60) * 1000,
    });

    delete result.accessToken;
    delete result.csrfToken;
    delete result.refreshToken;

    return { message: 'Login successfully' };
  }

  @Post('/refresh-access')
  @HttpCode(HttpStatus.OK)
  async refreshAccess(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = getAllTokens(req);
    const newAccessToken = await this.authenticationService.refreshAccessToken(
      tokens,
    );

    res.cookie(Token.ACCESS_TOKEN, newAccessToken, {
      httpOnly: true,
    });

    return { message: 'Access token has been refreshed successfully' };
  }

  @Post('/refresh-csrf')
  @HttpCode(HttpStatus.OK)
  async refreshCsrf(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = getAllTokens(req);
    const newCsrfToken = await this.authenticationService.refreshCsrfToken(
      tokens,
    );
    res.cookie(Token.CSRF_TOKEN, newCsrfToken, {
      maxAge: (CSRF_TOKEN_TTL - 60) * 1000,
    });
    return { message: 'Csrf token has been refreshed successfully' };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie(Token.ACCESS_TOKEN);
    res.clearCookie(Token.CSRF_TOKEN);
    res.clearCookie(Token.REFRESH_TOKEN);
    res.clearCookie('jwt-data');

    const user = JSON.parse(req.cookies['jwt-data']);

    return await this.authenticationService.logout(user.userId);
  }
}
