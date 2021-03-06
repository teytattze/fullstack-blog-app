import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/common/guards/jwt-authentication.guard';
import {
  GetUserDetailsParam,
  GetUserDetailsSuccess,
  IndexUsersSuccess,
  UserRegistrationDto,
  UserRegistrationSuccess,
  VerifyUserEmailParam,
} from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<IndexUsersSuccess[]> {
    return await this.usersService.getAllUser();
  }

  @Post('/register')
  async registration(
    @Body() body: UserRegistrationDto,
  ): Promise<UserRegistrationSuccess> {
    return await this.usersService.registration(body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/:id')
  async findUserAllPosts(
    @Param() { id }: GetUserDetailsParam,
  ): Promise<GetUserDetailsSuccess> {
    return await this.usersService.getUserDetails(id);
  }

  @Post('/verify/:id')
  async verifyUserEmail(@Param() { id }: VerifyUserEmailParam) {
    return await this.usersService.verifyUserEmail(id);
  }
}
