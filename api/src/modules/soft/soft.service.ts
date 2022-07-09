import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SoftSkill } from 'src/models/softSkill.entity';
import { Repository } from 'typeorm';
import { CreateUpdateSoftDto } from './dto/create-update-soft.dto';

@Injectable()
export class SoftService {
  constructor(
    @InjectRepository(SoftSkill) private softRepository: Repository<SoftSkill>,
  ) {}

  async getAllSoft() {
    try {
      const allSoft = await this.softRepository.find();
      return allSoft;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createSoft(body: CreateUpdateSoftDto) {
    try {
      const newSoft = this.softRepository.create(body);
      await this.softRepository.save(newSoft);
      return newSoft;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async editSoft(body: CreateUpdateSoftDto, id: string) {
    console.log(body, id)
    try {
      await this.softRepository.update(
        {
          id,
        },
        body,
      );
      const newSoft = await this.softRepository.findBy({ id });
      return newSoft;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async destroySoft(id: string) {
    try {
      await this.softRepository.delete({ id });
      return {
        deleted: true,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
