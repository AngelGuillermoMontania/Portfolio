import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

import { Repository } from 'typeorm';
import { SoftSkill } from 'src/models/softSkill.entity';
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

  async createImageSoft(file: Express.Multer.File) {
    try {
      return {
        name: file.filename,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3');
    }
  }

  async destroyImageSoft(id: string) {
    try {
      const deleteImageSoft = await this.softRepository.findOneBy({ id });
      if (deleteImageSoft) {
        if (
          existsSync(join(process.cwd(), '/assets/', deleteImageSoft?.image))
        ) {
          unlinkSync(join(process.cwd(), '/assets/', deleteImageSoft?.image));
        }
      }
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3');
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
