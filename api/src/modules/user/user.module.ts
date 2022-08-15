import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from 'src/models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { AuthService } from '../auth/auth.service';
import 'dotenv/config';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
