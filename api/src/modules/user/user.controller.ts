import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginUserDto } from './dto/LoginUser.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@Query('email') email: string) {
    return this.userService.findUser(email);
  }

  @Post()
  postUser(@Body() body: LoginUserDto) {
    return this.userService.createUser(body);
  }
  
}
