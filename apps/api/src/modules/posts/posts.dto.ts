import { IsBoolean, IsOptional, IsUUID, IsString, Min } from 'class-validator';

export class IndexPostsQuery {
  @IsBoolean()
  @IsOptional()
  published: boolean;
}

export class CreatePostDto {
  @IsString()
  @Min(2)
  title: string;

  @IsString()
  @Min(10)
  content: string;

  @IsBoolean()
  published: boolean;

  @IsUUID('4')
  authorId: string;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @Min(2)
  title?: string;

  @IsOptional()
  @IsString()
  @Min(10)
  content?: string;

  @IsOptional()
  @IsBoolean()
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
  @IsUUID('4')
  postId: string;
}

export class IndexUserPublisedPostParam {
  @IsUUID('4')
  userId: string;
}
