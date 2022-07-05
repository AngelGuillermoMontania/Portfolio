import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from 'src/models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async userExist(email: string) {
    try {
      const user = await this.userRepository.find({
        where: {email},
      });
      return user;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createUser(email: string) {
    try {
      const newUser = this.userRepository.create({
        email,
      });
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
