import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoryModule } from '../../repositories/repository.module';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [AuthModule, MailModule, RepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
