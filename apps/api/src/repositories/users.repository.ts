import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { Post, Prisma, User } from '@prisma/client';
import { DatabasesService } from '../common/databases/databases.service';
import {
  UserRepositoryErrorType,
  UserErrors,
} from '../modules/users/users.error';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);
  constructor(private readonly prisma: DatabasesService) {}

  async findAllUsers(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async findUserById(id: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async findUserByUsername(username: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { username },
      });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async findUserDetails(id: string): Promise<User & { posts: Post[] }> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
        include: { posts: true },
      });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          ...data,
          session: {
            create: {
              csrfToken: null,
              csrfTokenExpires: null,
              refreshToken: null,
              refreshTokenExpires: null,
            },
          },
        },
      });
    } catch (err) {
      this.logger.error(err);
      if (err.code === 'P2002') {
        switch (err.meta.target) {
          case UserRepositoryErrorType.USERNAME_UNIQUE:
            throw new BadRequestException(
              UserErrors.REGISTRATION_USERNAME_UNIQUE_ERROR,
            );
          case UserRepositoryErrorType.EMAIL_UNIQUE:
            throw new BadRequestException(
              UserErrors.REGISTRATION_EMAIL_UNIQUE_ERROR,
            );
          default:
            throw new InternalServerErrorException();
        }
      }
    }
  }
}
