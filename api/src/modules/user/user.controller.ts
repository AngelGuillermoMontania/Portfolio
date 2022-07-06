import { Body, Controller, Get, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
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
