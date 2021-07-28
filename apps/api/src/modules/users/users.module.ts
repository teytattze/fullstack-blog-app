import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoryModule } from '../../repositories/repository.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule, RepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
