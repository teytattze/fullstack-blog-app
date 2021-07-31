import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from '../../common/guards/jwt-authentication.guard';
import {
  CreatePostDto,
  DeletePostParam,
  IndexPostsQuery,
  SinglePostParam,
  UpdatePostDto,
  UpdatePostParam,
} from './posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(@Query() { published }: IndexPostsQuery) {
    return await this.postsService.getAllPosts(published);
  }

  @Get('/:postId')
  async getSinglePosts(@Param() { postId }: SinglePostParam) {
    return await this.postsService.findSinglePost(postId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('/create')
  async createPost(@Body() body: CreatePostDto) {
    return await this.postsService.createPost(body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':postId/update')
  async updatePost(
    @Body() body: UpdatePostDto,
    @Param() { postId }: UpdatePostParam,
  ) {
    return await this.postsService.updatePost(postId, body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':postId/delete')
  async deletePost(@Param() { postId }: DeletePostParam) {
    return await this.postsService.deletePost(postId);
  }
}
