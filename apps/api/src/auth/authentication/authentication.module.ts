import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { RepositoryModule } from '../../repositories/repository.module';
import { JwtService } from '../jwt/jwt.service';
import { SessionService } from '../session/session.service';

@Module({
  imports: [RepositoryModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtService, SessionService],
})
export class AuthenticationModule {}
