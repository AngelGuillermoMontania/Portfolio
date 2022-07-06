import { Body, Controller, Get, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.ward';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';


@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
  
}
