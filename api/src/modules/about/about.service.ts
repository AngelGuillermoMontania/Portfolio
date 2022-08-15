import { Body, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { About } from 'src/models/about.entity';
import { CreateUpdateAboutDto } from './dto/create-update-about.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About) private aboutRepository: Repository<About>,
  ) {}

  async getTheAbout() {
    try {
      const about = await this.aboutRepository.find();
      return about[0];
    } catch (error) {
      return new InternalServerErrorException('Database Error'); //Error nest with error server
    }
  }

  async createAbout(body: CreateUpdateAboutDto) {
    try {
      const about = this.aboutRepository.create(body); //Create the project
      await this.aboutRepository.save(about); //Save the project
      return about;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async editAbout(body: CreateUpdateAboutDto) {
    try {
      const aboutSearch = await this.aboutRepository.find();
      const about = await this.aboutRepository.update(
        {
          id: aboutSearch[0].id,
        },
        body,
      );
      const aboutEdit = await this.aboutRepository.find();
      return aboutEdit[0];
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
