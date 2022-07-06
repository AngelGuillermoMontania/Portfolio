import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(email);
    let isMatch
    if(user?.password) {
        isMatch = await bcrypt.compare(pass, user.password);
    }
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}