import { Injectable, InternalServerErrorException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Repository } from 'typeorm';
import { Skill } from 'src/models/skill.entity';
import { CreateUpdateSkillDto } from './dto/create-update-skill.dto';

import { createReadStream } from 'fs';
import { s3Client } from 'src/libs/sampleClient';

import 'dotenv/config';

const bucketName = process.env.AWS_BUCKET_NAME || ""

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) { }
  async getAllSkill() {
    try {
      const allSkills = await this.skillRepository.find();
      return allSkills;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async getImageSkill(name: string) {
    const bucketParams = {
      Key: name,
      Bucket: bucketName
    }
    var fileStream = s3Client.getObject(bucketParams).createReadStream();
    return new StreamableFile(fileStream)
  }

  async createImageSkill(file: Express.Multer.File) {
    try {
      const fileStream = createReadStream(file.path)
      const bucketParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
      }
      await s3Client.upload(bucketParams).promise()
      return {
        name: file.filename,
      };
    } catch (error) {
      console.log(error)
      return new InternalServerErrorException('Database Error/S3');
    }
  }

  async destroyImageSkill(id: string) {
    try {
      const deleteImageSkill = await this.skillRepository.findOneBy({ id });
      if (deleteImageSkill) {
        const bucketParams = {
          Key: deleteImageSkill?.image,
          Bucket: bucketName
        }
        await s3Client.deleteObject(bucketParams).promise()
      }
      return "success"
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
