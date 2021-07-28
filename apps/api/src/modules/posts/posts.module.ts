import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { RepositoryModule } from '../../repositories/repository.module';

@Module({
  imports: [AuthModule, RepositoryModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
