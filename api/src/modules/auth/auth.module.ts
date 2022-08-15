import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.stategy';
import 'dotenv/config';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [UserModule, 
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY || 'secret',
      signOptions: { expiresIn: '5h' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
