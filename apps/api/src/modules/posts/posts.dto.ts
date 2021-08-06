import { IsOptional, IsUUID, IsString, MinLength } from 'class-validator';
import { ToBoolean } from 'src/lib/to-boolean.util';

export class IndexPostsQuery {
  @ToBoolean()
  @IsOptional()
  published?: boolean;

  @IsUUID()
  @IsOptional()
  userId?: string;
}

export class CreatePostDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;

  @ToBoolean()
  published: boolean;

  @IsUUID('4')
  authorId: string;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  content?: string;

  @IsOptional()
  @ToBoolean()
  published?: boolean;
}

export class UpdatePostParam {
  @IsUUID('4')
  postId: string;
}

export class DeletePostParam {
  @IsUUID('4')
  postId: string;
}

export class SinglePostParam {
  @IsString()
  postId: string;
}

export class IndexUserPublisedPostParam {
  @IsUUID('4')
  userId: string;
}
