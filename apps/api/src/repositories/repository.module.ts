import { Module } from '@nestjs/common';
import { DatabasesModule } from '../common/databases/databases.module';
import { PostsRepository } from './posts.repository';
import { SessionsRepository } from './sessions.repository';
import { UsersRepository } from './users.repository';

@Module({
  imports: [DatabasesModule],
  providers: [UsersRepository, PostsRepository, SessionsRepository],
  exports: [UsersRepository, PostsRepository, SessionsRepository],
})
export class RepositoryModule {}
