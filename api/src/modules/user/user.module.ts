import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
