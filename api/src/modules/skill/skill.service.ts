import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Skill } from 'src/models/skill.entity';
import { CreateUpdateSkillDto } from './dto/create-update-skill.dto';

import { existsSync, unlinkSync } from 'fs';

import { join } from 'path';
import 'dotenv/config';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}
  async getAllSkill() {
    try {
      const allSkills = await this.skillRepository.find();
      return allSkills;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createImageSkill(file: Express.Multer.File) {
    try {
      return {
        name: file.filename,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3');
    }
  }

  async destroyImageSkill(id: string) {
    try {
      const deleteImageSkill = await this.skillRepository.findOneBy({ id });
      if (deleteImageSkill) {
        if (
          existsSync(join(process.cwd(), '/assets/', deleteImageSkill?.image))
        ) {
          unlinkSync(join(process.cwd(), '/assets/', deleteImageSkill?.image));
        }
      }
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3');
    }
  }

  async createDataSkill(body: CreateUpdateSkillDto) {
    try {
      const newSkill = this.skillRepository.create(body);
      await this.skillRepository.save(body);
      return newSkill;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async editSkill(body: CreateUpdateSkillDto, id: string) {
    try {
      const newSkillEdit = await this.skillRepository.update(
        {
          id,
        },
        body,
      );
      const skillEdit = await this.skillRepository.findOne({
        where: {
          id,
        },
      });
      return skillEdit;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async destroySkill(id: string) {
    try {
      await this.skillRepository.delete({ id });
      return {
        deleted: true,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
