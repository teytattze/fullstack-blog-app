import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { DatabasesService } from '../common/databases/databases.service';

@Injectable()
export class PostsRepository {
  private readonly logger = new Logger(PostsRepository.name);
  constructor(private readonly prisma: DatabasesService) {}

  async findAllPosts(published: boolean): Promise<Post[]> {
    try {
      return await this.prisma.post.findMany({
        where: { published },
      });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async findUserPosts(authorId: string): Promise<Post[]> {
    try {
      return await this.prisma.post.findMany({
        where: { authorId, published: true },
      });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async findSinglePost(postId: string): Promise<Post> {
    try {
      return await this.prisma.post.findUnique({ where: { id: postId } });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    try {
      return await this.prisma.post.create({ data });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async updatePost(postId: string, data: Prisma.PostUpdateInput) {
    try {
      return await this.prisma.post.update({
        where: { id: postId },
        data: { ...data },
      });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async deletePost(postId: string): Promise<Post> {
    try {
      return await this.prisma.post.delete({ where: { id: postId } });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }
}
