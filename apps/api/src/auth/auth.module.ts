import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repositories/repository.module';
import { JwtService } from './jwt/jwt.service';
import { SessionService } from './session/session.service';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [RepositoryModule, AuthenticationModule],
  controllers: [],
  providers: [JwtService, SessionService],
  exports: [JwtService, SessionService],
})
export class AuthModule {}
