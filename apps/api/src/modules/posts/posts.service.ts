import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../../repositories/posts.repository';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { PostErrors } from './posts.error';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getAllPosts(published = true) {
    const res = this.postsRepository.findAllPosts(published);
    if (!res) throw new NotFoundException(PostErrors.POST_NOT_FOUND_ERROR);
    return res;
  }

  async findUserPosts(userId: string) {
    const res = this.postsRepository.findUserPosts(userId);
    if (!res) throw new NotFoundException(PostErrors.POST_NOT_FOUND_ERROR);
    return res;
  }

  async findSinglePost(postId: string) {
    const res = this.postsRepository.findSinglePost(postId);
    if (!res) throw new NotFoundException(PostErrors.POST_NOT_FOUND_ERROR);
    return res;
  }

  async createPost(data: CreatePostDto) {
    const res = await this.postsRepository.createPost(data);
    if (!res) throw new BadRequestException(PostErrors.POST_CREATE_ERROR);
    return res;
  }

  async updatePost(postId: string, data: UpdatePostDto) {
    const res = await this.postsRepository.updatePost(postId, data);
    if (!res) throw new BadRequestException(PostErrors.POST_UPDATE_ERROR);
    return res;
  }

  async deletePost(postId: string) {
    const res = await this.postsRepository.deletePost(postId);
    if (!res) throw new BadRequestException(PostErrors.POST_DELETE_ERROR);
    return res;
  }
}
