import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from 'src/models/user.entity';
import { LoginUserDto } from './dto/LoginUser.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUser(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      return user
    } catch (error) {
      return;
    }
  }

  async createUser(body: LoginUserDto) {
    try {
      const newUser = this.userRepository.create({
        email: body.email,
        password: await bcrypt.hash(body.password, 10)
      });
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
