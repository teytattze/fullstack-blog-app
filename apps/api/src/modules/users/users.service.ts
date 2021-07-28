import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../../repositories/users.repository';
import {
  GetUserDetailsSuccess,
  IndexUsersSuccess,
  UserRegistrationDto,
  UserRegistrationSuccess,
} from './users.dto';
import { UserErrors } from './users.error';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUser(): Promise<IndexUsersSuccess[]> {
    const res = await this.usersRepository.findAllUsers();
    if (!res) {
      throw new NotFoundException(UserErrors.USER_NOT_FOUND_ERROR);
    }
    this.removeUserPassword(res);
    return res;
  }

  async getUserDetails(id: string): Promise<GetUserDetailsSuccess> {
    const user = await this.usersRepository.findUserDetails(id);
    this.removeUserPassword(user);
    if (!user) {
      throw new BadRequestException(UserErrors.USER_NOT_FOUND_ERROR);
    }
    return user;
  }

  async registration(
    data: UserRegistrationDto,
  ): Promise<UserRegistrationSuccess> {
    const hashedPassword = await this.hashPassword(data.password);
    const user = await this.usersRepository.createUser({
      ...data,
      password: hashedPassword,
    });
    if (!user) {
      throw new BadRequestException(UserErrors.USER_CREATE_ERROR);
    }
    this.removeUserPassword(user);
    return user;
  }

  private async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  }

  private async removeUserPassword(userData: User | User[]) {
    if (Array.isArray(userData)) {
      userData.map((user) => delete user.password);
    } else {
      delete userData.password;
    }
    return userData;
  }
}
