import { Controller, Get, Post, Query } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Query('email') email: string) {
    return this.userService.userExist(email);
  }

  @Post()
  postUser(@Query('email') email: string) {
    return this.userService.createUser(email);
  }
}
