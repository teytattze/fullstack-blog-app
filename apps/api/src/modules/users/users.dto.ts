import { Prisma, Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class UserRegistrationDto implements Prisma.UserCreateInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  password: string;
}

export class UserRegistrationSuccess {
  @IsUUID('4')
  id: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  emailVerified: boolean;

  @IsEnum(Role)
  role: Role;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class IndexUsersSuccess {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  emailVerified: boolean;

  @IsEnum(Role)
  role: Role;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class GetUserDetailsParam {
  @IsUUID('4')
  id: string;
}

export class IndexUserPostsSuccess {
  @IsUUID('4')
  id: string;

  @IsString()
  authorId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  published: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class GetUserDetailsSuccess {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  emailVerified: boolean;

  @IsEnum(Role)
  role: Role;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @ValidateNested({ each: true })
  @Type(() => IndexUserPostsSuccess)
  posts: IndexUserPostsSuccess[];
}

export class VerifyUserEmailParam {
  @IsUUID('4')
  id: string;
}
