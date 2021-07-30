import {
  IsBoolean,
  IsOptional,
  IsUUID,
  IsString,
  MinLength,
} from 'class-validator';

export class IndexPostsQuery {
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}

export class CreatePostDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsBoolean()
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
